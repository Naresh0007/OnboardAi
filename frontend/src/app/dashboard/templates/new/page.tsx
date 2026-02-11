"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Save, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"
import { generateTemplate, saveTemplate, type OnboardingTemplate } from "@/app/actions/templates"
import { Badge } from "@/components/ui/badge"

export default function NewTemplatePage() {
    const router = useRouter()
    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [generatedTemplate, setGeneratedTemplate] = useState<OnboardingTemplate | null>(null)

    const handleGenerate = async () => {
        if (!prompt.trim()) return
        setIsGenerating(true)
        try {
            const template = await generateTemplate(prompt)
            if (template) {
                setGeneratedTemplate(template)
            }
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSave = async () => {
        if (!generatedTemplate) return
        setIsSaving(true)
        try {
            const success = await saveTemplate(generatedTemplate)
            if (success) {
                router.push("/dashboard/templates")
            }
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-3xl font-bold text-white">Create New Template</h1>
            </div>

            {/* AI Prompt Section */}
            <Card className="border-violet-500/30 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-violet-400" />
                        <CardTitle>AI Generator</CardTitle>
                    </div>
                    <CardDescription>
                        Describe the onboarding process you want, and our AI will build the structure for you.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="e.g. Create a comprehensive onboarding checklist for a B2B SaaS Healthcare client needing HIPAA compliance, data migration, and team training..."
                        className="min-h-[120px] text-lg p-4 resize-none"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <Button 
                            size="lg" 
                            onClick={handleGenerate} 
                            disabled={!prompt.trim() || isGenerating}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Generate Template
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Preview Section */}
            {generatedTemplate && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">Template Preview</h2>
                        <Button onClick={handleSave} disabled={isSaving} variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Save Template
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>{generatedTemplate.name}</CardTitle>
                            <p className="text-slate-400">{generatedTemplate.description}</p>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="outline">{generatedTemplate.industryType}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {generatedTemplate.stages.map((stage, i) => (
                                    <div key={i} className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-white flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                                                    {i + 1}
                                                </div>
                                                {stage.name}
                                            </h3>
                                        </div>
                                        <div className="space-y-2 pl-8">
                                            {stage.tasks.map((task, j) => (
                                                <div key={j} className="flex items-center gap-3 text-sm text-slate-300 p-2 rounded hover:bg-slate-700/50">
                                                    <CheckCircle2 className="w-4 h-4 text-slate-500" />
                                                    <span>{task.title}</span>
                                                    {task.isRequired && (
                                                        <Badge variant="secondary" className="text-[10px] h-5">Required</Badge>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
