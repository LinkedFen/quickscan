import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const FILE_NAME = "QuickScan_LogistiekeKetenvolwassenheid.pdf";

export async function exportResultsPdf({
  node,
  name,
  email,
  narrative,
  logoDataUri
}) {
  if (!node) return null;

  const canvas = await html2canvas(node, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 36;
  const usable = pageWidth - margin * 2;

  if (logoDataUri) {
    try {
      const logoImg = new Image();
      logoImg.src = logoDataUri;
      await logoImg.decode();
      pdf.addImage(logoImg, "PNG", margin, 20, 120, 32);
    } catch (e) {
      console.warn("Logo kon niet geladen worden", e);
    }
  }

  pdf.setFontSize(14);
  pdf.text("Quick Scan Logistieke Ketenvolwassenheid", margin, 72);
  pdf.setFontSize(10);
  const dt = new Date().toLocaleString();
  pdf.text(`Naam: ${name}  •  E-mail: ${email}  •  Datum: ${dt}`, margin, 88);

  const imgWidth = usable;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const yStart = 100;
  pdf.addImage(
    imgData,
    "PNG",
    margin,
    yStart,
    imgWidth,
    Math.min(imgHeight, pageHeight - yStart - 160)
  );

  let narrativeY = yStart + Math.min(imgHeight, pageHeight - yStart - 160) + 20;
  if (narrativeY > pageHeight - 120) {
    pdf.addPage();
    narrativeY = 60;
  }
  pdf.setFontSize(12);
  pdf.text("Advies (samenvatting)", margin, narrativeY);
  pdf.setFontSize(10);
  const split = pdf.splitTextToSize(narrative, usable);
  pdf.text(split, margin, narrativeY + 16);

  pdf.save(FILE_NAME);
  return pdf;
}
