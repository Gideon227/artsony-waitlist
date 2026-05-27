import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { waitlistSchema } from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);
const WAITLIST_SEGMENT_ID = process.env.RESEND_SEGMENT_ID as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate against the updated schema
    const validatedData = waitlistSchema.parse(body);
    const { email, fullName, type, artFocus } = validatedData;

    // Split name for Resend's default fields
    const [firstName, ...lastNameParts] = fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    const { data, error } = await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      // Add to the "Waitlist" segment
      segments: [{ id: WAITLIST_SEGMENT_ID }],
      // Use the custom properties you created in the dashboard
      properties: {
        user_type: type,
        art_focus: artFocus || "N/A",
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.errors?.[0]?.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}