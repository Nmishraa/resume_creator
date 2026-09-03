import { ResumeData } from '../types/resume';

/**
 * Converts oklch(...) or oklab(...) color string to browser-parsed RGB/Hex format.
 */
export function convertOklchColor(colorStr: string): string {
  if (!colorStr || (!colorStr.includes('oklch') && !colorStr.includes('oklab'))) {
    return colorStr;
  }
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return colorStr;
    ctx.fillStyle = '#000000';
    ctx.fillStyle = colorStr;
    const resolved = ctx.fillStyle;
    return resolved && resolved !== '#000000' ? resolved : colorStr;
  } catch (e) {
    return colorStr;
  }
}

/**
 * Recursively converts all computed oklch() / oklab() colors on an element
 * and its descendants into supported RGB / Hex format.
 */
export function sanitizeElementColors(element: HTMLElement): void {
  const propertiesToSanitize = [
    'color',
    'backgroundColor',
    'borderColor',
    'outlineColor',
    'textDecorationColor',
    'boxShadow',
    'fill',
    'stroke'
  ];

  const sanitizeSingleNode = (el: HTMLElement) => {
    try {
      const win = el.ownerDocument?.defaultView || window;
      const computed = win.getComputedStyle(el);
      if (!computed) return;

      propertiesToSanitize.forEach((prop) => {
        const val = (computed as any)[prop] || computed.getPropertyValue(prop);
        if (typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
          const sanitizedVal = convertOklchColor(val);
          const cssPropName = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
          el.style.setProperty(cssPropName, sanitizedVal, 'important');
        }
      });
    } catch (e) {
      // Ignore non-HTML nodes or restricted elements
    }
  };

  sanitizeSingleNode(element);
  const descendants = element.querySelectorAll('*');
  descendants.forEach((node) => sanitizeSingleNode(node as HTMLElement));
}

/**
 * Trigger native print dialog for vector PDF output
 */
export function exportToVectorPdf(): void {
  window.print();
}

/**
 * Helper to safely extract default export constructor or function from module wrappers
 */
function resolveModuleExport(mod: any): any {
  if (typeof mod === 'function') return mod;
  if (typeof mod?.default === 'function') return mod.default;
  if (typeof mod?.jsPDF === 'function') return mod.jsPDF;
  if (typeof mod?.default?.jsPDF === 'function') return mod.default.jsPDF;
  if (typeof mod?.html2canvas === 'function') return mod.html2canvas;
  if (typeof mod?.default?.default === 'function') return mod.default.default;
  return mod;
}

/**
 * Lazy-loads html2canvas-pro and jsPDF on demand and downloads high-fidelity A4 PDF file directly.
 */
export async function downloadPdfFromElement(
  elementId: string = 'resume-preview-sheet',
  filename: string = 'Resume.pdf'
): Promise<void> {
  const cleanName = filename.replace(/\.pdf$/i, '').trim();
  const safeFilename = `${cleanName || 'Resume'}.pdf`;

  // 1. Wait for web fonts to finish loading
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 1000))
      ]);
    } catch (e) {
      console.warn('Font loading wait warning:', e);
    }
  }

  // 2. Locate resume preview element
  let element = document.getElementById(elementId) as HTMLElement | null;

  if (!element) {
    element = (document.getElementById('resume-preview-sheet') ||
               document.getElementById('resume-preview') ||
               document.querySelector('.print-area') ||
               document.querySelector('#cover-letter-sheet') ||
               document.querySelector('[id*="preview"]')) as HTMLElement | null;
  }

  if (!element) {
    throw new Error(`Target preview element (#${elementId}) not found in document.`);
  }

  // 3. Dynamic import of jsPDF and html2canvas-pro (supports modern CSS color functions natively)
  const [jsPdfModule, html2CanvasModule] = await Promise.all([
    import('jspdf'),
    import('html2canvas-pro')
  ]);

  const jsPDF = resolveModuleExport(jsPdfModule);
  const html2canvas = resolveModuleExport(html2CanvasModule);

  if (typeof jsPDF !== 'function') {
    throw new Error(`jsPDF library failed to load (received ${typeof jsPDF}).`);
  }

  if (typeof html2canvas !== 'function') {
    throw new Error(`html2canvas-pro library failed to load (received ${typeof html2canvas}).`);
  }

  // 4. Temporarily reset transform scaling on target element's parent container for 1:1 crisp 794px capture
  const parentEl = element.parentElement;
  const originalTransform = parentEl ? parentEl.style.transform : '';
  const originalWebkitTransform = parentEl ? parentEl.style.webkitTransform : '';

  const originalDisplay = element.style.display;
  const originalVisibility = element.style.visibility;

  // Unhide element if responsive mobile tab hid the preview container
  if (element.offsetWidth === 0 || element.offsetHeight === 0) {
    element.style.display = 'block';
    element.style.visibility = 'visible';
  }

  if (parentEl) {
    parentEl.style.transform = 'none';
    parentEl.style.webkitTransform = 'none';
  }

  try {
    // Brief 50ms pause for DOM reflow
    await new Promise((resolve) => setTimeout(resolve, 50));

    const canvas = await html2canvas(element, {
      scale: 2, // 192 DPI high resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      imageTimeout: 5000,
      onclone: (clonedDoc: Document) => {
        // Sanitize any remaining oklch / oklab colors in cloned DOM and stylesheets
        const clonedSheet = clonedDoc.getElementById('resume-preview-sheet') || clonedDoc.querySelector('.print-area');
        if (clonedSheet) {
          sanitizeElementColors(clonedSheet as HTMLElement);
        }

        // Sanitize all <style> elements inside clonedDoc
        const styleEls = clonedDoc.querySelectorAll('style');
        styleEls.forEach((styleEl) => {
          let cssText = styleEl.textContent || '';
          if (cssText.includes('oklch') || cssText.includes('oklab')) {
            cssText = cssText.replace(/oklch\([^)]+\)|oklab\([^)]+\)/gi, (match) => convertOklchColor(match));
            styleEl.textContent = cssText;
          }
        });

        // Page break avoidance
        const avoidElements = clonedDoc.querySelectorAll('.page-break-avoid, .resume-section-item');
        avoidElements.forEach((el) => {
          (el as HTMLElement).style.breakInside = 'avoid';
          (el as HTMLElement).style.pageBreakInside = 'avoid';
        });
      }
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('html2canvas captured an empty canvas (0 dimensions).');
    }

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // First Page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Subsequent Pages for multi-page resumes
    while (heightLeft >= 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Direct Browser Download onto User's Device
    pdf.save(safeFilename);
  } finally {
    if (parentEl) {
      parentEl.style.transform = originalTransform;
      parentEl.style.webkitTransform = originalWebkitTransform;
    }
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
  }
}

/**
 * Export resume data as downloadable JSON
 */
export function exportResumeToJson(resume: ResumeData): void {
  const nameSlug = (resume.personalInfo.fullName || 'Resume').trim().replace(/[^a-zA-Z0-9]/g, '_');
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${nameSlug}_data.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Read JSON file and parse into ResumeData
 */
export function importResumeFromJson(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.personalInfo || !json.experience) {
          throw new Error('Invalid resume data schema');
        }
        resolve(json as ResumeData);
      } catch (err) {
        reject(new Error('Failed to parse JSON resume file. Please ensure it was exported from Resume Craft.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}
