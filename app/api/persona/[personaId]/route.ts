import { NextResponse } from "next/server";
import {
  getSpecificPersona,
  updatePersona,
  deletePersona,
} from "@/lib/actions/persona";
import { updatePersonaSchema } from "@/lib/actions/validations";

type tparams = Promise<{ personaId: string }>;

export async function GET(req: Request, { params }: { params: tparams }) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const personaId = (await params).personaId;
    if (!userId || !personaId)
      return NextResponse.json(
        {
          success: false,
          message: "Missing userId or personaId",
          details:
            "Both userId (query param) and personaId (route param) are required.",
          status: 400,
        },
        { status: 400 },
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
        { status: 404 },
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
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, { params }: { params: tparams }) {
  try {
    const body = await req.json();
    const personaId = (await params).personaId;
    const parsed = updatePersonaSchema.safeParse({ personaId, ...body });
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          details: parsed.error.issues,
          status: 400,
        },
        { status: 400 },
      );
    }
    const result = await updatePersona({ personaId, ...body });
    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update persona",
          details: result.error,
          status: 500,
        },
        { status: 500 },
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
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: { params: tparams }) {
  try {
    const personaId = (await params).personaId;
    const { userId } = await req.json();
    if (!userId || !personaId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing userId or personaId",
          details:
            "Both userId (query param) and personaId (route param) are required.",
          status: 400,
        },
        { status: 400 },
      );
    }
    const result = await deletePersona(personaId, userId);

    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete persona",
          details: result.error,
          status: 500,
        },
        { status: 500 },
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
      { status: 500 },
    );
  }
}
