import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, bookingType, checkInDate, checkOutDate, guests, children } =
      await req.json();

    // Check validation of basic parameters
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required fields." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.SMTP_TO || "stay@jalashay.com";

    // Clean display strings for dates
    const checkInStr = new Date(checkInDate).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const checkOutStr = new Date(checkOutDate).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const categoryStr = bookingType === "stay" ? "Stay Reservation" : "Event Booking Enquiry";

    // If SMTP details are not configured, fallback to console log (very useful in dev environment)
    if (!host || !user || !pass) {
      console.log("\n=================== MOCK EMAIL LOG ===================");
      console.log(`TO:       ${toEmail}`);
      console.log(`SUBJECT:  New Reservation Request - ${name}`);
      console.log("------------------------------------------------------");
      console.log(`Guest Name:    ${name}`);
      console.log(`Phone Contact: ${phone}`);
      console.log(`Category:      ${categoryStr}`);
      console.log(`Check-In:      ${checkInStr}`);
      console.log(`Check-Out:     ${checkOutStr}`);
      console.log(`Guests:        ${guests} Adults`);
      console.log(`Children:      ${children} Children`);
      console.log("======================================================\n");

      return NextResponse.json({
        success: true,
        mock: true,
        message: "SMTP configuration missing. Email logged to server console successfully.",
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port || "587"),
      secure: port === "465", // 465 is secure, others use STARTTLS
      auth: {
        user,
        pass,
      },
    });

    // Elegant luxury-themed HTML template matching Jalashay branding
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Reservation request - Jalashay Resort</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e5e5;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #141414; border: 1px solid rgba(194, 168, 98, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.8);">
          <!-- Banner Header -->
          <tr>
            <td align="center" style="background-color: #101010; padding: 40px 20px; border-bottom: 1px solid rgba(194, 168, 98, 0.15);">
              <h1 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 38px; font-weight: 300; letter-spacing: 0.1em; color: #c2a862;">Jalashay Resort</h1>
              <span style="display: block; margin-top: 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: #a3a3a3;">New Booking Enquiry Received</span>
            </td>
          </tr>
          
          <!-- Content Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #c8c8c8;">
                Greetings Hospitality Team,
              </p>
              <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.6; color: #c8c8c8;">
                A new booking enquiry has been submitted through the resort website. The details of the request are outlined below:
              </p>
              
              <!-- Reservation Details Grid Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #c2a862; font-weight: 600; width: 35%;">Guest Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 15px; color: #ffffff;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #c2a862; font-weight: 600;">Contact Phone</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 15px; color: #ffffff;"><a href="tel:${phone}" style="color: #ffffff; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #c2a862; font-weight: 600;">Category</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 15px; color: #ffffff;">${categoryStr}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #c2a862; font-weight: 600;">Check-In</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 15px; color: #ffffff;">${checkInStr}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #c2a862; font-weight: 600;">Check-Out</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 15px; color: #ffffff;">${checkOutStr}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #c2a862; font-weight: 600;">Occupancy</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 15px; color: #ffffff;">${guests} Adults · ${children} Children</td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0 0; font-size: 14px; line-height: 1.6; color: #a3a3a3; font-style: italic; text-align: center;">
                Please contact the guest within 24 hours to finalize details and confirm the booking.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #101010; padding: 24px 20px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; color: #737373;">
              This notification was generated automatically by the resort portal booking form.
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"${name} via Jalashay Resort" <${user}>`,
      to: toEmail,
      subject: `New Reservation Request - ${name} (${bookingType.toUpperCase()})`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully to the hospitality desk.",
    });
  } catch (error: any) {
    console.error("SMTP Email sending failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process the booking email." },
      { status: 500 }
    );
  }
}
