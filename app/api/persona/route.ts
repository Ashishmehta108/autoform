import { NextResponse } from "next/server";
import { getAllPersona, createPersona } from "@/lib/actions/persona";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required field: userId",
          details: "The query string must contain ?userId=<id>",
          status: 400,
        },
        { status: 400 }
      );
    }

    const result = await getAllPersona(userId);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch personas",
          details: result.error,
          status: 401,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      personas: result.personas,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createPersona(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create persona",
          details: result.error,
          status: 500,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      personaId: body.personaId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create persona",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      { status: 500 }
    );
  }
}
