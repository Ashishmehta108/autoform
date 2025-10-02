// import { writeFile, mkdir } from "fs/promises";
// import path from "path";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);
//   const fileName = `${Date.now()}-${file.name}`;
//   const uploadDir = path.join(process.cwd(), "public", "uploads");

//   try {
//     await mkdir(uploadDir, { recursive: true });
//     const filePath = path.join(uploadDir, fileName);
//     await writeFile(filePath, buffer);

//     return NextResponse.json({ success: true, url: `/uploads/${fileName}` });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
//   }
// }

// app/api/upload/route.tsimport { writeFile, mkdir, unlink } from "fs/promises";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server key
);

export async function POST(req: Request) {
  let filePath: string | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });

    filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(fileName, buffer, { contentType: file.type, upsert: true });

    await unlink(filePath);

    if (uploadError) {
      console.error("Supabase upload error:", uploadError.message);
      return NextResponse.json(
        { error: "Upload to Supabase failed" },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (err) {
    console.error("Upload failed:", err);

    if (filePath) {
      try {
        await unlink(filePath);
      } catch (cleanupErr) {
        console.error("Failed to cleanup local file:", cleanupErr);
      }
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
