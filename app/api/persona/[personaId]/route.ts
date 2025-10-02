import { NextResponse } from "next/server";
import {
  getSpecificPersona,
  updatePersona,
  deletePersona,
} from "@/lib/actions/persona";

type tparams = Promise<{ personaId: string }>;

export async function GET(req: Request, { params }: { params: tparams }) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const personaId = (await params).personaId;
    console.log(personaId, userId);
    if (!userId || !personaId)
      return NextResponse.json(
        {
          success: false,
          message: "Missing userId or personaId",
          details:
            "Both userId (query param) and personaId (route param) are required.",
          status: 400,
        },
        { status: 400 }
      );

    const result = await getSpecificPersona(userId, personaId);
    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Persona not found or access denied",
          details: result.error,
          status: 404,
        },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      data: result.persona,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching persona",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: tparams }) {
  try {
    const body = await req.json();
    const personaId = (await params).personaId;

    const result = await updatePersona({ personaId, ...body });
    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update persona",
          details: result.error,
          status: 500,
        },
        { status: 500 }
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected error while updating persona",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: tparams }) {
  try {
    ``;
    const personaId = (await params).personaId;
    const { userId } = await req.json();
    console.log("personaid", personaId, "userid", userId);
    const result = await deletePersona(personaId, userId);

    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete persona",
          details: result.error,
          status: 500,
        },
        { status: 500 }
      );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected error while deleting persona",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      { status: 500 }
    );
  }
}
