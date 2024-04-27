"use client";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Home = () => {
  const generatePdf = async () => {
    const contentDiv = document.createElement("div");
    contentDiv.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
       <h1>Your HTML Content Here</h1>
      </body>
    </html>
    `;

    document.body.appendChild(contentDiv);
    contentDiv.style.position = "absolute";
    contentDiv.style.top = "-9999px";
    const canvas = await html2canvas(contentDiv);
    document.body.removeChild(contentDiv);

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const contentWidth = canvas.width;
    const contentHeight = canvas.height;

    const scaleX = (pdfWidth - 10) / contentWidth;
    const scaleY = (pdfHeight - 10) / contentHeight;

    const scale = Math.min(scaleX, scaleY);

    const scaledWidth = contentWidth * scale;
    const scaledHeight = contentHeight * scale;

    const xPos = (pdfWidth - scaledWidth) / 2;
    const yPos = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, "JPG", xPos, yPos, scaledWidth, scaledHeight);

    pdf.save("Receipt.pdf");
  };

  return (
    <>
      <h1>Generate your pdf</h1>
      <div>
        <button onClick={generatePdf}>Generate PDF</button>
      </div>
    </>
  );
};

export default Home;
