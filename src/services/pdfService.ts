import { ResumeData } from '../types/resume';

/**
 * Trigger native print dialog for vector PDF output
 */
export function exportToVectorPdf(): void {
  window.print();
}

/**
 * Lazy-loads html2canvas and jsPDF on demand and downloads high-fidelity A4 PDF file directly.
 */
export async function downloadPdfFromElement(
  elementId: string = 'resume-preview-sheet',
  filename: string = 'Resume.pdf'
): Promise<void> {
  const cleanName = filename.replace(/\.pdf$/i, '').trim();
  const safeFilename = `${cleanName || 'Resume'}.pdf`;

  // 1. Wait for Google Fonts / web fonts to finish loading (with max 500ms timeout)
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 500))
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

  // 3. Dynamic import of jsPDF and html2canvas
  const [jsPdfModule, html2CanvasModule] = await Promise.all([
    import('jspdf'),
    import('html2canvas')
  ]);

  const jsPDF =
    (jsPdfModule as any).jsPDF ||
    (jsPdfModule as any).default?.jsPDF ||
    (jsPdfModule as any).default ||
    jsPdfModule;

  const html2canvas =
    (html2CanvasModule as any).default?.default ||
    (html2CanvasModule as any).default ||
    html2CanvasModule;

  if (typeof jsPDF !== 'function') {
    throw new Error(`jsPDF library failed to load (received ${typeof jsPDF}).`);
  }

  if (typeof html2canvas !== 'function') {
    throw new Error(`html2canvas library failed to load (received ${typeof html2canvas}).`);
  }

  // 4. Create isolated visible container positioned behind viewport for clean rendering
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '794px'; // A4 width at 96 DPI
  container.style.zIndex = '-99999';
  container.style.opacity = '1';
  container.style.pointerEvents = 'none';
  container.style.backgroundColor = '#ffffff';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.display = 'block';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';
  clone.style.transform = 'none';
  clone.style.width = '794px';
  clone.style.minHeight = '1123px';
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.boxSizing = 'border-box';
  clone.style.backgroundColor = '#ffffff';

  // Unhide any hidden children inside clone
  const hiddenChildren = clone.querySelectorAll('.hidden');
  hiddenChildren.forEach((child) => {
    (child as HTMLElement).classList.remove('hidden');
    (child as HTMLElement).style.display = 'block';
  });

  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const canvas = await html2canvas(clone, {
      scale: 2, // 192 DPI high resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      imageTimeout: 5000,
      onclone: (clonedDoc: Document) => {
        const avoidElements = clonedDoc.querySelectorAll('.page-break-avoid, .resume-section-item');
        avoidElements.forEach((el) => {
          (el as HTMLElement).style.breakInside = 'avoid';
          (el as HTMLElement).style.pageBreakInside = 'avoid';
        });
      }
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('html2canvas produced an empty canvas.');
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

    // Direct Browser Download
    pdf.save(safeFilename);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
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
