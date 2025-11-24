// API route for sending group summary emails
// This endpoint generates and sends comprehensive group financial summaries including:
// - Overall group statistics
// - Member balance details
// - Simplified debt settlement recommendations

import { NextResponse } from "next/server"
// Next.js server utility for handling HTTP responses

import nodemailer from "nodemailer"
// Library for sending emails via SMTP

import type { Group, SMTPConfig } from "@/lib/types"
// Type definitions for group data and SMTP configuration

import { calculateMemberBalances, simplifyDebts } from "@/lib/calculations"
// Utility functions for calculating member balances and simplifying debt settlements

/**
 * POST handler for sending group summary emails
 * @param request - Request object containing SMTP config, recipient, subject, and group data
 * @returns NextResponse with success status or error message
 */
export async function POST(request: Request) {
  try {
    // Extract data from request body with type casting
    const { smtp, to, subject, groupData } = (await request.json()) as {
      smtp: SMTPConfig | null
      to: string
      subject: string
      groupData: Group
    }

    // Use default SMTP if smtp is null, otherwise use provided config
    const smtpConfig = smtp || {
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

    // Calculate member balances and simplified debt settlements
    const balances = calculateMemberBalances(groupData)
    const settlements = simplifyDebts(balances)
    const totalSpent = groupData.expenses.reduce((sum, e) => sum + e.amount, 0)

    // Generate HTML table rows for member balances
    const balanceRows = balances
      .map(
        (b) =>
          `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${b.memberName}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">$${b.totalPaid.toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">$${b.totalOwed.toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: ${b.netBalance > 0 ? "#16a34a" : b.netBalance < 0 ? "#dc2626" : "#666"};">
              ${b.netBalance > 0 ? "+" : ""}$${b.netBalance.toFixed(2)}
            </td>
          </tr>`,
      )
      .join("")

    // Generate HTML list items for settlement recommendations
    const settlementList =
      settlements.length > 0
        ? settlements
            .map((t) => {
              const fromName = groupData.members.find((m) => m.id === t.from)?.name || "Unknown"
              const toName = groupData.members.find((m) => m.id === t.to)?.name || "Unknown"
              return `<li style="margin: 8px 0;">${fromName} pays ${toName}: <strong>$${t.amount.toFixed(2)}</strong></li>`
            })
            .join("")
        : "<li>All settled up!</li>"

    // Create HTML email template with group summary and settlement information
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
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
          .summary-card { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 28px; margin-bottom: 28px; border: 2px solid #bae6fd; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .summary-card h2 { margin: 0 0 20px; font-size: 22px; color: #0c4a6e; font-weight: 700; display: flex; align-items: center; gap: 8px; }
          .summary-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 18px; }
          .stat-box { background: white; padding: 18px; border-radius: 10px; text-align: center; border: 2px solid #e0f2fe; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .stat-icon { font-size: 28px; margin-bottom: 8px; }
          .stat-label { font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
          .stat-value { font-size: 26px; font-weight: 800; color: #0284c7; line-height: 1; }
          .section { margin: 32px 0; }
          .section-title { font-size: 22px; font-weight: 700; color: #1f2937; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 3px solid #10b981; display: flex; align-items: center; gap: 8px; }
          .balance-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #f9fafb; border-radius: 12px; overflow: hidden; border: 2px solid #e5e7eb; }
          .balance-table thead { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; }
          .balance-table th { padding: 16px; text-align: left; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .balance-table tbody tr { background: white; transition: all 0.2s; }
          .balance-table tbody tr:hover { background: #f0fdf4; transform: scale(1.01); }
          .balance-table td { padding: 16px; border-bottom: 1px solid #e5e7eb; font-size: 15px; font-weight: 500; }
          .balance-table tbody tr:last-child td { border-bottom: none; }
          .balance-positive { color: #059669; font-weight: 800; }
          .balance-negative { color: #dc2626; font-weight: 800; }
          .balance-zero { color: #64748b; font-weight: 800; }
          .settlement-box { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 28px; border: 2px solid #10b981; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .settlement-box h3 { margin: 0 0 20px; font-size: 20px; color: #065f46; font-weight: 700; display: flex; align-items: center; gap: 8px; }
          .settlement-list { list-style: none; padding: 0; margin: 0; }
          .settlement-item { background: white; padding: 18px; margin-bottom: 12px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; border: 2px solid #d1fae5; box-shadow: 0 2px 4px rgba(0,0,0,0.04); transition: all 0.2s; }
          .settlement-item:hover { transform: translateX(4px); box-shadow: 0 4px 8px rgba(0,0,0,0.08); }
          .settlement-item:last-child { margin-bottom: 0; }
          .settlement-text { font-size: 15px; color: #1f2937; font-weight: 600; flex: 1; }
          .settlement-amount { font-size: 20px; font-weight: 800; color: #059669; background: #ecfdf5; padding: 8px 16px; border-radius: 8px; }
          .settlement-arrow { color: #10b981; font-size: 20px; margin: 0 12px; }
          .settled-message { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 10px; text-align: center; font-size: 16px; color: #78350f; font-weight: 600; border: 2px solid #fbbf24; }
          .footer { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 30px; text-align: center; }
          .footer-brand { color: #10b981; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
          .footer-text { margin: 8px 0; font-size: 14px; color: #d1d5db; }
          .footer-meta { margin-top: 16px; padding-top: 16px; border-top: 1px solid #374151; font-size: 12px; color: #9ca3af; }
          @media only screen and (max-width: 600px) {
            body { padding: 10px; }
            .content { padding: 25px 20px; }
            .summary-stats { grid-template-columns: 1fr; }
            .balance-table { font-size: 13px; }
            .balance-table th, .balance-table td { padding: 12px 8px; }
            .settlement-item { flex-direction: column; gap: 12px; text-align: center; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">📊</div>
            <h1>EaseSplit Report</h1>
            <div class="header-subtitle">${groupData.name}</div>
            <div class="header-badge">Complete Financial Overview</div>
          </div>

          <div class="content">
            <div class="summary-card">
              <h2>📊 Group Financial Overview</h2>
              <p style="color: #475569; margin: 0 0 16px; line-height: 1.7;">This comprehensive report provides a complete breakdown of all expenses, member balances, and settlement recommendations for your group.</p>
              <div class="summary-stats">
                <div class="stat-box">
                  <div class="stat-icon">💰</div>
                  <div class="stat-label">Total Spent</div>
                  <div class="stat-value">${groupData.currency}${totalSpent.toFixed(2)}</div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon">👥</div>
                  <div class="stat-label">Members</div>
                  <div class="stat-value">${groupData.members.length}</div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon">🧾</div>
                  <div class="stat-label">Expenses</div>
                  <div class="stat-value">${groupData.expenses.length}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <h3 class="section-title">👥 Member Balances & Settlement Status</h3>
              <table class="balance-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Total Paid</th>
                    <th>Share Owed</th>
                    <th>Net Balance</th>
                  </tr>
                </thead>
                <tbody>
                  ${balanceRows}
                </tbody>
              </table>
            </div>

            <div class="settlement-box">
              <h3>🔄 Simplified Settlement Plan</h3>
              <p style="color: #065f46; margin: 0 0 20px; font-size: 14px; line-height: 1.7;">To settle all debts efficiently, follow these transactions. This is the minimum number of payments needed:</p>
              ${settlements.length > 0 ? `
                <ul class="settlement-list">
                  ${settlements.map((t) => {
                    const fromName = groupData.members.find((m) => m.id === t.from)?.name || "Unknown"
                    const toName = groupData.members.find((m) => m.id === t.to)?.name || "Unknown"
                    return `
                      <li class="settlement-item">
                        <span class="settlement-text">
                          <strong>${fromName}</strong> pays <strong>${toName}</strong>
                        </span>
                        <span class="settlement-amount">${groupData.currency}${t.amount.toFixed(2)}</span>
                      </li>
                    `
                  }).join('')}
                </ul>
              ` : `
                <div class="settled-message">
                  🎉 <strong>All Settled!</strong> Everyone is balanced. No payments needed!
                </div>
              `}
            </div>

            <div style="background: #f0fdf4; border-radius: 10px; padding: 20px; margin-top: 28px; border-left: 4px solid #10b981;">
              <p style="color: #065f46; margin: 0; font-size: 14px; line-height: 1.7;">
                💡 <strong>Pro Tip:</strong> Once payments are made, mark them as settled in the app to keep everyone's balance up to date.
              </p>
            </div>
          </div>

          <div class="footer">
            <div class="footer-brand">💰 EaseSplit</div>
            <p class="footer-text">Split expenses with ease • Stay organized • Keep friendships strong</p>
            <div class="footer-meta">
              <p style="margin: 4px 0;">Report generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p style="margin: 4px 0;">Currency: ${groupData.currency} | Group: ${groupData.name}</p>
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
      subject,
      html,
    })

    // Return successful response
    return NextResponse.json({ success: true })
  } catch (error) {
    // Log error and return failure response
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}