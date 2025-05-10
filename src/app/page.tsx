"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Copy, CheckCircle } from "lucide-react"

export default function Home() {
  const [topic, setTopic] = useState("")
  const [technical, setTechnical] = useState(false)
  const [challenging, setChallenging] = useState(false)
  const [detailed, setDetailed] = useState(false)
  const [budget, setBudget] = useState(false)
  const [script, setScript] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateScript = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!topic.trim()) {
      toast.error("Please enter a meeting topic")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:8000/generate-script", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          technical,
          challenging,
          detailed,
          budget,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate script")
      }

      const data = await response.json()
      setScript(data.script)
    } catch (error) {
      toast.error("Failed to generate script. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script)
    setCopied(true)
    toast.success("Script copied to clipboard")

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">FluentDev Meeting Script Generator</h1>
          <p className="text-muted-foreground">Generate professional meeting scripts for client interactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Parameters</CardTitle>
              <CardDescription>Enter your meeting topic and select options to customize the script</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={generateScript} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Meeting Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Website redesign project, Mobile app development"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Script Options</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="technical"
                        checked={technical}
                        onCheckedChange={(checked) => setTechnical(checked === true)}
                      />
                      <Label htmlFor="technical" className="cursor-pointer">
                        Technical Client
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="challenging"
                        checked={challenging}
                        onCheckedChange={(checked) => setChallenging(checked === true)}
                      />
                      <Label htmlFor="challenging" className="cursor-pointer">
                        Challenging Client
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="detailed"
                        checked={detailed}
                        onCheckedChange={(checked) => setDetailed(checked === true)}
                      />
                      <Label htmlFor="detailed" className="cursor-pointer">
                        Detailed Explanations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="budget"
                        checked={budget}
                        onCheckedChange={(checked) => setBudget(checked === true)}
                      />
                      <Label htmlFor="budget" className="cursor-pointer">
                        Include Budget Discussion
                      </Label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Script"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Script</CardTitle>
              <CardDescription>Your meeting script will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Your generated script will appear here..."
                  value={script}
                  readOnly
                />
                {script && (
                  <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={copyToClipboard}>
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              {script ? "Script generated using Gemini 2.0" : ""}
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
