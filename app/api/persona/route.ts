import { NextRequest, NextResponse } from "next/server";
import {
  getAllPersona,
  createPersona,
  createRequest,
} from "@/lib/actions/persona";
import { db } from "@/lib/db/db";
import { persona, updationTickets } from "@/lib/db/schema";
import { createPersonaSchema } from "@/lib/actions/validations";

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
        { status: 400 },
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
        { status: 401 },
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
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createPersona(body);
    const parsed = createPersonaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          details: parsed.error.cause,
          status: 400,
        },
        { status: 400 },
      );
    }
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create persona",
          details: result.error,
          status: 500,
        },
        { status: 500 },
      );
    }
    const personaId = result.personaId;
    const requestId = await createRequest(result.personaId!);
    await fetch(process.env.WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personaId,
        requestId,
        document: {
          storagePath: process.env.SUPABASE_STORAGE_PATH,
          storageFolder: body.personauserdetaildocs,
        },
      }),
    });
    return NextResponse.json({
      success: true,
      personaId: personaId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create persona",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updationTicketId = body.updationId;
    if (!updationTicketId) {
      throw new Error("No ticket ID provided");
    }
    const [data] = await db.select().from(updationTickets);
    if (!data.ticketId) {
      throw new Error("False ticket");
    }
    if (data.ticketId !== updationTicketId) {
      throw new Error("Wrong ticket ID");
    }
    if (data.ticketType !== "updatingPersona") {
      throw new Error("Wrong ticket request");
    }
    if (!body) {
      throw new Error("No data to update");
    }
    await db.update(persona).set(body);
    return NextResponse.json(
      {
        success: true,
        message: "Updated persona successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
