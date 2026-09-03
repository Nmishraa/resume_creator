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
 * Automatically clones target off-screen if hidden (e.g. Editor Form active) to prevent falling back to print dialog.
 */
export async function downloadPdfFromElement(elementId: string, filename: string = 'Resume.pdf'): Promise<void> {
  let element = document.getElementById(elementId) as HTMLElement | null;

  // Fallback 1: Look for .print-area or sheet element if elementId is not in DOM
  if (!element) {
    element = (document.querySelector('.print-area') ||
               document.querySelector('#cover-letter-sheet') ||
               document.querySelector('[id*="preview"]') ||
               document.querySelector('[class*="resume-sheet"]')) as HTMLElement | null;
  }

  if (!element) {
    console.warn('No resume element found to export to PDF');
    return;
  }

  let tempContainer: HTMLElement | null = null;
  let targetElement = element;

  // If the target element is hidden or has 0 height/width (e.g. user is on Editor Form tab), clone it off-screen in visible state
  if (element.offsetWidth === 0 || element.offsetHeight === 0 || window.getComputedStyle(element).display === 'none') {
    tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '794px';
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
      allowTaint: true,
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

    const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(safeFilename);
  } catch (err) {
    console.error('Direct PDF export error:', err);
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
