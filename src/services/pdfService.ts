import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types/resume';

/**
 * Trigger native print dialog if user explicitly requests print preview
 */
export function exportToVectorPdf(): void {
  window.print();
}

/**
 * Download direct PDF file using html2canvas and jsPDF with high DPI rendering.
 * Guarantees a direct .pdf file download onto the user's computer without opening print dialogs.
 */
export async function downloadPdfFromElement(elementId: string, filename: string = 'Resume.pdf'): Promise<void> {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  let element = document.getElementById(elementId) as HTMLElement | null;

  // Fallback 1: Look for .print-area or sheet element if elementId is not in DOM
  if (!element) {
    element = (document.querySelector('.print-area') ||
               document.querySelector('#cover-letter-sheet') ||
               document.querySelector('#resume-preview-sheet') ||
               document.querySelector('[id*="preview"]') ||
               document.querySelector('[class*="resume-sheet"]')) as HTMLElement | null;
  }

  // Fallback 2: If no sheet element is found, use body
  if (!element) {
    console.warn('Target element not found for PDF export:', elementId);
    element = document.body;
  }

  let tempContainer: HTMLElement | null = null;
  let targetElement = element;

  // If the target element is hidden or has 0 height/width (e.g. user is on Editor Form tab), clone it off-screen in visible state
  const isHidden = element.offsetWidth === 0 || element.offsetHeight === 0 || window.getComputedStyle(element).display === 'none';

  if (isHidden) {
    tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '794px'; // Standard A4 width at 96 DPI
    tempContainer.style.zIndex = '-9999';
    tempContainer.style.opacity = '1';
    tempContainer.style.visibility = 'visible';
    tempContainer.style.background = '#ffffff';

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.display = 'block';
    clone.style.visibility = 'visible';
    clone.style.width = '794px';
    clone.style.transform = 'none';

    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    targetElement = clone;
  }

  try {
    const canvas = await html2canvas(targetElement, {
      scale: 2, // High DPI resolution (192 DPI equivalent)
      useCORS: true,
      allowTaint: false, // Prevent canvas taint security errors
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      windowHeight: targetElement.scrollHeight || 1123
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width mm
    const pageHeight = 297; // A4 height mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft >= 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Trigger direct browser file download via Blob URL for maximum browser compatibility
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = safeFilename;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    setTimeout(() => {
      if (document.body.contains(downloadLink)) {
        document.body.removeChild(downloadLink);
      }
      URL.revokeObjectURL(blobUrl);
    }, 200);

  } catch (err) {
    console.error('Direct PDF rendering error:', err);

    // Fallback: Create simple text-based PDF via jsPDF if canvas rendering fails
    try {
      const fallbackPdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      fallbackPdf.setFontSize(16);
      fallbackPdf.text('Resume Document', 20, 20);
      fallbackPdf.setFontSize(11);
      const textContent = targetElement.innerText || 'Resume Content';
      const lines = fallbackPdf.splitTextToSize(textContent, 170);
      fallbackPdf.text(lines, 20, 30);
      
      const blob = fallbackPdf.output('blob');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = safeFilename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => link.remove(), 200);
    } catch (fallbackErr) {
      console.error('Fallback PDF generation error:', fallbackErr);
    }
  } finally {
    if (tempContainer && document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
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
  const safeName = (resume.personalInfo.fullName || 'resume').replace(/\s+/g, '_').toLowerCase();
  downloadAnchor.setAttribute('download', `${safeName}_resume_craft.json`);
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
