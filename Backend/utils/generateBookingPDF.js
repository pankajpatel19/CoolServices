const PDFDocument = require("pdfkit");

const generateBookingPDF = (booking, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=booking-${booking._id}.pdf`
  );

  doc.pipe(res);

  // Colors
  const primaryColor = "#2563eb"; // Blue
  const secondaryColor = "#64748b"; // Gray
  const accentColor = "#059669"; // Green
  const lightGray = "#f8fafc";

  // Header with background
  doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);

  // Company Logo/Name (if you have one)
  doc
    .fontSize(24)
    .fillColor("white")
    .text("Cool Services", 50, 30, { align: "center" });

  doc
    .fontSize(12)
    .text("Professional Booking Services", 50, 55, { align: "center" });

  // Reset position after header
  doc.y = 120;

  // Title with decorative line
  doc
    .fillColor(primaryColor)
    .fontSize(28)
    .text("Booking Confirmation", { align: "center" });

  // Decorative underline
  doc
    .strokeColor(primaryColor)
    .lineWidth(2)
    .moveTo(200, doc.y + 10)
    .lineTo(400, doc.y + 10)
    .stroke();

  doc.moveDown(2);

  // Status badge
  doc
    .rect(50, doc.y, 100, 25)
    .fill(accentColor)
    .fillColor("white")
    .fontSize(12)
    .text("CONFIRMED", 55, doc.y + 8);

  doc.moveDown(2);

  // Booking details section
  const startY = doc.y;

  // Left column - Booking Info
  doc.fillColor("#1f2937").fontSize(16).text("Booking Details", 50, startY);

  doc.moveDown(0.5);

  // Details with better formatting
  const details = [
    { label: "Booking ID", value: booking._id },
    { label: "Customer Name", value: booking.name },
    { label: "Email Address", value: booking.email },
    {
      label: "Service Date",
      value: new Date(booking.date).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    { label: "Service Type", value: booking.issue },
  ];

  details.forEach((detail, index) => {
    const y = doc.y;

    // Alternate row background
    if (index % 2 === 0) {
      doc.rect(50, y - 2, 500, 20).fill(lightGray);
    }

    // Label
    doc
      .fillColor(secondaryColor)
      .fontSize(11)
      .text(detail.label + ":", 60, y + 2);

    // Value
    doc
      .fillColor("#1f2937")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(detail.value, 200, y + 2);

    doc.font("Helvetica"); // Reset font
    doc.moveDown(0.8);
  });

  // Amount section with highlight
  doc.moveDown(1);
  doc.rect(50, doc.y, 500, 40).fill(primaryColor);

  doc
    .fillColor("white")
    .fontSize(14)
    .text("Total Amount Paid:", 60, doc.y + 12);

  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .text(`₹${booking.amount || "0"} `, 400, doc.y - 18);

  doc.font("Helvetica"); // Reset font
  doc.moveDown(3);

  // Additional info box
  doc.strokeColor(primaryColor).lineWidth(1).rect(50, doc.y, 500, 80).stroke();

  doc
    .fillColor(primaryColor)
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Important Information", 60, doc.y + 10);

  doc
    .fillColor("#374151")
    .fontSize(10)
    .font("Helvetica")
    .text(
      "• Please arrive 15 minutes before your scheduled appointment",
      60,
      doc.y + 25
    )
    .text("• Bring a valid ID for verification", 60, doc.y + 35)
    .text(
      "• For any changes or cancellations, contact us at least 24 hours in advance",
      60,
      doc.y + 45
    );

  doc.moveDown(3);

  // Thank you message
  doc
    .fillColor(accentColor)
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("Thank you for choosing our services!", { align: "center" });

  doc
    .fillColor(secondaryColor)
    .fontSize(12)
    .font("Helvetica")
    .text("We look forward to serving you.", { align: "center" });

  // Footer
  doc
    .fontSize(8)
    .fillColor(secondaryColor)
    .text(
      `Generated on ${new Date().toLocaleDateString(
        "en-IN"
      )} | Booking Reference: ${booking._id}`,
      50,
      doc.page.height - 50,
      { align: "center" }
    );

  // Add a subtle border around the entire document
  doc
    .strokeColor("#e5e7eb")
    .lineWidth(1)
    .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
    .stroke();

  doc.end();
};

module.exports = generateBookingPDF;
