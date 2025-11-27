"use client"

import type { Group } from "./types"
import { calculateMemberBalances, simplifyDebts } from "./calculations"
import { getCurrencySymbol } from "./utils"

export async function generatePDF(group: Group): Promise<Blob> {
  const { jsPDF } = await import("jspdf")
  const { default: autoTable } = await import("jspdf-autotable")

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const currencySymbol = getCurrencySymbol(group.currency)
  const margin = 15
  const contentWidth = pageWidth - (margin * 2)
  const footerHeight = 15
  let y = 20

  // Brand Colors
  const primaryGreen = [16, 185, 129] // emerald-500
  const darkGreen = [5, 150, 105] // emerald-600
  const lightGreen = [236, 253, 245] // emerald-50
  const gray = [107, 114, 128] // gray-500
  const darkGray = [31, 41, 55] // gray-800
  const lightGray = [243, 244, 246] // gray-100
  const red = [239, 68, 68] // red-500
  const blue = [59, 130, 246] // blue-500

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - footerHeight - 10) {
      doc.addPage()
      y = 20
      return true
    }
    return false
  }

  // Helper function for section headers
  const drawSectionHeader = (title: string, yPos: number) => {
    doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
    doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, "F")
    
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text(title, margin + 4, yPos + 5.5)
    
    return yPos + 8
  }

  // ===== COMPACT HEADER SECTION =====
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
  doc.rect(0, 0, pageWidth, 35, "F")

  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.text("EaseSplit", pageWidth / 2, 15, { align: "center" })
  
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Expense Report", pageWidth / 2, 23, { align: "center" })

  y = 42

  // ===== COMPACT GROUP INFO =====
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.text(group.name, pageWidth / 2, y, { align: "center" })
  
  y += 6
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(gray[0], gray[1], gray[2])
  doc.text(`${group.currency} | ${new Date().toLocaleDateString()}${group.createdBy ? ` | By: ${group.createdBy}` : ''}`, pageWidth / 2, y, {
    align: "center",
  })
  
  y += 10

  // ===== COMPACT SUMMARY STATISTICS =====
  const totalSpent = group.expenses.reduce((sum, e) => sum + e.amount, 0)
  const cardWidth = (contentWidth - 8) / 3
  const cardHeight = 18

  // Stats cards
  const drawStatCard = (x: number, label: string, value: string, bgColor: number[], textColor: number[]) => {
    doc.setFillColor(bgColor[0], bgColor[1], bgColor[2])
    doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, "F")
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(0.3)
    doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, "S")
    
    doc.setFontSize(7.5)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(gray[0], gray[1], gray[2])
    doc.text(label, x + cardWidth / 2, y + 6, { align: "center" })
    
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
    doc.text(value, x + cardWidth / 2, y + 14, { align: "center" })
  }

  drawStatCard(margin, "TOTAL SPENT", `${currencySymbol}${totalSpent.toFixed(2)}`, lightGreen, primaryGreen)
  drawStatCard(margin + cardWidth + 4, "MEMBERS", `${group.members.length}`, lightGray, darkGray)
  drawStatCard(margin + (cardWidth + 4) * 2, "EXPENSES", `${group.expenses.length}`, lightGray, darkGray)

  y += cardHeight + 12

  // ===== MEMBER BALANCES SECTION =====
  checkPageBreak(40) // Ensure minimum space for table
  y = drawSectionHeader("Member Balances", y)
  y += 3

  const balances = calculateMemberBalances(group)
  
  const tableData = balances.map((balance) => [
    balance.memberName,
    `${currencySymbol}${balance.totalPaid.toFixed(2)}`,
    `${currencySymbol}${balance.totalOwed.toFixed(2)}`,
    `${balance.netBalance > 0 ? "+" : ""}${currencySymbol}${balance.netBalance.toFixed(2)}`
  ])

  autoTable(doc, {
    startY: y,
    head: [["Member Name", "Total Paid", "Total Owes", "Net Balance"]],
    body: tableData,
    margin: { left: margin, right: margin },
    theme: "striped",
    headStyles: {
      fillColor: [darkGray[0], darkGray[1], darkGray[2]],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
      halign: "left",
      cellPadding: 3,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [darkGray[0], darkGray[1], darkGray[2]],
      cellPadding: 2.5,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 50, halign: "left" },
      1: { cellWidth: 40, halign: "right" },
      2: { cellWidth: 40, halign: "right" },
      3: { cellWidth: 40, halign: "right", fontStyle: "bold" },
    },
    didParseCell: function (data) {
      if (data.column.index === 3 && data.section === "body") {
        const rowIndex = data.row.index
        const balance = balances[rowIndex]
        if (balance) {
          const netColor = balance.netBalance > 0 ? primaryGreen : balance.netBalance < 0 ? red : gray
          data.cell.styles.textColor = netColor
        }
      }
    },
  })

  // @ts-ignore
  y = doc.lastAutoTable.finalY + 10

  // ===== SETTLEMENT PLAN SECTION =====
  const settlements = simplifyDebts(balances)
  if (settlements.length > 0) {
    checkPageBreak(30 + settlements.length * 12) // Ensure settlements fit on one page
    y = drawSectionHeader("Settlement Plan", y)
    y += 6

    settlements.forEach((t, index) => {
      const fromName = group.members.find((m) => m.id === t.from)?.name || "Unknown"
      const toName = group.members.find((m) => m.id === t.to)?.name || "Unknown"
      
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(margin, y, contentWidth, 10, 1.5, 1.5, "F")
      doc.setDrawColor(230, 230, 230)
      doc.setLineWidth(0.3)
      doc.roundedRect(margin, y, contentWidth, 10, 1.5, 1.5, "S")
      
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      
      const text = `${index + 1}. ${fromName} pays ${toName}`
      doc.text(text, margin + 3, y + 6.5)
      
      // Amount badge
      doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
      const amountText = `${currencySymbol}${t.amount.toFixed(2)}`
      const amountWidth = doc.getTextWidth(amountText)
      doc.roundedRect(pageWidth - margin - amountWidth - 8, y + 2, amountWidth + 6, 6, 1, 1, "F")
      
      doc.setFont("helvetica", "bold")
      doc.setFontSize(8.5)
      doc.setTextColor(255, 255, 255)
      doc.text(amountText, pageWidth - margin - amountWidth - 5, y + 6.5)
      
      y += 12
    })
    
    y += 5
  }

  // ===== EXPENSE DETAILS SECTION =====
  checkPageBreak(30)
  y = drawSectionHeader("Expense Details", y)
  y += 6

  if (group.expenses.length === 0) {
    doc.setFontSize(9)
    doc.setFont("helvetica", "italic")
    doc.setTextColor(gray[0], gray[1], gray[2])
    doc.text("No expenses recorded yet.", margin + 3, y)
  } else {
    // Use autoTable for expenses
    const expenseTableData = group.expenses.map((expense) => {
      const payer = group.members.find((m) => m.id === expense.payerId)?.name || "Unknown"
      return [
        expense.title,
        payer,
        expense.date,
        expense.category,
        `${currencySymbol}${expense.amount.toFixed(2)}`
      ]
    })

    autoTable(doc, {
      startY: y,
      head: [["Description", "Paid By", "Date", "Category", "Amount"]],
      body: expenseTableData,
      margin: { left: margin, right: margin },
      theme: "striped",
      headStyles: {
        fillColor: [darkGray[0], darkGray[1], darkGray[2]],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
        halign: "left",
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [darkGray[0], darkGray[1], darkGray[2]],
        cellPadding: 2.5,
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 50, halign: "left" },      // Description
        1: { cellWidth: 35, halign: "left" },      // Paid By
        2: { cellWidth: 25, halign: "center", fontSize: 7.5 },    // Date
        3: { cellWidth: 28, halign: "left", fontSize: 7.5 },      // Category
        4: { cellWidth: 32, halign: "right", fontStyle: "bold" }, // Amount
      },
    })

    // @ts-ignore
    y = doc.lastAutoTable.finalY
  }

  // ===== FOOTER ON EVERY PAGE =====
  const pageCount = doc.internal.pages.length - 1
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    
    const footerY = pageHeight - 12
    
    // Footer separator line
    doc.setDrawColor(230, 230, 230)
    doc.setLineWidth(0.3)
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3)
    
    // Footer content
    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(gray[0], gray[1], gray[2])
    
    doc.text("EaseSplit - Split expenses, not friendships", margin, footerY)
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, footerY, { align: "right" })
    
    doc.setFontSize(6.5)
    doc.text("ease-split.vercel.app", pageWidth / 2, footerY + 4, { align: "center" })
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
