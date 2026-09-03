import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types/resume';

/**
 * Trigger native print dialog which produces 100% clean vector ATS-compliant PDF with selectable text
 */
export function exportToVectorPdf(): void {
  window.print();
}

/**
 * Download direct PDF using html2canvas and jsPDF with high DPI rendering
 */
export async function downloadPdfFromElement(elementId: string, filename: string = 'Resume.pdf'): Promise<void> {
  let element = document.getElementById(elementId) as HTMLElement | null;

  // Fallback 1: Look for .print-area or sheet element if elementId is not in DOM
  if (!element) {
    element = (document.querySelector('.print-area') || document.querySelector('#cover-letter-sheet')) as HTMLElement | null;
  }

  // Fallback 2: Trigger print dialog if no DOM sheet is rendered
  if (!element) {
    window.print();
    return;
  }

  try {
    // Render element directly using html2canvas with CORS and high DPI resolution
    const canvas = await html2canvas(element, {
      scale: 2, // High DPI resolution (192 DPI equivalent)
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth || 794,
      windowHeight: element.scrollHeight || 1123
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

    pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
  } catch (err) {
    console.error('Direct PDF export error, falling back to vector print dialog:', err);
    window.print();
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
