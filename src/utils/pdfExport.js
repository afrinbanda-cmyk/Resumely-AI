import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

/**
 * Exports an HTML element as an A4 PDF document directly in the browser.
 * @param {HTMLElement} element - The DOM element containing the resume preview
 * @param {string} filename - Filename for the downloaded PDF
 * @returns {Promise<boolean>}
 */
export async function exportResumeToPDF(element, filename = 'Resume.pdf') {
  if (!element) {
    throw new Error('Resume element not found');
  }

  // Create canvas from element with high scale for retina print quality
  const canvas = await html2canvas(element, {
    scale: 2, // 2x scale for sharp print resolution
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#FFFFFF',
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (clonedDoc) => {
      // Remove any interactive UI borders, shadow markers or edit tools in cloned DOM
      const target = clonedDoc.querySelector('.resume-a4-page') || clonedDoc.body;
      if (target) {
        target.style.boxShadow = 'none';
        target.style.borderRadius = '0';
        target.style.transform = 'none';
      }
    },
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  // A4 dimensions in mm
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = 210;
  const pdfHeight = 297;
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pdfHeight;

  // Add additional pages if content exceeds single page
  while (heightLeft > 5) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;
  }

  // Download PDF
  pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);

  // Fire joyful celebration confetti
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#E39A7B', '#DBB06B', '#FFD3AC', '#FFB5AB'],
    });
  } catch {
    // ignore confetti error if canvas unmounted
  }

  return true;
}
