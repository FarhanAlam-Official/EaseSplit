// API route for sending settlement reminder notifications
// This endpoint sends personalized emails to group members who need to make payments
// including payment details, visual transfer representation, and next steps

import { NextResponse } from "next/server"
// Next.js server utility for handling HTTP responses

import nodemailer from "nodemailer"
// Library for sending emails via SMTP

/**
 * POST handler for sending settlement reminder notifications
 * @param request - Request object containing payment details and recipient information
 * @returns NextResponse with success status or error message
 */
export async function POST(request: Request) {
  try {
    // Extract data from request body with type casting
    const { to, fromName, toName, amount, currency, groupName } = (await request.json()) as {
      to: string
      fromName: string
      toName: string
      amount: number
      currency: string
      groupName: string
    }

    // Use default SMTP from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER || "",
      password: process.env.SMTP_PASSWORD || "",
    }

    // Create nodemailer transporter with SMTP configuration
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password,
      },
    })

    // Map currency to symbol
    const currencySymbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      INR: "₹",
      NPR: "Rs.",
      AUD: "A$",
      CAD: "C$",
    }
    const currencySymbol = currencySymbols[currency] || currency

    // Create HTML email template with payment details and visual representation
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Settlement Reminder - EaseSplit</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
          .header { background: linear-gradient(135deg, #09bc8a 0%, #078a68 100%); color: white; padding: 40px 30px; text-align: center; position: relative; overflow: hidden; }
          .header::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
          .header-icon { font-size: 56px; margin-bottom: 16px; position: relative; z-index: 1; animation: bounce 2s infinite; }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          .header h1 { margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1; }
          .header-subtitle { margin: 12px 0 0; font-size: 18px; opacity: 0.95; font-weight: 600; position: relative; z-index: 1; }
          .header-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 18px; border-radius: 20px; font-size: 13px; margin-top: 14px; font-weight: 600; backdrop-filter: blur(10px); }
          .content { padding: 35px 30px; }
          .alert-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 5px solid #f59e0b; border-radius: 12px; padding: 24px; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .alert-box p { color: #78350f; margin: 0; font-size: 16px; line-height: 1.8; }
          .alert-icon { font-size: 28px; margin-bottom: 12px; }
          .amount-box { background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%); border-radius: 14px; padding: 32px; margin-bottom: 28px; border: 3px solid #10b981; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); text-align: center; }
          .amount-label { color: #065f46; margin: 0 0 12px 0; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
          .amount-value { color: #059669; margin: 0 0 28px 0; font-size: 56px; font-weight: 900; line-height: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .transfer-visual { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .avatar { text-align: center; }
          .avatar-circle { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 32px; font-weight: 800; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .avatar-from { background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 4px solid #ef4444; color: #dc2626; }
          .avatar-to { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 4px solid #10b981; color: #059669; }
          .avatar-name { margin: 0; color: #374151; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
          .arrow { color: #10b981; font-size: 32px; font-weight: 900; animation: slide 1.5s infinite; }
          @keyframes slide { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
          .info-card { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin-bottom: 28px; border-left: 5px solid #3b82f6; }
          .info-card p { color: #1e40af; margin: 0; font-size: 15px; line-height: 1.8; }
          .tips-box { background: #f0fdf4; border-radius: 12px; padding: 24px; margin-bottom: 28px; border: 2px solid #86efac; }
          .tips-title { color: #065f46; font-size: 18px; font-weight: 700; margin: 0 0 16px; display: flex; align-items: center; gap: 8px; }
          .tips-list { margin: 0; padding-left: 24px; color: #166534; }
          .tips-list li { margin-bottom: 10px; font-size: 14px; line-height: 1.7; }
          .footer { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 32px 30px; text-align: center; }
          .footer-brand { color: #10b981; font-size: 22px; font-weight: 700; margin-bottom: 12px; }
          .footer-text { margin: 8px 0; font-size: 14px; color: #d1d5db; line-height: 1.6; }
          .footer-meta { margin-top: 18px; padding-top: 18px; border-top: 1px solid #374151; font-size: 12px; color: #9ca3af; }
          @media only screen and (max-width: 600px) {
            body { padding: 10px; }
            .content { padding: 25px 20px; }
            .amount-value { font-size: 42px; }
            .transfer-visual { flex-direction: column; gap: 12px; }
            .arrow { transform: rotate(90deg); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">💰</div>
            <h1>EaseSplit</h1>
            <div class="header-subtitle">Settlement Reminder</div>
            <div class="header-badge">Payment Required</div>
          </div>

          <div class="content">
            <div class="alert-box">
              <div class="alert-icon">⚠️</div>
              <p>
                <strong>Hi ${fromName},</strong><br><br>
                This is a friendly reminder about your pending settlement in the group <strong>"${groupName}"</strong>. Please review the payment details below and settle your balance at your earliest convenience.
              </p>
            </div>

            <div class="amount-box">
              <p class="amount-label">💳 Amount to Pay</p>
              <p class="amount-value">${currencySymbol}${amount.toFixed(2)}</p>
              
              <div class="transfer-visual">
                <div class="avatar">
                  <div class="avatar-circle avatar-from">
                    ${fromName.charAt(0).toUpperCase()}${fromName.charAt(1) ? fromName.charAt(1).toUpperCase() : ''}
                  </div>
                  <p class="avatar-name">You (${fromName})</p>
                </div>

                <div class="arrow">→</div>

                <div class="avatar">
                  <div class="avatar-circle avatar-to">
                    ${toName.charAt(0).toUpperCase()}${toName.charAt(1) ? toName.charAt(1).toUpperCase() : ''}
                  </div>
                  <p class="avatar-name">${toName}</p>
                </div>
              </div>
            </div>

            <div class="info-card">
              <p>
                <strong>📋 Transaction Details:</strong><br>
                • <strong>From:</strong> ${fromName}<br>
                • <strong>To:</strong> ${toName}<br>
                • <strong>Amount:</strong> ${currencySymbol}${amount.toFixed(2)}<br>
                • <strong>Group:</strong> ${groupName}<br>
                • <strong>Currency:</strong> ${currency}<br>
                • <strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div class="tips-box">
              <div class="tips-title">💡 Next Steps</div>
              <ul class="tips-list">
                <li><strong>Make the payment</strong> to ${toName} using your preferred payment method</li>
                <li><strong>Notify ${toName}</strong> once the payment is completed</li>
                <li><strong>Mark as settled</strong> in the EaseSplit app to update everyone's balance</li>
                <li><strong>Keep your receipt</strong> or transaction confirmation for your records</li>
              </ul>
            </div>

            <div style="background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 18px; text-align: center;">
              <p style="color: #78350f; margin: 0; font-size: 13px; line-height: 1.6;">
                <strong>⏰ Reminder:</strong> Timely settlements help keep group finances organized and maintain trust among members.
              </p>
            </div>
          </div>

          <div class="footer">
            <div class="footer-brand">💰 EaseSplit</div>
            <p class="footer-text">Split expenses with ease • Stay organized • Keep friendships strong</p>
            <div class="footer-meta">
              <p style="margin: 4px 0;">This is an automated reminder sent by EaseSplit</p>
              <p style="margin: 4px 0;">Notification sent on ${new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using configured transporter
    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpConfig.user,
      to,
      subject: `💰 EaseSplit - Settlement Reminder: ${groupName}`,
      html,
    })

    // Return successful response
    return NextResponse.json({ success: true })
  } catch (error) {
    // Log error and return failure response
    console.error("Settlement notification error:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}