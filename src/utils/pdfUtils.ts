// utils/pdfUtils.ts
import jsPDF from "jspdf";

export const generateMeetingScriptPDF = async (script: string): Promise<void> => {
  if (!script) return;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;

  const cleanScript = script
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2026/g, "...")
    .trim();

  const formattedScript = cleanScript
    .split(/(?=Client:|Developer:)/g)
    .filter((section) => section.trim().length > 0)
    .map((section) => {
      const trimmed = section.trim();
      if (trimmed.startsWith("Client:")) {
        return "\nCLIENT:\n" + trimmed.substring(7).trim() + "\n";
      } else if (trimmed.startsWith("Developer:")) {
        return "\nDEVELOPER:\n" + trimmed.substring(10).trim() + "\n";
      }
      return trimmed;
    })
    .join("\n");

  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("Meeting Script", margin, margin + 10);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  const currentDate = new Date().toLocaleDateString("en-US");
  pdf.text(`Generated on: ${currentDate}`, margin, margin + 20);

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");

  const lines: string[] = [];
  const paragraphs = formattedScript.split("\n");

  paragraphs.forEach((paragraph) => {
    if (paragraph.trim() === "") {
      lines.push("");
      return;
    }

    if (paragraph.includes("CLIENT:") || paragraph.includes("DEVELOPER:")) {
      lines.push(paragraph);
      return;
    }

    const words = paragraph.split(" ");
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const textWidth = pdf.getTextWidth(testLine);

      if (textWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }
  });

  let yPosition = margin + 35;
  const lineHeight = 6;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (yPosition + lineHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin + 10;
    }

    if (line.includes("CLIENT:") || line.includes("DEVELOPER:")) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight + 2;
    } else if (line.trim() === "") {
      yPosition += lineHeight * 0.5;
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.text(line, margin + 5, yPosition);
      yPosition += lineHeight;
    }
  }

  const timestamp = new Date().toISOString().slice(0, 10);
  pdf.save(`meeting-script-${timestamp}.pdf`);
};
