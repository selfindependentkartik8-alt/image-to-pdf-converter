import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const files = formData
      .getAll("images")
      .filter((item): item is File => item instanceof File);

    if (files.length === 0) {
      return NextResponse.json(
        {
          error: "No images were uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    const pdf = await PDFDocument.create();

    for (const file of files) {
      const type = file.type.toLowerCase();
      const name = file.name.toLowerCase();

      const isJpg =
        type === "image/jpeg" ||
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg");

      const isPng =
        type === "image/png" ||
        name.endsWith(".png");

      if (!isJpg && !isPng) {
        continue;
      }

      const bytes = await file.arrayBuffer();

      let image;

      if (isJpg) {
        image = await pdf.embedJpg(bytes);
      } else {
        image = await pdf.embedPng(bytes);
      }

      const imageWidth = image.width;
      const imageHeight = image.height;

      const maxWidth = 595;
      const maxHeight = 842;

      const scale = Math.min(
        maxWidth / imageWidth,
        maxHeight / imageHeight,
        1
      );

      const width = imageWidth * scale;
      const height = imageHeight * scale;

      const page = pdf.addPage([
        width,
        height,
      ]);

      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    if (pdf.getPageCount() === 0) {
      return NextResponse.json(
        {
          error: "No valid JPG or PNG images were found.",
        },
        {
          status: 400,
        }
      );
    }

    const pdfBytes = await pdf.save();

    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="images-to-pdf.pdf"',
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Image to PDF error:", error);

    return NextResponse.json(
      {
        error: "Failed to create PDF.",
      },
      {
        status: 500,
      }
    );
  }
}