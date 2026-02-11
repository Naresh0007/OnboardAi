"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar } from "@/components/ui/avatar"
import {
    Plus,
    Users,
    CheckCircle2,
    Clock,
    AlertTriangle,
    ArrowUpRight,
    MoreHorizontal,
    TrendingUp,
    ArrowRight
} from "lucide-react"

// Data fetching handled in component


const getStatusBadge = (status: string) => {
    switch (status) {
        case "IN_PROGRESS":
            return <Badge variant="default">In Progress</Badge>
        case "BLOCKED":
            return <Badge variant="danger">Blocked</Badge>
        case "COMPLETED":
            return <Badge variant="success">Completed</Badge>
        case "NOT_STARTED":
            return <Badge variant="secondary">Not Started</Badge>
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

const getRiskBadge = (level: string) => {
    switch (level) {
        case "LOW":
            return <Badge variant="success">Low Risk</Badge>
        case "MEDIUM":
            return <Badge variant="warning">Medium Risk</Badge>
        case "HIGH":
            return <Badge variant="danger">High Risk</Badge>
        case "CRITICAL":
            return <Badge variant="danger">Critical</Badge>
        default:
            return null
    }
}

const getProgressVariant = (progress: number, riskLevel: string): "default" | "success" | "warning" | "danger" => {
    if (riskLevel === "HIGH" || riskLevel === "CRITICAL") return "danger"
    if (riskLevel === "MEDIUM") return "warning"
    if (progress >= 80) return "success"
    return "default"
}

import { getDashboardStats, getRecentOnboardings, type DashboardStats, type RecentOnboarding } from "@/app/actions/dashboard"
import { useEffect, useState } from "react"

export default function DashboardPage() {
    const [statsData, setStatsData] = useState<DashboardStats | null>(null)
    const [recentOnboardingsData, setRecentOnboardingsData] = useState<RecentOnboarding[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stats, recent] = await Promise.all([
                    getDashboardStats(),
                    getRecentOnboardings()
                ])
                setStatsData(stats)
                setRecentOnboardingsData(recent)
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const stats = [
        {
            title: "Active Onboardings",
            value: statsData?.activeOnboardings.value || "0",
            change: statsData?.activeOnboardings.change || "0%",
            trend: statsData?.activeOnboardings.trend || "neutral",
            icon: Users,
            color: "from-violet-500 to-indigo-500"
        },
        {
            title: "Completed This Month",
            value: statsData?.completedThisMonth.value || "0",
            change: statsData?.completedThisMonth.change || "0%",
            trend: statsData?.completedThisMonth.trend || "neutral",
            icon: CheckCircle2,
            color: "from-emerald-500 to-teal-500"
        },
        {
            title: "Avg. Time to Complete",
            value: statsData?.avgTimeToComplete.value || "0",
            change: statsData?.avgTimeToComplete.change || "0%",
            trend: statsData?.avgTimeToComplete.trend || "neutral",
            icon: Clock,
            color: "from-amber-500 to-orange-500"
        },
        {
            title: "At Risk",
            value: statsData?.atRisk.value || "0",
            change: statsData?.atRisk.change || "0",
            trend: statsData?.atRisk.trend || "neutral",
            icon: AlertTriangle,
            color: "from-red-500 to-rose-500"
        },
    ]



    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-slate-400 mt-1">Welcome back! Here's what's happening with your onboardings.</p>
                </div>
                <Link href="/dashboard/clients/new">
                    <Button>
                        <Plus className="w-4 h-4" />
                        New Onboarding
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="relative overflow-hidden group">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <TrendingUp className={`w-4 h-4 ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'} ${stat.trend === 'down' && stat.title === 'At Risk' ? 'text-emerald-400' : ''}`} />
                                        <span className={`text-sm ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'} ${stat.trend === 'down' && stat.title === 'At Risk' ? 'text-emerald-400' : ''}`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-sm text-slate-500">vs last month</span>
                                    </div>
                                </div>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                        {/* Decorative gradient */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-50`} />
                    </Card>
                ))}
            </div>

            {/* Recent Onboardings */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Active Onboardings</CardTitle>
                    <Link href="/dashboard/clients">
                        <Button variant="ghost" size="sm">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-8 text-slate-500">Loading recent activity...</div>
                        ) : recentOnboardingsData.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">No recent onboardings found.</div>
                        ) : (
                            recentOnboardingsData.map((onboarding) => (
                                <div
                                    key={onboarding.id}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                >
                                    <Avatar
                                        fallback={onboarding.client}
                                        size="lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-white truncate">{onboarding.client}</h3>
                                            {getStatusBadge(onboarding.status)}
                                            {getRiskBadge(onboarding.riskLevel)}
                                        </div>
                                        <p className="text-sm text-slate-400 mb-2">{onboarding.email}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 max-w-xs">
                                                <Progress
                                                    value={onboarding.progress}
                                                    variant={getProgressVariant(onboarding.progress, onboarding.riskLevel)}
                                                    size="sm"
                                                />
                                            </div>
                                            <span className="text-sm text-slate-500">{onboarding.progress}%</span>
                                            <span className="text-sm text-slate-500">•</span>
                                            <span className="text-sm text-slate-500">{onboarding.stage}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-400">
                                            {onboarding.daysRemaining} days remaining
                                        </p>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions & AI Suggestions */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        <Link href="/dashboard/clients/new">
                            <div className="p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                <Plus className="w-8 h-8 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h4 className="font-medium text-white mb-1">Start New Onboarding</h4>
                                <p className="text-xs text-slate-500">Add a new client to onboard</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/templates">
                            <div className="p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                <ArrowUpRight className="w-8 h-8 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                                <h4 className="font-medium text-white mb-1">Create Template</h4>
                                <p className="text-xs text-slate-500">Build reusable workflows</p>
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                {/* AI Suggestions */}
                <Card className="border-violet-500/30">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-lg">✨</span>
                            </div>
                            <CardTitle>AI Suggestions</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                            <p className="text-sm text-slate-300 mb-2">
                                <strong className="text-violet-400">HealthTech Solutions</strong> has stalled on document upload. Consider sending a reminder.
                            </p>
                            <Button size="sm" variant="outline">Send Reminder</Button>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <p className="text-sm text-slate-300  mb-2">
                                <strong className="text-amber-400">FinanceFlow Ltd</strong> may need compliance documentation. Similar fintech clients required KYC step.
                            </p>
                            <Button size="sm" variant="outline">Add KYC Task</Button>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <p className="text-sm text-slate-300 mb-2">
                                <strong className="text-emerald-400">IoT Dynamics</strong> is 85% complete. Schedule final go-live call?
                            </p>
                            <Button size="sm" variant="outline">Schedule Call</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}