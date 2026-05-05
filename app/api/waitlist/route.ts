import { NextResponse } from "next/server";
import { Resend } from "resend";
import { waitlistSchema } from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);

    const { data, error } = await resend.emails.send({
      from: "Artsony Waitlist <onboarding@resend.dev>", // Update with verified domain
      to: ["gideonolaiya02@gmail.com"], // Your notification email
      subject: `New Waitlist Signup: ${validatedData.type}`,
      html: `<p><strong>Name:</strong> ${validatedData.fullName}</p>
             <p><strong>Email:</strong> ${validatedData.email}</p>
             <p><strong>Type:</strong> ${validatedData.type}</p>`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.errors || "Invalid request" }, { status: 400 });
  }
}