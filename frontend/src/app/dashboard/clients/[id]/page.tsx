"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Calendar,
    Mail,
    Globe,
    Building2,
    Clock,
    CheckCircle2,
    Circle,
    AlertCircle,
    FileText,
    Upload,
    MessageSquare,
    MoreHorizontal,
    Send,
    Sparkles
} from "lucide-react"

// Mock client data
const client = {
    id: "1",
    name: "TechCorp Industries",
    email: "contact@techcorp.io",
    website: "https://techcorp.io",
    industry: "Technology",
    size: "51-200 employees",
    status: "IN_PROGRESS",
    progress: 65,
    riskLevel: "LOW",
    riskScore: 25,
    startDate: "2026-01-05",
    targetDate: "2026-01-20",
    stages: [
        {
            id: "1",
            name: "Kickoff",
            status: "COMPLETED",
            tasks: [
                { id: "1", title: "Welcome call scheduled", status: "COMPLETED", assignee: "Sarah" },
                { id: "2", title: "Collect company information", status: "COMPLETED", assignee: "Sarah" },
                { id: "3", title: "Assign onboarding manager", status: "COMPLETED", assignee: "Mike" },
            ]
        },
        {
            id: "2",
            name: "Documentation",
            status: "COMPLETED",
            tasks: [
                { id: "4", title: "Upload business license", status: "COMPLETED", assignee: null, type: "document" },
                { id: "5", title: "Sign service agreement", status: "COMPLETED", assignee: null, type: "esign" },
            ]
        },
        {
            id: "3",
            name: "Technical Setup",
            status: "ACTIVE",
            tasks: [
                { id: "6", title: "Generate API credentials", status: "COMPLETED", assignee: "Mike" },
                { id: "7", title: "Configure webhook endpoints", status: "IN_PROGRESS", assignee: "Mike" },
                { id: "8", title: "Test API integration", status: "PENDING", assignee: "Mike" },
                { id: "9", title: "Review sandbox environment", status: "PENDING", assignee: null },
            ]
        },
        {
            id: "4",
            name: "Training",
            status: "PENDING",
            tasks: [
                { id: "10", title: "Schedule training session", status: "PENDING", assignee: "Sarah" },
                { id: "11", title: "Complete product walkthrough", status: "PENDING", assignee: null },
            ]
        },
        {
            id: "5",
            name: "Go-Live",
            status: "PENDING",
            tasks: [
                { id: "12", title: "Final review checklist", status: "PENDING", assignee: "Sarah" },
                { id: "13", title: "Go-live approval", status: "PENDING", assignee: "Mike" },
            ]
        },
    ],
    activity: [
        { id: "1", action: "Task completed", detail: "API credentials generated", time: "2 hours ago", user: "Mike" },
        { id: "2", action: "Document uploaded", detail: "Business license.pdf", time: "1 day ago", user: "Client" },
        { id: "3", action: "Agreement signed", detail: "Service agreement via DocuSign", time: "2 days ago", user: "Client" },
        { id: "4", action: "Onboarding started", detail: "Welcome email sent", time: "10 days ago", user: "Sarah" },
    ]
}

const getTaskIcon = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        case "IN_PROGRESS":
            return <Clock className="w-5 h-5 text-violet-500 animate-pulse" />
        case "PENDING":
            return <Circle className="w-5 h-5 text-slate-600" />
        default:
            return <Circle className="w-5 h-5 text-slate-600" />
    }
}

const getStageStatusClass = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "stage-completed"
        case "ACTIVE":
            return "stage-active"
        default:
            return "stage-pending"
    }
}

