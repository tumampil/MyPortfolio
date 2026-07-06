import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "SMTP credentials are not configured. Please add SMTP_USER and SMTP_PASS in Vercel project settings." },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: smtpUser, // Sends to your own email address
      replyTo: email, // This allows you to click "Reply" in Gmail and message them back!
      subject: `New message from ${name} (Portfolio)`,
      text: `New Portfolio Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
    });

    console.log("Email sent successfully: %s", info.messageId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in SMTP send-email route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
