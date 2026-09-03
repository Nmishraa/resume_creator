import { ResumeData } from '../types/resume';

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
 * Helper to extract computed RGB colors and convert any oklch/CSS variables to explicit inline RGB styles.
 * This guarantees html2canvas will never encounter unsupported oklch color functions or un-evaluated CSS custom properties.
 */
function sanitizeElementColors(origNode: HTMLElement, cloneNode: HTMLElement): void {
  const origElements = [origNode, ...Array.from(origNode.querySelectorAll<HTMLElement>('*'))];
  const cloneElements = [cloneNode, ...Array.from(cloneNode.querySelectorAll<HTMLElement>('*'))];

  const colorProps: Array<keyof CSSStyleDeclaration> = [
    'color',
    'backgroundColor',
    'borderColor',
    'outlineColor',
    'textDecorationColor',
    'boxShadow',
    'fill',
    'stroke'
  ];

  for (let i = 0; i < origElements.length; i++) {
    const origEl = origElements[i];
    const cloneEl = cloneElements[i];
    if (!origEl || !cloneEl) continue;

    try {
      // Protect SVG elements (icons, paths, shapes) from HTML-specific style overrides
      const isSvgNode = origEl instanceof SVGElement || !!origEl.closest('svg');

      if (!isSvgNode) {
        // Enforce border-box box-sizing and max-width ONLY on HTML layout elements
        cloneEl.style.boxSizing = 'border-box';
        cloneEl.style.maxWidth = '100%';
      } else {
        // Ensure root SVG icons have valid XML namespace for html2canvas SVG serialization
        if (cloneEl.tagName.toLowerCase() === 'svg') {
          if (!cloneEl.getAttribute('xmlns')) {
            cloneEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          }
        }
      }

      const computed = window.getComputedStyle(origEl);
      for (const prop of colorProps) {
        const val = computed[prop as any];
        if (typeof val === 'string' && val && !val.includes('oklch')) {
          (cloneEl.style as any)[prop] = val;
        }
      }

      // Sanitize inline style attribute if lingering oklch function exists
      const inlineStyle = cloneEl.getAttribute('style') || '';
      if (inlineStyle.includes('oklch')) {
        const cleanedStyle = inlineStyle.replace(/oklch\([^)]+\)/gi, 'rgb(0, 0, 0)');
        cloneEl.setAttribute('style', cleanedStyle);
      }
    } catch (e) {
      // Ignore style computation errors on detached nodes
    }
  }
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
        new Promise((resolve) => setTimeout(resolve, 1500))
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

  // 4. Create an in-flow off-screen container at top:0, left:0, z-index:-9999 to guarantee valid non-zero layout
  const renderWrapper = document.createElement('div');
  renderWrapper.id = 'pdf-export-wrapper';
  renderWrapper.style.position = 'absolute';
  renderWrapper.style.top = '0';
  renderWrapper.style.left = '0';
  renderWrapper.style.width = '794px';
  renderWrapper.style.zIndex = '-9999';
  renderWrapper.style.opacity = '1';
  renderWrapper.style.pointerEvents = 'none';
  renderWrapper.style.backgroundColor = '#ffffff';
  renderWrapper.style.overflow = 'visible';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.display = 'block';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';
  clone.style.transform = 'none';
  clone.style.width = '794px';
  clone.style.maxWidth = '794px';
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.boxSizing = 'border-box';
  clone.style.backgroundColor = '#ffffff';
  clone.style.overflow = 'hidden';

  // Copy computed RGB styles to eliminate oklch functions and CSS variable dependencies
  sanitizeElementColors(element, clone);

  // Unhide any hidden sub-elements inside clone if applicable
  const hiddenChildren = clone.querySelectorAll('.hidden');
  hiddenChildren.forEach((child) => {
    (child as HTMLElement).classList.remove('hidden');
    (child as HTMLElement).style.display = 'block';
  });

  renderWrapper.appendChild(clone);
  document.body.appendChild(renderWrapper);

  try {
    // Wait for images inside clone to finish loading
    const images = Array.from(clone.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 2000);
        });
      })
    );

    // Brief layout stabilization delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    const targetHeight = Math.max(clone.scrollHeight, clone.offsetHeight, 1123);

    const canvas = await html2canvas(clone, {
      scale: 2, // 192 DPI high resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      x: 0,
      y: 0,
      width: 794,
      height: targetHeight,
      windowWidth: 794,
      windowHeight: targetHeight,
      imageTimeout: 5000,
      onclone: (clonedDoc: Document) => {
        // Page break avoidance
        const avoidElements = clonedDoc.querySelectorAll('.page-break-avoid, .resume-section-item');
        avoidElements.forEach((el) => {
          (el as HTMLElement).style.breakInside = 'avoid';
          (el as HTMLElement).style.pageBreakInside = 'avoid';
        });
      }
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('PDF export canvas captured 0 dimensions. Please ensure resume preview is visible.');
    }

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfPageWidth = 210; // A4 width in mm
    const pdfPageHeight = 297; // A4 height in mm
    const marginMm = 6; // 6mm top & bottom margin padding for clean A4 framing
    const printableHeight = pdfPageHeight - (marginMm * 2); // 285mm

    const contentAspectRatio = canvas.height / canvas.width;
    const rawImgHeight = pdfPageWidth * contentAspectRatio;

    if (rawImgHeight <= 315) {
      // Single Page Resume: fit content within A4 single page height cleanly with 6mm margins
      const scaleFactor = rawImgHeight > printableHeight ? (printableHeight / rawImgHeight) : 1;
      const finalWidth = pdfPageWidth * scaleFactor;
      const finalHeight = rawImgHeight * scaleFactor;
      const xOffset = (pdfPageWidth - finalWidth) / 2;
      const yOffset = marginMm;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight, undefined, 'FAST');
    } else {
      // Multi-Page Resume: split content across A4 pages with proper position shifts
      let position = 0;
      let heightLeft = rawImgHeight;

      pdf.addImage(imgData, 'PNG', 0, position, pdfPageWidth, rawImgHeight, undefined, 'FAST');
      heightLeft -= pdfPageHeight;

      while (heightLeft > 5) {
        position -= pdfPageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfPageWidth, rawImgHeight, undefined, 'FAST');
        heightLeft -= pdfPageHeight;
      }
    }

    // Direct Browser Download onto User's Device
    pdf.save(safeFilename);
  } finally {
    if (document.body.contains(renderWrapper)) {
      document.body.removeChild(renderWrapper);
    }
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
