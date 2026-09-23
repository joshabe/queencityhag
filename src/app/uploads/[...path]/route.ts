import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const uploadsDir = process.env.UPLOADS_DIR;
  if (!uploadsDir) {
    // No custom upload dir configured (local dev) — files live in public/
    // and are already served by Next's static file handling.
    return new NextResponse("Not found", { status: 404 });
  }

  const { path: segments } = await params;
  const filename = segments.join("/");
  const filePath = path.join(uploadsDir, filename);

  // Guard against path traversal outside the uploads directory.
  if (!filePath.startsWith(path.resolve(uploadsDir))) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const data = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
