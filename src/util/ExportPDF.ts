import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ReviewMessage } from '../util/FileUtils';

export function exportReviewToPDF({
  reviewResult,
  fileName,
  modelName,
}: {
  reviewResult: ReviewMessage[];
  fileName: string;
  modelName: string;
}) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Code Review Report', 14, 18);
  doc.setFontSize(12);
  doc.text(`File: ${fileName}`, 14, 28);
  doc.text(`Model: ${modelName}`, 14, 36);

  const grouped = reviewResult.reduce((acc, msg) => {
    acc[msg.category] = acc[msg.category] || [];
    acc[msg.category].push(msg.text);
    return acc;
  }, {} as Record<string, string[]>);

  let startY = 44;
  Object.entries(grouped).forEach(([category, items]) => {
    doc.setFontSize(13);
    doc.text(category, 14, startY);
    doc.setFontSize(11);
    autoTable(doc, {
      startY: startY + 2,
      head: [['Issue']],
      body: items.map(text => [text]),
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230] },
      margin: { left: 14 },
    });
    startY = (doc as any).lastAutoTable.finalY + 8;
  });

  doc.save(`${fileName || 'report'}.pdf`);
}
