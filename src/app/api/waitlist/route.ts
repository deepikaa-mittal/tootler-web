import { NextRequest, NextResponse } from "next/server";
import { validateWaitlistInput } from "@/lib/validation";
import { sendSlackNotification } from "@/lib/slack";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { valid, errors, parsed } = validateWaitlistInput(body);
  if (!valid || !parsed) {
    return NextResponse.json({ error: errors[0] }, { status: 400 });
  }

  const { name, email } = parsed;

  try {
    // Fire-and-forget, don't block the response on Slack
    sendSlackNotification(name, email);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist notification failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}