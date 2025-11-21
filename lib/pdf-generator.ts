"use client"

import type { Group } from "./types"
import { calculateMemberBalances, simplifyDebts } from "./calculations"
import { getCurrencySymbol } from "./utils"

export async function generatePDF(group: Group): Promise<Blob> {
  const { jsPDF } = await import("jspdf")

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const currencySymbol = getCurrencySymbol(group.currency)
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let y = 25

  // Brand Colors
  const primaryGreen = [16, 185, 129] // emerald-500
  const darkGreen = [5, 150, 105] // emerald-600
  const lightGreen = [236, 253, 245] // emerald-50
  const gray = [107, 114, 128] // gray-500
  const darkGray = [31, 41, 55] // gray-800
  const lightGray = [243, 244, 246] // gray-100
  const red = [239, 68, 68] // red-500
  const blue = [59, 130, 246] // blue-500

  // Helper function to draw a card/box
  const drawCard = (x: number, yPos: number, width: number, height: number, fillColor: number[]) => {
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
    doc.roundedRect(x, yPos, width, height, 3, 3, "F")
    // Add subtle shadow effect with border
    doc.setDrawColor(229, 231, 235) // gray-200
    doc.setLineWidth(0.5)
    doc.roundedRect(x, yPos, width, height, 3, 3, "S")
  }

  // Helper function for section headers with background
  const drawSectionHeader = (title: string, yPos: number) => {
    const headerHeight = 10
    doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
    doc.roundedRect(margin, yPos - 6, contentWidth, headerHeight, 2, 2, "F")
    
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text(title, margin + 5, yPos)
    
    return yPos + headerHeight
  }

  // ===== HEADER SECTION =====
  // Top banner with gradient effect (simulated)
  doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2])
  doc.rect(0, 0, pageWidth, 45, "F")
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
  doc.rect(0, 0, pageWidth, 40, "F")

  // Logo/Title
  doc.setFontSize(28)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.text("EaseSplit", pageWidth / 2, 18, { align: "center" })
  
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text("Expense Report", pageWidth / 2, 26, { align: "center" })

  // Decorative line
  doc.setDrawColor(255, 255, 255)
  doc.setLineWidth(0.5)
  doc.line(margin, 32, pageWidth - margin, 32)

  y = 50

  // ===== GROUP INFO CARD =====
  drawCard(margin, y, contentWidth, 25, [255, 255, 255])
  
  y += 8
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.text(group.name, pageWidth / 2, y, { align: "center" })
  
  y += 8
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(gray[0], gray[1], gray[2])
  doc.text(`Currency: ${group.currency} | Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth / 2, y, {
    align: "center",
  })
  
  y += 6
  if (group.createdBy) {
    doc.setFontSize(8)
    doc.text(`Created by: ${group.createdBy}`, pageWidth / 2, y, { align: "center" })
  }
  
  y += 18

  // ===== SUMMARY STATISTICS CARDS =====
  const totalSpent = group.expenses.reduce((sum, e) => sum + e.amount, 0)
  const avgExpense = group.expenses.length > 0 ? totalSpent / group.expenses.length : 0
  const cardWidth = (contentWidth - 10) / 3
  const cardHeight = 24

  // Total Spent Card
  drawCard(margin, y, cardWidth, cardHeight, lightGreen)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2])
  doc.text("TOTAL SPENT", margin + cardWidth / 2, y + 9, { align: "center" })
  doc.setFontSize(15)
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
  doc.text(`${currencySymbol}${totalSpent.toFixed(2)}`, margin + cardWidth / 2, y + 17, { align: "center" })

  // Members Card
  drawCard(margin + cardWidth + 5, y, cardWidth, cardHeight, lightGray)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(gray[0], gray[1], gray[2])
  doc.text("MEMBERS", margin + cardWidth + 5 + cardWidth / 2, y + 9, { align: "center" })
  doc.setFontSize(15)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.text(`${group.members.length}`, margin + cardWidth + 5 + cardWidth / 2, y + 17, { align: "center" })

  // Expenses Card
  drawCard(margin + (cardWidth + 5) * 2, y, cardWidth, cardHeight, lightGray)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(gray[0], gray[1], gray[2])
  doc.text("EXPENSES", margin + (cardWidth + 5) * 2 + cardWidth / 2, y + 9, { align: "center" })
  doc.setFontSize(15)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.text(`${group.expenses.length}`, margin + (cardWidth + 5) * 2 + cardWidth / 2, y + 17, { align: "center" })

  y += cardHeight + 18

  y += cardHeight + 15

  // ===== MEMBER BALANCES SECTION =====
  y = drawSectionHeader("Member Balances", y)
  y += 6

  const balances = calculateMemberBalances(group)
  
  // Modern table header with dark background and proper column widths
  const colMember = margin + 3
  const colPaid = margin + 55
  const colOwes = margin + 100
  const colBalance = margin + 145
  
  doc.setFillColor(darkGray[0], darkGray[1], darkGray[2])
  doc.rect(margin, y, contentWidth, 10, "F")
  
  doc.setFontSize(8.5)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.text("Member Name", colMember, y + 6.5)
  doc.text("Total Paid", colPaid, y + 6.5)
  doc.text("Total Owes", colOwes, y + 6.5)
  doc.text("Net Balance", colBalance, y + 6.5)
  
  // Vertical separators in header
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(colPaid - 2, y + 1, colPaid - 2, y + 9)
  doc.line(colOwes - 2, y + 1, colOwes - 2, y + 9)
  doc.line(colBalance - 2, y + 1, colBalance - 2, y + 9)
  
  y += 10

  balances.forEach((balance, index) => {
    // Alternating row colors
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252)
      doc.rect(margin, y - 5.5, contentWidth, 9, "F")
    }

    // Horizontal row separator
    doc.setDrawColor(229, 231, 235)
    doc.setLineWidth(0.2)
    doc.line(margin, y + 3.5, pageWidth - margin, y + 3.5)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    
    // Member name with truncation
    const memberName = balance.memberName.length > 18 ? balance.memberName.substring(0, 18) + "..." : balance.memberName
    doc.text(memberName, colMember, y)
    
    // Paid amount
    doc.text(`${currencySymbol}${balance.totalPaid.toFixed(2)}`, colPaid, y)
    
    // Owes amount
    doc.text(`${currencySymbol}${balance.totalOwed.toFixed(2)}`, colOwes, y)
    
    // Net balance with color coding
    const netColor = balance.netBalance > 0 ? primaryGreen : balance.netBalance < 0 ? red : gray
    doc.setFont("helvetica", "bold")
    doc.setTextColor(netColor[0], netColor[1], netColor[2])
    
    const balanceText = `${balance.netBalance > 0 ? "+" : ""}${currencySymbol}${balance.netBalance.toFixed(2)}`
    doc.text(balanceText, colBalance, y)
    
    y += 9
  })
  
  // Bottom border for table
  doc.setDrawColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setLineWidth(0.5)
  doc.line(margin, y - 5.5, pageWidth - margin, y - 5.5)
  
  y += 12

  // ===== SETTLEMENT PLAN SECTION =====
  const settlements = simplifyDebts(balances)
  if (settlements.length > 0) {
    y = drawSectionHeader("Settlement Plan", y)
    y += 10

    settlements.forEach((t, index) => {
      if (y > pageHeight - 40) {
        doc.addPage()
        y = 25
      }

      const fromName = group.members.find((m) => m.id === t.from)?.name || "Unknown"
      const toName = group.members.find((m) => m.id === t.to)?.name || "Unknown"
      
      // Settlement card with better spacing
      drawCard(margin + 5, y - 5, contentWidth - 10, 15, [255, 255, 255])
      
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.text(`${index + 1}.`, margin + 8, y + 2)
      
      doc.setFont("helvetica", "bold")
      doc.text(fromName, margin + 14, y + 2)
      
      doc.setFont("helvetica", "normal")
      doc.setTextColor(gray[0], gray[1], gray[2])
      const fromNameWidth = doc.getTextWidth(fromName)
      doc.text("pays", margin + 16 + fromNameWidth, y + 2)
      
      doc.setFont("helvetica", "bold")
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      const paysWidth = doc.getTextWidth("pays")
      doc.text(toName, margin + 18 + fromNameWidth + paysWidth, y + 2)
      
      // Amount badge on the right
      doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
      const amountText = `${currencySymbol}${t.amount.toFixed(2)}`
      const amountWidth = doc.getTextWidth(amountText) + 6
      doc.roundedRect(pageWidth - margin - amountWidth - 10, y - 2, amountWidth + 4, 8, 1.5, 1.5, "F")
      
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9.5)
      doc.setTextColor(255, 255, 255)
      doc.text(amountText, pageWidth - margin - amountWidth - 8, y + 2)
      
      y += 17
    })
    
    y += 8
  }

  // ===== EXPENSE DETAILS SECTION =====
  if (y > pageHeight - 50) {
    doc.addPage()
    y = 25
  }

  y = drawSectionHeader("Expense Details", y)
  y += 10

  if (group.expenses.length === 0) {
    doc.setFontSize(10)
    doc.setFont("helvetica", "italic")
    doc.setTextColor(gray[0], gray[1], gray[2])
    doc.text("No expenses recorded yet.", margin + 5, y)
    y += 10
  } else {
    group.expenses.forEach((expense, index) => {
      if (y > pageHeight - 40) {
        doc.addPage()
        y = 30
      }

      const payer = group.members.find((m) => m.id === expense.payerId)?.name || "Unknown"
      
      // Expense card with clean design
      drawCard(margin, y - 5, contentWidth, 22, [255, 255, 255])
      
      // Title and amount on first line
      doc.setFontSize(10.5)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      
      const expenseTitle = expense.title.length > 45 ? expense.title.substring(0, 45) + "..." : expense.title
      doc.text(expenseTitle, margin + 4, y + 1)
      
      // Amount badge
      doc.setFillColor(lightGreen[0], lightGreen[1], lightGreen[2])
      const expenseAmount = `${currencySymbol}${expense.amount.toFixed(2)}`
      const expenseAmountWidth = doc.getTextWidth(expenseAmount) + 6
      doc.roundedRect(pageWidth - margin - expenseAmountWidth - 8, y - 3.5, expenseAmountWidth + 4, 8, 1.5, 1.5, "F")
      
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2])
      doc.text(expenseAmount, pageWidth - margin - expenseAmountWidth - 6, y + 1)
      
      y += 7
      
      // Details line with clear separators
      doc.setFontSize(8.5)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(gray[0], gray[1], gray[2])
      
      doc.text(`Paid by: `, margin + 4, y)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.text(payer, margin + 18, y)
      
      doc.setFont("helvetica", "normal")
      doc.setTextColor(gray[0], gray[1], gray[2])
      doc.text(`Date: ${expense.date}`, margin + 70, y)
      
      y += 5.5
      
      doc.text(`Category: ${expense.category}`, margin + 4, y)
      doc.text(`Split: ${expense.splitType}`, margin + 70, y)
      
      y += 4
      
      // Description if exists
      if (expense.description) {
        doc.setFontSize(8)
        doc.setFont("helvetica", "italic")
        const descText = expense.description.length > 85 ? expense.description.substring(0, 85) + "..." : expense.description
        doc.text(descText, margin + 4, y)
        y += 4
      }
      
      y += 8
    })
  }

  y += 8

  y += 5

  // ===== FOOTER ON EVERY PAGE =====
  const pageCount = doc.internal.pages.length - 1
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    
    // Footer separator line
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
    doc.setLineWidth(0.5)
    doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20)
    
    // Footer content
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(gray[0], gray[1], gray[2])
    
    // Left: Brand tagline
    doc.text("EaseSplit - Split expenses, not friendships", margin, pageHeight - 13)
    
    // Center: Website
    doc.setFont("helvetica", "italic")
    doc.text("ease-split.vercel.app", pageWidth / 2, pageHeight - 13, { align: "center" })
    
    // Right: Page number
    doc.setFont("helvetica", "normal")
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 13, { align: "right" })
    
    // Bottom: Made with love
    doc.setFontSize(7.5)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(gray[0], gray[1], gray[2])
    doc.text("Made with love by Farhan Alam", pageWidth / 2, pageHeight - 8, { align: "center" })
  }

  return doc.output("blob")
}

export async function downloadPDF(group: Group) {
  const blob = await generatePDF(group)
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${group.name.replace(/\s+/g, "-")}-report.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
