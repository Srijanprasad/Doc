import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { message: "Newsletter subscriptions are not configured yet." },
      { status: 503 },
    );
  }

  const { error } = await getSupabase()
    .from("newsletter_subscribers")
    .insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({
        message: "You are already subscribed to the High-Signal Dispatch.",
      });
    }

    console.error("Newsletter subscription failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    const setupError =
      error.code === "42P01"
        ? "The newsletter table is missing. Run supabase-schema.sql in Supabase SQL Editor."
        : error.code === "42501"
          ? "Newsletter permissions are not configured. Re-run the newsletter section of supabase-schema.sql."
          : !error.code
            ? "The newsletter service could not be reached. Check the Supabase URL and restart the site."
          : null;

    return NextResponse.json(
      {
        message: setupError || "We could not save your subscription. Please try again later.",
      },
      { status: setupError ? 503 : 502 },
    );
  }

  return NextResponse.json({
    message: "You are subscribed to the High-Signal Dispatch.",
  });
}
