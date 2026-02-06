"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    ArrowRight,
    Sparkles,
    Building2,
    Users,
    Globe,
    Shield,
    Loader2,
    Check,
    Zap
} from "lucide-react"
import { createClient } from "@/app/actions/clients"

const industries = [
    { id: "saas", label: "SaaS / Software", icon: "💻" },
    { id: "fintech", label: "Fintech", icon: "💳" },
    { id: "iot", label: "IoT / Hardware", icon: "📡" },
    { id: "healthcare", label: "Healthcare", icon: "🏥" },
    { id: "energy", label: "Energy / Utilities", icon: "⚡" },
    { id: "retail", label: "Retail / E-commerce", icon: "🛒" },
    { id: "manufacturing", label: "Manufacturing", icon: "🏭" },
    { id: "other", label: "Other", icon: "🏢" },
]

const companySizes = [
    { id: "1-10", label: "1-10 employees" },
    { id: "11-50", label: "11-50 employees" },
    { id: "51-200", label: "51-200 employees" },
    { id: "201-500", label: "201-500 employees" },
    { id: "500+", label: "500+ employees" },
]

const integrationTypes = [
    { id: "api", label: "API Integration", description: "Connect via REST/GraphQL APIs" },
    { id: "sdk", label: "SDK / Library", description: "Use our client libraries" },
    { id: "webhook", label: "Webhooks", description: "Event-driven notifications" },
    { id: "manual", label: "Manual / Portal", description: "Use our web interface" },
]

const complianceNeeds = [
    { id: "soc2", label: "SOC 2" },
    { id: "gdpr", label: "GDPR" },
    { id: "hipaa", label: "HIPAA" },
    { id: "pci", label: "PCI DSS" },
    { id: "iso27001", label: "ISO 27001" },
    { id: "none", label: "None required" },
]

// AI-generated checklist based on intake
const generateChecklist = (formData: Record<string, string | string[]>) => {
    const tasks: Array<{ title: string; stage: string; priority: "high" | "medium" | "low" }> = []

    // Base tasks
    tasks.push({ title: "Welcome call / kickoff meeting", stage: "Kickoff", priority: "high" })
    tasks.push({ title: "Collect company information", stage: "Kickoff", priority: "high" })
    tasks.push({ title: "Assign dedicated onboarding manager", stage: "Kickoff", priority: "medium" })

    // Industry-specific tasks
    if (formData.industry === "fintech") {
        tasks.push({ title: "Complete KYC documentation", stage: "Compliance", priority: "high" })
        tasks.push({ title: "Submit proof of business license", stage: "Compliance", priority: "high" })
        tasks.push({ title: "AML policy review", stage: "Compliance", priority: "medium" })
    }

    if (formData.industry === "healthcare") {
        tasks.push({ title: "Sign BAA agreement", stage: "Compliance", priority: "high" })
        tasks.push({ title: "HIPAA compliance checklist", stage: "Compliance", priority: "high" })
        tasks.push({ title: "Data handling assessment", stage: "Compliance", priority: "medium" })
    }

    if (formData.industry === "iot") {
        tasks.push({ title: "Device provisioning setup", stage: "Technical Setup", priority: "high" })
        tasks.push({ title: "Firmware integration guide", stage: "Technical Setup", priority: "high" })
        tasks.push({ title: "Security certificate setup", stage: "Technical Setup", priority: "medium" })
    }

    // Compliance tasks
    if (Array.isArray(formData.compliance)) {
        if (formData.compliance.includes("soc2")) {
            tasks.push({ title: "Complete security questionnaire", stage: "Compliance", priority: "high" })
            tasks.push({ title: "Provide SOC 2 report", stage: "Compliance", priority: "medium" })
        }
        if (formData.compliance.includes("gdpr")) {
            tasks.push({ title: "Sign DPA agreement", stage: "Compliance", priority: "high" })
            tasks.push({ title: "Data processing inventory", stage: "Compliance", priority: "medium" })
        }
    }

    // Integration tasks
    if (formData.integration === "api") {
        tasks.push({ title: "Generate API credentials", stage: "Technical Setup", priority: "high" })
        tasks.push({ title: "Review API documentation", stage: "Technical Setup", priority: "medium" })
        tasks.push({ title: "Test API endpoints", stage: "Technical Setup", priority: "high" })
        tasks.push({ title: "Implement webhook handlers", stage: "Technical Setup", priority: "medium" })
    }

    if (formData.integration === "sdk") {
        tasks.push({ title: "Install SDK package", stage: "Technical Setup", priority: "high" })
        tasks.push({ title: "Configure environment", stage: "Technical Setup", priority: "high" })
        tasks.push({ title: "Complete SDK quickstart", stage: "Technical Setup", priority: "medium" })
    }

    // Company size tasks
    if (formData.size === "201-500" || formData.size === "500+") {
        tasks.push({ title: "Enterprise security review", stage: "Compliance", priority: "high" })
        tasks.push({ title: "SSO configuration", stage: "Technical Setup", priority: "medium" })
        tasks.push({ title: "User provisioning setup", stage: "Technical Setup", priority: "medium" })
    }

    // Standard closing tasks
    tasks.push({ title: "Upload business documents", stage: "Documentation", priority: "medium" })
    tasks.push({ title: "Sign service agreement", stage: "Documentation", priority: "high" })
    tasks.push({ title: "Complete training session", stage: "Training", priority: "medium" })
    tasks.push({ title: "Go-live checklist review", stage: "Go-Live", priority: "high" })
    tasks.push({ title: "Final approval sign-off", stage: "Go-Live", priority: "high" })

    return tasks
}

