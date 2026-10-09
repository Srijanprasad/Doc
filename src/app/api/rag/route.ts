import { NextRequest, NextResponse } from "next/server";
import { queryRagAssistant } from "@/lib/rag";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body?.query;

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "A valid 'query' string parameter is required." },
        { status: 400 }
      );
    }

    // Safety input size cap
    if (query.length > 500) {
      return NextResponse.json(
        { error: "Query exceeds the maximum allowable length of 500 characters." },
        { status: 400 }
      );
    }

    const result = queryRagAssistant(query.trim());
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process RAG query", details: err?.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json(
      { error: "Please provide a 'q' search parameter." },
      { status: 400 }
    );
  }

  const result = queryRagAssistant(q);
  return NextResponse.json(result);
}
