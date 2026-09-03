import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types/resume';

/**
 * Trigger native print dialog for vector PDF output
 */
export function exportToVectorPdf(): void {
  window.print();
}

/**
 * Download direct PDF file using html2canvas and jsPDF with high DPI rendering.
 * Guarantees a direct .pdf file download onto the user's computer without opening print dialogs.
 */
export async function downloadPdfFromElement(elementId: string = 'resume-preview-sheet', filename: string = 'Resume.pdf'): Promise<void> {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  // 1. Wait for Google Fonts / web fonts to finish loading (with 1.5s timeout safety)
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise(r => setTimeout(r, 1500))
      ]);
    } catch (e) {
      console.warn('Font loading wait warning:', e);
    }
  }

  let element = document.getElementById(elementId) as HTMLElement | null;

  if (!element) {
    element = (document.querySelector('#resume-preview-sheet') ||
               document.querySelector('.print-area') ||
               document.querySelector('#cover-letter-sheet') ||
               document.querySelector('[id*="preview"]')) as HTMLElement | null;
  }

  if (!element) {
    console.error('Target element for PDF generation not found:', elementId);
    window.print();
    return;
  }

  // Helper function to convert target HTML element to high-res canvas and trigger direct browser save
  const renderCanvasToPdf = async (targetEl: HTMLElement): Promise<boolean> => {
    const canvas = await html2canvas(targetEl, {
      scale: 2, // High DPI resolution (192 DPI equivalent)
      useCORS: true,
      allowTaint: false, // Must be false to prevent browser SecurityError during toDataURL export
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      onclone: (clonedDoc) => {
        const avoidElements = clonedDoc.querySelectorAll('.page-break-avoid, .resume-section-item');
        avoidElements.forEach(el => {
          (el as HTMLElement).style.breakInside = 'avoid';
          (el as HTMLElement).style.pageBreakInside = 'avoid';
        });
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
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
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Subsequent Pages for multi-page resumes
    while (heightLeft >= 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Direct Browser Download onto User's Computer
    pdf.save(safeFilename);
    return true;
  };

  // Create temporary off-screen wrapper for un-transformed rendering
  const tempWrapper = document.createElement('div');
  tempWrapper.style.position = 'fixed';
  tempWrapper.style.left = '-9999px';
  tempWrapper.style.top = '0';
  tempWrapper.style.width = '794px'; // 210mm at 96 DPI
  tempWrapper.style.backgroundColor = '#ffffff';
  tempWrapper.style.zIndex = '-9999';
  tempWrapper.style.overflow = 'hidden';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.width = '794px';
  clone.style.minHeight = '1123px';
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.boxSizing = 'border-box';
  clone.style.backgroundColor = '#ffffff';

  tempWrapper.appendChild(clone);
  document.body.appendChild(tempWrapper);

  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    await renderCanvasToPdf(clone);
  } catch (err) {
    console.warn('Off-screen clone PDF render failed, falling back to direct element capture:', err);
    try {
      await renderCanvasToPdf(element);
    } catch (directErr) {
      console.error('Direct PDF export error:', directErr);
      window.print();
    }
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
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${(resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_data.json`);
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
