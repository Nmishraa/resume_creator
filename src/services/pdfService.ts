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

  // 1. Wait for Google Fonts / web fonts to finish loading (with 1s timeout safety)
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
    const errorMsg = `Target element for PDF generation not found (#${elementId}).`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // 3. Lazy-load PDF libraries (jsPDF and html2canvas) on demand to keep initial homepage bundle light
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas')
  ]);

  // 4. Create off-screen container for rendering un-transformed DOM clone
  const tempWrapper = document.createElement('div');
  tempWrapper.style.position = 'fixed';
  tempWrapper.style.left = '-9999px';
  tempWrapper.style.top = '0';
  tempWrapper.style.width = '794px'; // A4 210mm at 96 DPI
  tempWrapper.style.backgroundColor = '#ffffff';
  tempWrapper.style.zIndex = '99999';
  tempWrapper.style.opacity = '1';
  tempWrapper.style.visibility = 'visible';
  tempWrapper.style.overflow = 'hidden';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.display = 'block';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';
  clone.style.transform = 'none';
  clone.style.width = '794px';
  clone.style.minHeight = '1123px'; // A4 height at 96 DPI
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.boxSizing = 'border-box';
  clone.style.backgroundColor = '#ffffff';

  // Unhide any hidden children inside clone (e.g. if responsive layout hid parent)
  const hiddenChildren = clone.querySelectorAll('.hidden');
  hiddenChildren.forEach((child) => {
    (child as HTMLElement).classList.remove('hidden');
    (child as HTMLElement).style.display = 'block';
  });

  tempWrapper.appendChild(clone);
  document.body.appendChild(tempWrapper);

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Render off-screen clone with html2canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // 192 DPI high resolution
      useCORS: true,
      allowTaint: false, // Prevents SecurityError on canvas export
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      imageTimeout: 3000,
      onclone: (clonedDoc) => {
        const avoidElements = clonedDoc.querySelectorAll('.page-break-avoid, .resume-section-item');
        avoidElements.forEach((el) => {
          (el as HTMLElement).style.breakInside = 'avoid';
          (el as HTMLElement).style.pageBreakInside = 'avoid';
        });
      }
    });

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

    // Direct Browser Download onto User's Computer
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = safeFilename;
    downloadAnchor.style.display = 'none';
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();

    setTimeout(() => {
      if (document.body.contains(downloadAnchor)) {
        document.body.removeChild(downloadAnchor);
      }
      URL.revokeObjectURL(blobUrl);
    }, 500);

  } finally {
    if (document.body.contains(tempWrapper)) {
      document.body.removeChild(tempWrapper);
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
