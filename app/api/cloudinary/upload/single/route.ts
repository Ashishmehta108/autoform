import { NextRequest } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  let fpath;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  try {
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    fpath = filePath;
    const result = await uploadToCloudinary(filePath);
    if (!result.secure_url) {
      await unlink(filePath);
      return NextResponse.json({
        success: false,
      });
    }

    await unlink(filePath);
    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (err) {
    await unlink(fpath!);
    console.error(err);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
