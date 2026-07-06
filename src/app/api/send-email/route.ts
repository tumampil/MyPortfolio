import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service API key is missing. Please configure RESEND_API_KEY in Vercel project settings." },
        { status: 500 }
      );
    }

    // Call Resend's REST API endpoint directly using standard fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "jaspertumampil@gmail.com",
        reply_to: email, // This allows you to click "Reply" in Gmail and message them back!
        subject: `New message from ${name} (Portfolio)`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #1a2a1a; background-color: #f7faf7; border: 1px solid rgba(0,255,65,0.15); border-radius: 8px; max-width: 600px;">
            <h2 style="color: #008020; margin-top: 0; border-bottom: 2px solid #00ff41; padding-bottom: 8px;">New Contact Form Message</h2>
            
            <div style="margin-top: 16px;">
              <p style="margin: 4px 0;"><strong>Sender Name:</strong> ${name}</p>
              <p style="margin: 4px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #008020; text-decoration: none;">${email}</a></p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid rgba(0,255,65,0.15); margin: 20px 0;" />
            
            <div>
              <h3 style="margin-top: 0; color: #1a2a1a;">Message:</h3>
              <div style="background-color: #ffffff; padding: 16px; border-left: 4px solid #00ff41; border-radius: 4px; white-space: pre-wrap; font-family: monospace; font-size: 14px; line-height: 1.5; color: #2d3748;">${message}</div>
            </div>
            
            <p style="margin-top: 24px; font-size: 11px; color: #718096; font-style: italic;">This email was sent automatically from your Next.js developer portfolio contact form.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      console.error("Resend API response failure:", errorMsg);
      return NextResponse.json(
        { error: "Failed to send email via mail service." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in send-email API route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