export default function ClientDetailPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "documents" | "activity">("overview")

    const completedTasks = client.stages.flatMap(s => s.tasks).filter(t => t.status === "COMPLETED").length
    const totalTasks = client.stages.flatMap(s => s.tasks).length

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard/clients" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Clients
                </Link>

                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar fallback={client.name} size="xl" />
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-white">{client.name}</h1>
                                <Badge variant="default">In Progress</Badge>
                                <Badge variant="success">Low Risk</Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    {client.email}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Globe className="w-4 h-4" />
                                    {client.website}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Building2 className="w-4 h-4" />
                                    {client.industry}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Mail className="w-4 h-4" />
                            Contact
                        </Button>
                        <Button>
                            <Send className="w-4 h-4" />
                            Send Reminder
                        </Button>
                    </div>
                </div>
            </div>

            {/* Progress Overview */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-white">Onboarding Progress</h3>
                            <p className="text-sm text-slate-400">{completedTasks} of {totalTasks} tasks completed</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold gradient-text">{client.progress}%</p>
                            <p className="text-sm text-slate-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Due {new Date(client.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <Progress value={client.progress} size="lg" />

                    {/* Stage indicators */}
                    <div className="flex justify-between mt-4">
                        {client.stages.map((stage, i) => (
                            <div key={stage.id} className="flex flex-col items-center">
                                <div className={`w-4 h-4 rounded-full mb-1 ${stage.status === "COMPLETED" ? "bg-emerald-500" :
                                        stage.status === "ACTIVE" ? "bg-violet-500 animate-pulse" :
                                            "bg-slate-700"
                                    }`} />
                                <span className={`text-xs ${stage.status === "COMPLETED" ? "text-emerald-400" :
                                        stage.status === "ACTIVE" ? "text-violet-400" :
                                            "text-slate-600"
                                    }`}>
                                    {stage.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Tasks by Stage */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold text-white">Tasks by Stage</h2>

                    {client.stages.map((stage) => (
                        <Card key={stage.id} className={`${getStageStatusClass(stage.status)} overflow-hidden`}>
                            <CardHeader className="py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${stage.status === "COMPLETED" ? "bg-emerald-500" :
                                                stage.status === "ACTIVE" ? "bg-violet-500 animate-pulse" :
                                                    "bg-slate-700"
                                            }`} />
                                        <CardTitle className="text-base">{stage.name}</CardTitle>
                                        <Badge variant={
                                            stage.status === "COMPLETED" ? "success" :
                                                stage.status === "ACTIVE" ? "default" : "secondary"
                                        }>
                                            {stage.status === "COMPLETED" ? "Completed" :
                                                stage.status === "ACTIVE" ? "Active" : "Pending"}
                                        </Badge>
                                    </div>
                                    <span className="text-sm text-slate-500">
                                        {stage.tasks.filter(t => t.status === "COMPLETED").length}/{stage.tasks.length}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="py-0 pb-4">
                                <div className="space-y-2">
                                    {stage.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                        >
                                            {getTaskIcon(task.status)}
                                            <span className={`flex-1 ${task.status === "COMPLETED" ? "text-slate-500 line-through" : "text-slate-300"}`}>
                                                {task.title}
                                            </span>
                                            {task.assignee && (
                                                <Avatar fallback={task.assignee} size="sm" />
                                            )}
                                            <button className="p-1 rounded hover:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-all">
                                                <MoreHorizontal className="w-4 h-4 text-slate-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* AI Insights */}
                    <Card className="border-violet-500/30">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-violet-400" />
                                <CardTitle className="text-base">AI Insights</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <p className="text-sm text-slate-300">
                                    <strong className="text-emerald-400">On Track:</strong> Client is progressing well. Expected completion in 5 days.
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                                <p className="text-sm text-slate-300">
                                    <strong className="text-violet-400">Suggestion:</strong> Schedule training session now to avoid delays.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Risk Score */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-4xl font-bold text-emerald-400">{client.riskScore}</span>
                                <Badge variant="success" className="text-lg px-4 py-1">Low Risk</Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Task completion</span>
                                    <span className="text-emerald-400">Good</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Response time</span>
                                    <span className="text-emerald-400">Fast</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Document uploads</span>
                                    <span className="text-emerald-400">Complete</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {client.activity.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2" />
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-300">{item.action}</p>
                                            <p className="text-xs text-slate-500">{item.detail}</p>
                                            <p className="text-xs text-slate-600 mt-1">{item.time} • {item.user}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
