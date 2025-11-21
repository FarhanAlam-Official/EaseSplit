"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { exportToJSON, exportGroupToCSV, importFromJSON } from "@/lib/storage"
import { Download, Upload, FileJson, FileSpreadsheet, Mail, CheckCircle, AlertCircle, FileCode, Loader2, Send, Server, Lock, User, AtSign } from "lucide-react"
import type { SMTPConfig } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { notifications } from "@/lib/notifications"

interface ExportImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportImportModal({ open, onOpenChange }: ExportImportModalProps) {
  const { data, activeGroup, setData, smtpConfig, setSMTPConfig } = useApp()
  const [importText, setImportText] = useState("")
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle")
  const [smtpMode, setSMTPMode] = useState<"default" | "custom">("default")
  const [smtpForm, setSMTPForm] = useState<SMTPConfig>({
    host: smtpConfig?.host || "",
    port: smtpConfig?.port || 587,
    secure: smtpConfig?.secure || false,
    user: smtpConfig?.user || "",
    password: smtpConfig?.password || "",
  })
  const [emailTo, setEmailTo] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExportJSON = () => {
    const json = exportToJSON(data)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `easesplit-backup-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    if (!activeGroup) return
    const csv = exportGroupToCSV(activeGroup)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeGroup.name.replace(/\s+/g, "-")}-expenses.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportJSON = () => {
    const imported = importFromJSON(importText)
    if (imported) {
      setData(imported)
      setImportStatus("success")
      const groupCount = imported.groups?.length || 0
      notifications.showSuccess({
        title: "Import Successful!",
        description: `Restored ${groupCount} group${groupCount !== 1 ? 's' : ''} from backup`,
      })
      setTimeout(() => {
        setImportStatus("idle")
        setImportText("")
      }, 2000)
    } else {
      setImportStatus("error")
      notifications.showError({
        title: "Import Failed",
        description: "Invalid JSON format. Please check your backup file.",
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setImportText(text)
    }
    reader.readAsText(file)
  }

  const handleSaveSMTP = () => {
    setSMTPConfig(smtpForm)
  }

  const handleSendEmail = async () => {
    if (!activeGroup || !emailTo) return

    setEmailStatus("sending")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtp: smtpMode === "custom" ? smtpConfig : null, // null means use default SMTP
          to: emailTo,
          subject: `EaseSplit Report: ${activeGroup.name}`,
          groupData: activeGroup,
        }),
      })

      if (response.ok) {
        setEmailStatus("success")
        notifications.showSuccess({
          title: "Report Sent! 📧",
          description: `Group report sent to ${emailTo}`,
        })
        setTimeout(() => setEmailStatus("idle"), 3000)
      } else {
        setEmailStatus("error")
        notifications.showError({
          title: "Email Failed",
          description: "Could not send report. Check your SMTP settings.",
        })
      }
    } catch {
      setEmailStatus("error")
      notifications.showError({
        title: "Email Failed",
        description: "Could not send report. Check your SMTP settings.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Export & Import</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50">
            <TabsTrigger value="export" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
            <TabsTrigger value="import" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-4 mt-6">
            <div className="space-y-3">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer" onClick={handleExportJSON}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <FileJson className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold">Export All Data (JSON)</CardTitle>
                      <CardDescription className="text-xs mt-1">Complete backup of all groups and expenses</CardDescription>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 group cursor-pointer" onClick={handleExportCSV}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 group-hover:from-emerald-500/30 group-hover:to-emerald-500/20 transition-all duration-300">
                      <FileSpreadsheet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold">Export Expenses (CSV)</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {activeGroup ? `${activeGroup.name} expenses for spreadsheet` : "Select a group first"}
                      </CardDescription>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
                  </div>
                </CardHeader>
              </Card>

              <div className="pt-4 px-4 py-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> Export JSON for complete backup and recovery. Use CSV for analyzing expenses in spreadsheet applications.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4 mt-6">
            <div className="space-y-4">
              <Card className="border-2 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Upload JSON File
                  </CardTitle>
                  <CardDescription>Import from a previously exported backup file</CardDescription>
                </CardHeader>
                <CardContent>
                  <input type="file" ref={fileInputRef} accept=".json" onChange={handleFileUpload} className="hidden" />
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-2 border-dashed hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">Choose JSON File</span>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Paste JSON Data
                  </CardTitle>
                  <CardDescription>Or manually paste your backup data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder='{"groups": [...], "meta": {...}}'
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={8}
                    className="font-mono text-xs bg-muted/50 border-2 focus:border-purple-500/50"
                  />

                  {importStatus === "success" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Import successful! Your data has been restored.</span>
                    </div>
                  )}
                  {importStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Invalid JSON format. Please check your data.</span>
                    </div>
                  )}

                  <Button 
                    className="w-full h-11 gap-2 bg-purple-600 hover:bg-purple-700 text-white" 
                    onClick={handleImportJSON} 
                    disabled={!importText.trim()}
                  >
                    <Upload className="h-4 w-4" />
                    Import Data
                  </Button>
                </CardContent>
              </Card>

              <div className="px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  <strong className="font-semibold">⚠️ Warning:</strong> Importing will replace all existing data. Make sure to export your current data first!
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 mt-6">
            <div className="space-y-4">
              {/* SMTP Mode Selection */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Choose Email Service
                  </CardTitle>
                  <CardDescription>Select how you want to send expense reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={smtpMode === "default" ? "default" : "outline"}
                      className="h-auto py-4 flex-col gap-2 relative overflow-hidden group"
                      onClick={() => setSMTPMode("default")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Server className="h-6 w-6 relative z-10" />
                      <div className="text-center relative z-10">
                        <p className="font-semibold text-sm">Default Service</p>
                        <p className="text-xs opacity-80 mt-1">Use our SMTP server</p>
                      </div>
                      {smtpMode === "default" && (
                        <CheckCircle className="h-4 w-4 absolute top-2 right-2 text-primary-foreground" />
                      )}
                    </Button>

                    <Button
                      variant={smtpMode === "custom" ? "default" : "outline"}
                      className="h-auto py-4 flex-col gap-2 relative overflow-hidden group"
                      onClick={() => setSMTPMode("custom")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Lock className="h-6 w-6 relative z-10" />
                      <div className="text-center relative z-10">
                        <p className="font-semibold text-sm">Custom SMTP</p>
                        <p className="text-xs opacity-80 mt-1">Your own server</p>
                      </div>
                      {smtpMode === "custom" && (
                        <CheckCircle className="h-4 w-4 absolute top-2 right-2 text-primary-foreground" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Custom SMTP Configuration */}
              {smtpMode === "custom" && (
                <Card className="border-2 border-teal-500/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Server className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      Custom SMTP Configuration
                    </CardTitle>
                    <CardDescription>Configure your own email server settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Server className="h-3.5 w-3.5" />
                          SMTP Host
                        </Label>
                        <Input
                          placeholder="smtp.gmail.com"
                          value={smtpForm.host}
                          onChange={(e) => setSMTPForm({ ...smtpForm, host: e.target.value })}
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Lock className="h-3.5 w-3.5" />
                          Port
                        </Label>
                        <Input
                          type="number"
                          placeholder="587"
                          value={smtpForm.port}
                          onChange={(e) => setSMTPForm({ ...smtpForm, port: Number.parseInt(e.target.value) })}
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        Username (Email)
                      </Label>
                      <Input
                        placeholder="your@email.com"
                        value={smtpForm.user}
                        onChange={(e) => setSMTPForm({ ...smtpForm, user: e.target.value })}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        Password / App Password
                      </Label>
                      <Input
                        type="password"
                        placeholder="••••••••••••••••"
                        value={smtpForm.password}
                        onChange={(e) => setSMTPForm({ ...smtpForm, password: e.target.value })}
                        className="h-10"
                      />
                    </div>

                    <div className="px-3 py-2 rounded-lg bg-muted/50 border border-border">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Privacy:</strong> SMTP credentials are stored in memory only and never sent to our servers.
                      </p>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full h-10 border-2 hover:bg-teal-500/10 hover:border-teal-500/50" 
                      onClick={handleSaveSMTP}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Save SMTP Configuration
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Default SMTP Info */}
              {smtpMode === "default" && (
                <Card className="border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/20">
                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-emerald-900 dark:text-emerald-100">Default SMTP Service Active</p>
                        <p className="text-xs text-emerald-800 dark:text-emerald-200 mt-1">
                          You're using our secure email service. No configuration needed - just enter the recipient's email and send!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Send Email Section */}
              {(smtpMode === "default" || smtpConfig) && (
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Send className="h-5 w-5 text-primary" />
                      Send Email Report
                    </CardTitle>
                    <CardDescription>Email expense report to any recipient</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <AtSign className="h-3.5 w-3.5" />
                        Recipient Email
                      </Label>
                      <Input
                        placeholder="recipient@email.com"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                        className="h-10"
                      />
                    </div>

                    {emailStatus === "success" && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm font-medium">Email sent successfully!</span>
                      </div>
                    )}
                    {emailStatus === "error" && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm font-medium">Failed to send email. {smtpMode === "custom" ? "Check your SMTP settings." : "Please try again."}</span>
                      </div>
                    )}

                    <Button
                      className="w-full h-11 gap-2"
                      onClick={handleSendEmail}
                      disabled={!emailTo || !activeGroup || emailStatus === "sending"}
                    >
                      {emailStatus === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending Email...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" />
                          Send Report Email
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
