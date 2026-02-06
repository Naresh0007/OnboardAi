"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Plus,
    MoreHorizontal,
    FileStack,
    Users,
    Clock,
    Copy,
    Edit,
    Trash2,
    Sparkles
} from "lucide-react"

// Mock templates data
const templates = [
    {
        id: "1",
        name: "Standard SaaS Onboarding",
        description: "Complete workflow for B2B SaaS customer onboarding",
        industry: null,
        stagesCount: 5,
        tasksCount: 15,
        usageCount: 24,
        avgDays: 7,
        isDefault: true,
        stages: ["Kickoff", "Documentation", "Technical Setup", "Training", "Go-Live"]
    },
    {
        id: "2",
        name: "Fintech Client Setup",
        description: "Compliance-focused onboarding for financial services",
        industry: "Fintech",
        stagesCount: 6,
        tasksCount: 22,
        usageCount: 12,
        avgDays: 14,
        isDefault: false,
        stages: ["Kickoff", "KYC Verification", "Compliance Review", "Technical Setup", "Training", "Go-Live"]
    },
    {
        id: "3",
        name: "IoT Device Integration",
        description: "Hardware and firmware integration workflow",
        industry: "IoT",
        stagesCount: 5,
        tasksCount: 18,
        usageCount: 8,
        avgDays: 10,
        isDefault: false,
        stages: ["Kickoff", "Device Provisioning", "Firmware Setup", "Testing", "Deployment"]
    },
    {
        id: "4",
        name: "Healthcare Provider",
        description: "HIPAA-compliant onboarding for healthcare clients",
        industry: "Healthcare",
        stagesCount: 6,
        tasksCount: 25,
        usageCount: 5,
        avgDays: 21,
        isDefault: false,
        stages: ["Kickoff", "BAA Agreement", "Compliance Audit", "Technical Setup", "Training", "Go-Live"]
    },
    {
        id: "5",
        name: "Enterprise Integration",
        description: "Extended workflow for large enterprise customers",
        industry: null,
        stagesCount: 7,
        tasksCount: 30,
        usageCount: 3,
        avgDays: 30,
        isDefault: false,
        stages: ["Discovery", "Planning", "Security Review", "Technical Setup", "Integration", "Training", "Go-Live"]
    },
]

export default function TemplatesPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Templates</h1>
                    <p className="text-slate-400 mt-1">Create and manage reusable onboarding workflows</p>
                </div>
                <Button>
                    <Plus className="w-4 h-4" />
                    Create Template
                </Button>
            </div>

            {/* AI Template Suggestion */}
            <Card className="border-violet-500/30 bg-gradient-to-r from-violet-500/5 to-indigo-500/5">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-1">AI Template Generator</h3>
                            <p className="text-slate-400 mb-4">
                                Describe your ideal onboarding process and let AI create a complete template with stages, tasks, and automation rules.
                            </p>
                            <Button variant="outline">
                                <Sparkles className="w-4 h-4" />
                                Generate with AI
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <Card key={template.id} className="group hover:border-violet-500/50 transition-all duration-200">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CardTitle className="text-lg group-hover:text-violet-400 transition-colors">
                                            {template.name}
                                        </CardTitle>
                                        {template.isDefault && (
                                            <Badge variant="default">Default</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500">{template.description}</p>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-all">
                                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {template.industry && (
                                <Badge variant="outline" className="mb-3">{template.industry}</Badge>
                            )}

                            {/* Stages Preview */}
                            <div className="flex gap-1 mb-4 overflow-hidden">
                                {template.stages.map((stage, i) => (
                                    <div
                                        key={i}
                                        className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-30 first:opacity-100"
                                        style={{ opacity: Math.max(0.3, 1 - (i * 0.15)) }}
                                    />
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-slate-400">
                                        <FileStack className="w-3 h-3" />
                                        <span className="text-sm">{template.stagesCount}</span>
                                    </div>
                                    <p className="text-xs text-slate-600">Stages</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-slate-400">
                                        <Users className="w-3 h-3" />
                                        <span className="text-sm">{template.usageCount}</span>
                                    </div>
                                    <p className="text-xs text-slate-600">Uses</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-slate-400">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-sm">{template.avgDays}d</span>
                                    </div>
                                    <p className="text-xs text-slate-600">Avg Time</p>
                                </div>
                            </div>

                            {/* Stage Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {template.stages.slice(0, 4).map((stage, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-500">
                                        {stage}
                                    </span>
                                ))}
                                {template.stages.length > 4 && (
                                    <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-500">
                                        +{template.stages.length - 4} more
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Edit className="w-3 h-3" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Copy className="w-3 h-3" />
                                    Duplicate
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Trash2 className="w-3 h-3 text-slate-500" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Create New Template Card */}
                <Card className="border-dashed border-slate-700 hover:border-violet-500/50 transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 group-hover:bg-violet-500/20 flex items-center justify-center mb-4 transition-colors">
                            <Plus className="w-8 h-8 text-slate-600 group-hover:text-violet-400 transition-colors" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-400 group-hover:text-white transition-colors mb-2">
                            Create New Template
                        </h3>
                        <p className="text-sm text-slate-600">
                            Build a custom workflow from scratch
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