export default function NewClientPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedTasks, setGeneratedTasks] = useState<Array<{ title: string; stage: string; priority: "high" | "medium" | "low" }>>([])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        website: "",
        industry: "",
        size: "",
        integration: "",
        compliance: [] as string[],
    })

    const updateField = (field: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const toggleCompliance = (id: string) => {
        setFormData(prev => ({
            ...prev,
            compliance: prev.compliance.includes(id)
                ? prev.compliance.filter(c => c !== id)
                : [...prev.compliance, id]
        }))
    }

    const handleGenerateChecklist = async () => {
        setIsGenerating(true)
        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 2000))
        const tasks = generateChecklist(formData)
        setGeneratedTasks(tasks)
        setIsGenerating(false)
        setStep(4)
    }

    const handleCreateOnboarding = async () => {
        setIsGenerating(true)
        try {
            await createClient({
                name: formData.name,
                email: formData.email,
                website: formData.website,
                industry: formData.industry,
                companySize: formData.size,
            })
            router.push("/dashboard/clients")
        } catch (error) {
            console.error("Failed to create onboarding:", error)
            // In a real app, show a toast here
        } finally {
            setIsGenerating(false)
        }
    }

    const canProceed = () => {
        switch (step) {
            case 1:
                return formData.name && formData.email
            case 2:
                return formData.industry && formData.size
            case 3:
                return formData.integration
            default:
                return true
        }
    }

    const stages = [...new Set(generatedTasks.map(t => t.stage))]

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard/clients" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Clients
                </Link>
                <h1 className="text-3xl font-bold text-white">New Client Onboarding</h1>
                <p className="text-slate-400 mt-1">Add a new client and let AI generate a customized onboarding checklist</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${s < step ? "bg-emerald-500 text-white" :
                            s === step ? "bg-violet-500 text-white" :
                                "bg-slate-800 text-slate-500"
                            }`}>
                            {s < step ? <Check className="w-4 h-4" /> : s}
                        </div>
                        {s < 4 && (
                            <div className={`w-16 h-0.5 ${s < step ? "bg-emerald-500" : "bg-slate-800"}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Basic Info */}
            {step === 1 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle>Client Information</CardTitle>
                                <CardDescription>Enter the basic details about your new client</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
                            <Input
                                placeholder="e.g. Acme Corporation"
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Primary Contact Email *</label>
                            <Input
                                type="email"
                                placeholder="e.g. contact@acme.com"
                                value={formData.email}
                                onChange={(e) => updateField("email", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                            <Input
                                placeholder="e.g. https://acme.com"
                                value={formData.website}
                                onChange={(e) => updateField("website", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 2: Company Profile */}
            {step === 2 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle>Company Profile</CardTitle>
                                <CardDescription>Help us understand your client better for AI recommendations</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Industry *</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {industries.map((industry) => (
                                    <button
                                        key={industry.id}
                                        onClick={() => updateField("industry", industry.id)}
                                        className={`p-4 rounded-xl border text-left transition-all ${formData.industry === industry.id
                                            ? "border-violet-500 bg-violet-500/10"
                                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                                            }`}
                                    >
                                        <span className="text-2xl mb-2 block">{industry.icon}</span>
                                        <span className="text-sm text-slate-300">{industry.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Company Size *</label>
                            <div className="flex flex-wrap gap-2">
                                {companySizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => updateField("size", size.id)}
                                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${formData.size === size.id
                                            ? "border-violet-500 bg-violet-500/10 text-white"
                                            : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                                            }`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 3: Technical & Compliance */}
            {step === 3 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle>Integration & Compliance</CardTitle>
                                <CardDescription>Technical setup and compliance requirements</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Integration Type *</label>
                            <div className="grid md:grid-cols-2 gap-3">
                                {integrationTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => updateField("integration", type.id)}
                                        className={`p-4 rounded-xl border text-left transition-all ${formData.integration === type.id
                                            ? "border-violet-500 bg-violet-500/10"
                                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                                            }`}
                                    >
                                        <span className="font-medium text-white block mb-1">{type.label}</span>
                                        <span className="text-sm text-slate-500">{type.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                <Shield className="w-4 h-4 inline mr-2" />
                                Compliance Requirements
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {complianceNeeds.map((comp) => (
                                    <button
                                        key={comp.id}
                                        onClick={() => toggleCompliance(comp.id)}
                                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${formData.compliance.includes(comp.id)
                                            ? "border-violet-500 bg-violet-500/10 text-white"
                                            : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                                            }`}
                                    >
                                        {formData.compliance.includes(comp.id) && <Check className="w-3 h-3 inline mr-1" />}
                                        {comp.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 4: AI Generated Checklist */}
            {step === 4 && (
                <div className="space-y-6">
                    <Card className="border-violet-500/30">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle>AI-Generated Onboarding Checklist</CardTitle>
                                    <CardDescription>
                                        Based on {formData.name}'s profile: {industries.find(i => i.id === formData.industry)?.label}, {formData.size}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {stages.map((stage) => (
                                    <div key={stage}>
                                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-3">{stage}</h4>
                                        <div className="space-y-2">
                                            {generatedTasks.filter(t => t.stage === stage).map((task, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${task.priority === "high" ? "bg-red-500" :
                                                        task.priority === "medium" ? "bg-amber-500" : "bg-slate-500"
                                                        }`} />
                                                    <span className="text-slate-300 flex-1">{task.title}</span>
                                                    <Badge variant={
                                                        task.priority === "high" ? "danger" :
                                                            task.priority === "medium" ? "warning" : "secondary"
                                                    }>
                                                        {task.priority}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-violet-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-violet-300 font-medium">AI Recommendation</p>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Based on the client profile, we've generated {generatedTasks.length} tasks across {stages.length} stages.
                                            The estimated onboarding time is 2-3 weeks for a {formData.size} {industries.find(i => i.id === formData.industry)?.label} company.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
                <Button
                    variant="outline"
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    disabled={step === 1}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>

                {step < 3 ? (
                    <Button
                        onClick={() => setStep(s => s + 1)}
                        disabled={!canProceed()}
                    >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                ) : step === 3 ? (
                    <Button
                        onClick={handleGenerateChecklist}
                        disabled={!canProceed() || isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Generate Checklist with AI
                            </>
                        )}
                    </Button>
                ) : (
                    <Button onClick={handleCreateOnboarding} variant="success">
                        <Check className="w-4 h-4" />
                        Create Onboarding
                    </Button>
                )}
            </div>
        </div>
    )
}
