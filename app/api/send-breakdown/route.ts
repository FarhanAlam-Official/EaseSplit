// API route for sending detailed expense breakdown emails to group members
// This endpoint generates and sends personalized HTML emails containing:
// - Group financial summary
// - Individual member balances
// - Detailed expense breakdowns
// - Settlement status for all members

import { NextRequest, NextResponse } from "next/server"
// Next.js server utilities for handling HTTP requests and responses

import nodemailer from "nodemailer"
// Library for sending emails via SMTP

/**
 * POST handler for sending expense breakdown emails
 * @param request - NextRequest object containing member data and group information
 * @returns NextResponse with success status or error message
 */
export async function POST(request: NextRequest) {
  try {
    // Extract data from request body
    const { memberEmail, memberName, groupName, currency, balances, expenses, totalExpenses, averageExpense, createdBy, createdByEmail } = await request.json()

    // Configure SMTP settings using environment variables with fallbacks
    // Use environment variables for SMTP configuration
    const smtpConfig = {
      host: process.env.SMTP_HOST || "",
      port: Number(process.env.SMTP_PORT) || 587,
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

    // Find member's balance
    const memberBalance = balances.find((b: any) => b.memberName === memberName)

    // Create HTML email with breakdown
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%); margin: 0; padding: 20px; }
    .container { max-width: 680px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .header { background: linear-gradient(135deg, #09bc8a 0%, #078a68 100%); color: white; padding: 40px 30px; text-align: center; position: relative; overflow: hidden; }
    .header::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1; }
    .header p { margin: 12px 0 0; font-size: 16px; opacity: 0.95; font-weight: 500; position: relative; z-index: 1; }
    .header-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 13px; margin-top: 12px; font-weight: 600; backdrop-filter: blur(10px); }
    .content { padding: 35px 30px; }
    .greeting { font-size: 20px; margin-bottom: 24px; color: #1f2937; font-weight: 600; }
    .intro-text { color: #4b5563; font-size: 15px; margin-bottom: 28px; line-height: 1.7; }
    .summary-box { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left: 5px solid #10b981; padding: 25px; border-radius: 12px; margin: 28px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .summary-box h2 { margin: 0 0 20px; font-size: 22px; color: #065f46; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 18px; }
    .stat-item { background: white; padding: 18px; border-radius: 10px; border: 2px solid #d1fae5; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: transform 0.2s; }
    .stat-item:hover { transform: translateY(-2px); }
    .stat-icon { font-size: 24px; margin-bottom: 8px; }
    .stat-label { font-size: 13px; color: #6b7280; margin-bottom: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-value { font-size: 26px; font-weight: 800; color: #059669; line-height: 1; }
    .balance-box { background: ${memberBalance && memberBalance.netBalance > 0.01 ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' : memberBalance && memberBalance.netBalance < -0.01 ? 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}; padding: 28px; border-radius: 12px; margin: 28px 0; border: 3px solid ${memberBalance && memberBalance.netBalance > 0.01 ? '#10b981' : memberBalance && memberBalance.netBalance < -0.01 ? '#ef4444' : '#94a3b8'}; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
    .balance-box h3 { margin: 0 0 12px; font-size: 18px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .balance-amount { font-size: 42px; font-weight: 900; color: ${memberBalance && memberBalance.netBalance > 0.01 ? '#059669' : memberBalance && memberBalance.netBalance < -0.01 ? '#dc2626' : '#64748b'}; line-height: 1; margin: 12px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .balance-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 20px; }
    .balance-detail { text-align: center; background: rgba(255,255,255,0.7); padding: 14px; border-radius: 8px; }
    .balance-detail-label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .balance-detail-value { font-size: 22px; font-weight: 800; color: #1f2937; margin-top: 6px; }
    .balance-status { margin-top: 16px; padding: 14px; background: rgba(255,255,255,0.7); border-radius: 8px; font-size: 14px; color: #374151; text-align: center; font-weight: 600; }
    .expenses-section { margin: 32px 0; }
    .expenses-section h3 { font-size: 22px; margin-bottom: 20px; color: #1f2937; border-bottom: 3px solid #10b981; padding-bottom: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .expense-card { background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); transition: all 0.2s; }
    .expense-card:hover { box-shadow: 0 8px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
    .expense-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 14px; }
    .expense-number { display: inline-block; background: #10b981; color: white; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
    .expense-title { font-size: 18px; font-weight: 700; color: #1f2937; margin: 0; }
    .expense-amount { font-size: 24px; font-weight: 800; color: #059669; background: #ecfdf5; padding: 8px 14px; border-radius: 8px; }
    .expense-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 13px; color: #6b7280; margin-bottom: 14px; }
    .expense-meta-item { display: flex; align-items: center; gap: 6px; background: #f3f4f6; padding: 6px 12px; border-radius: 6px; font-weight: 500; }
    .members-list { background: #fafafa; border-radius: 8px; padding: 14px; border: 1px solid #e5e7eb; }
    .members-list-header { font-size: 13px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
    .member-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .member-row:last-child { border-bottom: none; }
    .member-name { font-size: 15px; color: #1f2937; font-weight: 600; }
    .member-share { font-size: 16px; font-weight: 800; color: #059669; }
    .expense-notes { margin-top: 12px; padding: 12px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 6px; font-size: 14px; color: #78350f; font-style: italic; }
    .all-balances { margin-top: 32px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; border: 2px solid #bae6fd; }
    .all-balances h2 { margin: 0 0 20px; font-size: 22px; color: #0c4a6e; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .balance-card { padding: 16px; margin: 10px 0; background: white; border-radius: 10px; border: 2px solid #e0f2fe; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
    .balance-card-header { display: flex; justify-content: space-between; align-items: center; }
    .balance-member-name { font-size: 17px; font-weight: 700; color: #1f2937; }
    .balance-member-details { font-size: 13px; color: #6b7280; margin-top: 6px; font-weight: 500; }
    .balance-member-amount { font-size: 22px; font-weight: 800; }
    .footer { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 30px; text-align: center; }
    .footer p { margin: 8px 0; font-size: 14px; color: #d1d5db; }
    .footer .brand { color: #10b981; font-weight: 700; font-size: 18px; }
    .footer-links { margin-top: 16px; }
    .footer-links a { color: #10b981; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 600; }
    @media only screen and (max-width: 600px) {
      body { padding: 10px; }
      .content { padding: 25px 20px; }
      .stat-grid { grid-template-columns: 1fr; }
      .balance-details { grid-template-columns: 1fr; }
      .expense-header { flex-direction: column; }
      .expense-amount { margin-top: 10px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💰 EaseSplit Expense Breakdown</h1>
      <p>${groupName}</p>
      <div class="header-badge">Comprehensive Financial Report</div>
      ${createdBy ? `<p style="font-size: 13px; opacity: 0.9; margin-top: 10px; position: relative; z-index: 1;">👤 Group created by <strong>${createdBy}</strong></p>` : ''}
    </div>
    
    <div class="content">
      <div class="greeting">
        Hi <strong>${memberName}</strong>! 👋
      </div>
      
      <p class="intro-text">Here's a detailed breakdown of all expenses in your group. This report includes comprehensive information about group spending, your personal balance, individual expense details, and settlement status for all members.</p>
      
      <div class="summary-box">
        <h2>📊 Group Financial Summary</h2>
        <div class="stat-grid">
          <div class="stat-item">
            <div class="stat-icon">🧾</div>
            <div class="stat-label">Total Expenses</div>
            <div class="stat-value">${expenses.length}</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">💳</div>
            <div class="stat-label">Total Spent</div>
            <div class="stat-value">${currency}${totalExpenses.toFixed(2)}</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📈</div>
            <div class="stat-label">Average Expense</div>
            <div class="stat-value">${currency}${averageExpense.toFixed(2)}</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">👥</div>
            <div class="stat-label">Active Members</div>
            <div class="stat-value">${balances.length}</div>
          </div>
        </div>
      </div>

      ${memberBalance ? `
      <div class="balance-box">
        <h3>💵 Your Personal Balance</h3>
        <div class="balance-amount">
          ${memberBalance.netBalance > 0 ? '+' : ''}${currency}${Math.abs(memberBalance.netBalance).toFixed(2)}
        </div>
        <div class="balance-details">
          <div class="balance-detail">
            <div class="balance-detail-label">💸 You Paid</div>
            <div class="balance-detail-value">${currency}${memberBalance.totalPaid.toFixed(2)}</div>
          </div>
          <div class="balance-detail">
            <div class="balance-detail-label">📊 Your Share</div>
            <div class="balance-detail-value">${currency}${memberBalance.totalOwed.toFixed(2)}</div>
          </div>
        </div>
        <div class="balance-status">
          ${memberBalance.netBalance > 0.01 
            ? '✅ <strong>Great!</strong> You are owed this amount. Others need to settle up with you.' 
            : memberBalance.netBalance < -0.01 
            ? '⚠️ <strong>Action Required:</strong> You need to pay this amount to settle your share.' 
            : '🎉 <strong>Perfect!</strong> You are completely settled up! No payments needed.'}
        </div>
      </div>
      ` : ''}

      <div class="expenses-section">
        <h3>📝 Detailed Expense Breakdown</h3>
        ${expenses.map((expense: any, index: number) => `
          <div class="expense-card">
            <span class="expense-number">#${index + 1}</span>
            <div class="expense-header">
              <div>
                <p class="expense-title">${expense.title}</p>
                <div class="expense-meta">
                  <span class="expense-meta-item">👤 ${expense.payerName}</span>
                  ${expense.category ? `<span class="expense-meta-item">🏷️ ${expense.category}</span>` : ''}
                  ${expense.date ? `<span class="expense-meta-item">📅 ${new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>` : ''}
                </div>
              </div>
              <div class="expense-amount">${currency}${expense.amount.toFixed(2)}</div>
            </div>
            <div class="members-list">
              <div class="members-list-header">Split Among (${expense.shares.length} ${expense.shares.length === 1 ? 'Member' : 'Members'})</div>
              ${expense.shares.map((share: any) => `
                <div class="member-row">
                  <span class="member-name">${share.memberName} ${share.memberId === expense.payerId ? '💳 (Paid)' : ''}</span>
                  <span class="member-share">${currency}${share.amount.toFixed(2)}</span>
                </div>
              `).join('')}
            </div>
            ${expense.notes ? `<div class="expense-notes">💡 Note: "${expense.notes}"</div>` : ''}
          </div>
        `).join('')}
      </div>

      <div class="all-balances">
        <h2>👥 All Member Balances & Settlement Status</h2>
        ${balances.map((balance: any) => `
          <div class="balance-card">
            <div class="balance-card-header">
              <div>
                <div class="balance-member-name">
                  ${balance.memberName} ${balance.memberName === memberName ? '(You)' : ''}
                </div>
                <div class="balance-member-details">
                  💳 Paid: <strong>${currency}${balance.totalPaid.toFixed(2)}</strong> • 
                  📊 Share: <strong>${currency}${balance.totalOwed.toFixed(2)}</strong> • 
                  ${balance.netBalance > 0.01 ? '✅ Should Receive' : balance.netBalance < -0.01 ? '⚠️ Should Pay' : '🎉 Settled'}
                </div>
              </div>
              <div class="balance-member-amount" style="color: ${balance.netBalance > 0.01 ? '#059669' : balance.netBalance < -0.01 ? '#dc2626' : '#64748b'};">
                ${balance.netBalance > 0 ? '+' : ''}${currency}${Math.abs(balance.netBalance).toFixed(2)}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="footer">
      <p class="brand">💰 EaseSplit</p>
      <p>Split expenses with ease • Stay organized • Keep friendships strong</p>
      <p style="font-size: 12px; color: #9ca3af; margin-top: 12px;">Report generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      <p style="font-size: 12px; color: #9ca3af; margin-top: 4px;">Currency: ${currency} | Group: ${groupName}</p>
      <div class="footer-links" style="margin-top: 16px;">
        <a href="https://ease-split.vercel.app" style="color: #10b981; text-decoration: none; font-weight: 600;">Visit EaseSplit</a> • 
        <a href="https://github.com/FarhanAlam-Official" style="color: #10b981; text-decoration: none; font-weight: 600;">GitHub</a> • 
        <a href="https://ease-split.vercel.app/contact" style="color: #10b981; text-decoration: none; font-weight: 600;">Contact</a>
      </div>
      <p style="font-size: 11px; color: #9ca3af; margin-top: 16px;">Made with ❤️ by <a href="https://github.com/FarhanAlam-Official" style="color: #10b981; text-decoration: none; font-weight: 600;">Farhan Alam</a></p>
    </div>
  </div>
</body>
</html>
    `

    // Send email using configured transporter
    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpConfig.user,
      to: memberEmail,
      subject: `💰 EaseSplit - Expense Breakdown for ${groupName}`,
      html: htmlContent,
    })

    // Return successful response
    return NextResponse.json({ success: true })
  } catch (error) {
    // Log error and return failure response
    console.error("Error sending breakdown email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}