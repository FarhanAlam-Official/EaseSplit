// API route for handling contact form submissions
// This endpoint receives contact form data and sends it to the admin email

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

/**
 * POST handler for contact form submissions
 * @param request - Request object containing name, email, subject, and message
 * @returns NextResponse with success status or error message
 */
export async function POST(request: Request) {
  try {
    // Extract data from request body
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Get SMTP configuration from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER || "",
      password: process.env.SMTP_PASSWORD || "",
    }

    // Get admin email from environment
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

    if (!adminEmail || !smtpConfig.user || !smtpConfig.password) {
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      )
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password,
      },
    })

    // Verify transporter configuration
    await transporter.verify()

    // Get the from email configuration
    const fromEmail = process.env.SMTP_FROM || `EaseSplit <${smtpConfig.user}>`

    // Generate HTML email template for admin
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%); margin: 0; padding: 20px; }
          .container { max-width: 680px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
          .header { background: linear-gradient(135deg, #09bc8a 0%, #078a68 100%); color: white; padding: 40px 30px; text-align: center; position: relative; overflow: hidden; }
          .header::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
          .header-icon { font-size: 48px; margin-bottom: 16px; position: relative; z-index: 1; }
          .header h1 { margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1; }
          .header-subtitle { margin: 12px 0 0; font-size: 16px; opacity: 0.95; font-weight: 500; position: relative; z-index: 1; }
          .header-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 13px; margin-top: 12px; font-weight: 600; backdrop-filter: blur(10px); }
          .content { padding: 35px 30px; }
          .alert-box { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 5px solid #3b82f6; border-radius: 12px; padding: 24px; margin-bottom: 28px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .alert-box p { color: #1e3a8a; margin: 0; font-size: 15px; line-height: 1.8; }
          .field { margin-bottom: 20px; }
          .field-label { font-weight: 700; color: #374151; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; display: block; }
          .field-value { color: #1f2937; padding: 16px; background: #f9fafb; border-radius: 10px; border-left: 4px solid #10b981; font-size: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .message-box { background: linear-gradient(135deg, #f0fdfa 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 12px; padding: 24px; margin-top: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .message-box .field-label { color: #065f46; margin-bottom: 12px; }
          .message-content { color: #1f2937; white-space: pre-wrap; line-height: 1.8; font-size: 15px; }
          .reply-button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; margin-top: 24px; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3); transition: all 0.2s; }
          .reply-button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px -1px rgba(16, 185, 129, 0.4); }
          .footer { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 30px; text-align: center; }
          .footer-brand { color: #10b981; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
          .footer-text { margin: 8px 0; font-size: 14px; color: #d1d5db; }
          .footer-meta { margin-top: 16px; padding-top: 16px; border-top: 1px solid #374151; font-size: 12px; color: #9ca3af; }
          @media only screen and (max-width: 600px) {
            body { padding: 10px; }
            .content { padding: 25px 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">📧</div>
            <h1>Contact Form</h1>
            <div class="header-subtitle">New Message Received</div>
            <div class="header-badge">Requires Response</div>
          </div>
          <div class="content">
            <div class="alert-box">
              <p>📬 You have received a new message from the EaseSplit contact form. Please review the details below and respond at your earliest convenience.</p>
            </div>
            
            <div class="field">
              <span class="field-label">👤 From</span>
              <div class="field-value"><strong>${name}</strong></div>
            </div>
            
            <div class="field">
              <span class="field-label">✉️ Email Address</span>
              <div class="field-value"><a href="mailto:${email}" style="color: #059669; text-decoration: none; font-weight: 600;">${email}</a></div>
            </div>
            
            <div class="field">
              <span class="field-label">📋 Subject</span>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="message-box">
              <span class="field-label">💬 Message</span>
              <div class="message-content">${message}</div>
            </div>
            
            <div style="text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-button" style="color: white !important; text-decoration: none;">📨 Reply to ${name}</a>
            </div>

            <div style="background: #f0fdf4; border-radius: 10px; padding: 20px; margin-top: 28px; border-left: 4px solid #10b981;">
              <p style="color: #065f46; margin: 0; font-size: 14px; line-height: 1.7;">
                💡 <strong>Quick Tip:</strong> Respond within 24 hours to maintain excellent customer service standards.
              </p>
            </div>
          </div>
          <div class="footer">
            <div class="footer-brand">💰 EaseSplit</div>
            <p class="footer-text">Split expenses with ease • Stay organized • Keep friendships strong</p>
            <div class="footer-meta">
              <p style="margin: 4px 0;">Message received on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p style="margin: 12px 0 8px;"><a href="https://ease-split.vercel.app" style="color: #10b981; text-decoration: none; font-weight: 600;">Visit EaseSplit</a> • <a href="https://github.com/FarhanAlam-Official" style="color: #10b981; text-decoration: none; font-weight: 600;">GitHub</a> • <a href="https://ease-split.vercel.app/contact" style="color: #10b981; text-decoration: none; font-weight: 600;">Contact</a></p>
              <p style="margin: 8px 0 4px; font-size: 11px;">Made with ❤️ by <a href="https://github.com/FarhanAlam-Official" style="color: #10b981; text-decoration: none; font-weight: 600;">Farhan Alam</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Generate confirmation email for the user
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting EaseSplit</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%); margin: 0; padding: 20px; }
          .container { max-width: 680px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
          .header { background: linear-gradient(135deg, #09bc8a 0%, #078a68 100%); color: white; padding: 40px 30px; text-align: center; position: relative; overflow: hidden; }
          .header::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
          .header-icon { font-size: 56px; margin-bottom: 16px; position: relative; z-index: 1; animation: bounce 2s infinite; }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          .header h1 { margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1; }
          .header-subtitle { margin: 12px 0 0; font-size: 18px; opacity: 0.95; font-weight: 600; position: relative; z-index: 1; }
          .header-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 18px; border-radius: 20px; font-size: 13px; margin-top: 14px; font-weight: 600; backdrop-filter: blur(10px); }
          .content { padding: 35px 30px; }
          .content h2 { color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 700; }
          .content p { color: #4b5563; margin-bottom: 16px; font-size: 15px; line-height: 1.8; }
          .info-box { background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%); border-left: 5px solid #10b981; padding: 24px; margin: 24px 0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .info-box p { color: #065f46; margin: 0; font-size: 15px; line-height: 1.8; }
          .info-box p strong { color: #047857; }
          .message-recap { background: #f9fafb; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981; margin: 24px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .message-recap p { color: #1f2937; margin: 0; font-size: 14px; line-height: 1.8; white-space: pre-wrap; }
          .button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 10px; margin: 24px 0; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3); transition: all 0.2s; }
          .button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px -1px rgba(16, 185, 129, 0.4); }
          .features { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid #93c5fd; }
          .features h3 { color: #1e40af; font-size: 18px; font-weight: 700; margin: 0 0 16px; }
          .features ul { margin: 0; padding-left: 24px; color: #1e3a8a; }
          .features li { margin-bottom: 10px; font-size: 14px; line-height: 1.7; }
          .footer { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 32px 30px; text-align: center; }
          .footer-brand { color: #10b981; font-size: 22px; font-weight: 700; margin-bottom: 12px; }
          .footer-text { margin: 8px 0; font-size: 14px; color: #d1d5db; line-height: 1.6; }
          .footer-meta { margin-top: 18px; padding-top: 18px; border-top: 1px solid #374151; font-size: 12px; color: #9ca3af; }
          @media only screen and (max-width: 600px) {
            body { padding: 10px; }
            .content { padding: 25px 20px; }
            .header h1 { font-size: 26px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">✉️</div>
            <h1>Thank You!</h1>
            <div class="header-subtitle">We've Received Your Message</div>
            <div class="header-badge">Response Within 24 Hours</div>
          </div>
          <div class="content">
            <h2>Hi ${name}! 👋</h2>
            <p>Thank you for reaching out to us! We've successfully received your message and truly appreciate you taking the time to get in touch.</p>
            
            <div class="info-box">
              <p><strong>📬 What happens next?</strong></p>
              <p style="margin-top: 12px;">Our team will carefully review your message and get back to you within 24 hours. We typically respond even faster during business hours (Monday-Friday, 9 AM - 6 PM EST)!</p>
            </div>
            
            <p><strong>📝 Your Message:</strong></p>
            <div class="message-recap">
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="margin-top: 12px;"><strong>Message:</strong></p>
              <p style="margin-top: 8px;">${message}</p>
            </div>
            
            <div class="features">
              <h3>💡 While You Wait</h3>
              <ul>
                <li><strong>Explore the App:</strong> Try creating your first expense group and experience seamless bill splitting</li>
                <li><strong>Check our FAQ:</strong> Find quick answers to common questions on our website</li>
                <li><strong>Follow Updates:</strong> Stay connected with us on GitHub for the latest features</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://ease-split.vercel.app" class="button" style="color: white !important; text-decoration: none;">🚀 Start Using EaseSplit</a>
            </div>

            <div style="background: #f0fdf4; border-radius: 10px; padding: 20px; margin-top: 28px; border-left: 4px solid #10b981;">
              <p style="color: #065f46; margin: 0; font-size: 14px; line-height: 1.7;">
                💚 <strong>Need Immediate Help?</strong> Check out our comprehensive FAQ section or explore our documentation for instant answers.
              </p>
            </div>
          </div>
          <div class="footer">
            <div class="footer-brand">💰 EaseSplit</div>
            <p class="footer-text">Split expenses with ease • Stay organized • Keep friendships strong</p>
            <div class="footer-meta">
              <p style="margin: 4px 0;">Message received on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p style="margin: 12px 0 8px;"><a href="https://ease-split.vercel.app" style="color: #10b981; text-decoration: none; font-weight: 600;">Visit EaseSplit</a> • <a href="https://github.com/FarhanAlam-Official" style="color: #10b981; text-decoration: none; font-weight: 600;">GitHub</a> • <a href="https://ease-split.vercel.app/contact" style="color: #10b981; text-decoration: none; font-weight: 600;">Contact</a></p>
              <p style="margin: 8px 0 4px; font-size: 11px;">Made with ❤️ by <a href="https://github.com/FarhanAlam-Official" style="color: #10b981; text-decoration: none; font-weight: 600;">Farhan Alam</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email to admin
    await transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      subject: `[EaseSplit Contact] ${subject}`,
      html: adminHtml,
      replyTo: email,
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: "Thank you for contacting EaseSplit",
      html: userHtml,
    })

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes("Invalid login") || error.message.includes("authentication")) {
        return NextResponse.json(
          { error: "Email service authentication failed. Please contact the administrator." },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later or contact us directly." },
      { status: 500 }
    )
  }
}
