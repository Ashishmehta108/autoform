import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const respons = await fetch(process.env.WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personaId: "test",
      requestId: "id",
      document: {
        storagePath: "path",
        storageFolder: "docs",
      },
    }),
  });
  console.log(respons, await respons.json());
  return NextResponse.json({ success: true });
}
