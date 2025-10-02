import { parseResume } from "@/lib/actions/resume-parse";
import { NextRequest, NextResponse } from "next/server";
import { UserResume } from "@/lib/actions/get-resume";

export async function GET(req: NextRequest) {
  try {
    const { userId, personaId } = await req.json();
    const resumepath = await UserResume(userId, personaId);
    if (!resumepath)
      return NextResponse.json(
        {
          message: "no resume found",
        },
        {
          status: 401,
        }
      );
    const resume = await parseResume(resumepath);
    return NextResponse.json(
      {
        data: resume,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: "error occured" + error.message,
    });
  }
}
