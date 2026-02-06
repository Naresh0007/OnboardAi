"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Calendar,
    ArrowUpRight
} from "lucide-react"

// Mock data
const clients = [
    {
        id: "1",
        name: "TechCorp Industries",
        email: "contact@techcorp.io",
        industry: "Technology",
        status: "IN_PROGRESS",
        progress: 65,
        riskLevel: "LOW",
        startDate: "2026-01-05",
        targetDate: "2026-01-20",
        stage: "Integration Setup",
        tasksCompleted: 8,
        totalTasks: 12
    },
    {
        id: "2",
        name: "FinanceFlow Ltd",
        email: "onboarding@financeflow.com",
        industry: "Fintech",
        status: "IN_PROGRESS",
        progress: 45,
        riskLevel: "MEDIUM",
        startDate: "2026-01-08",
        targetDate: "2026-01-25",
        stage: "Document Upload",
        tasksCompleted: 5,
        totalTasks: 11
    },
    {
        id: "3",
        name: "HealthTech Solutions",
        email: "admin@healthtech.io",
        industry: "Healthcare",
        status: "BLOCKED",
        progress: 30,
        riskLevel: "HIGH",
        startDate: "2026-01-02",
        targetDate: "2026-01-17",
        stage: "Compliance Review",
        tasksCompleted: 3,
        totalTasks: 10
    },
    {
        id: "4",
        name: "IoT Dynamics",
        email: "setup@iotdynamics.com",
        industry: "IoT",
        status: "IN_PROGRESS",
        progress: 85,
        riskLevel: "LOW",
        startDate: "2026-01-01",
        targetDate: "2026-01-16",
        stage: "Final Review",
        tasksCompleted: 11,
        totalTasks: 13
    },
    {
        id: "5",
        name: "GreenEnergy Co",
        email: "tech@greenenergy.com",
        industry: "Energy",
        status: "NOT_STARTED",
        progress: 0,
        riskLevel: "LOW",
        startDate: "2026-01-15",
        targetDate: "2026-01-30",
        stage: "Kickoff",
        tasksCompleted: 0,
        totalTasks: 9
    },
    {
        id: "6",
        name: "RetailMax Corp",
        email: "integration@retailmax.com",
        industry: "Retail",
        status: "COMPLETED",
        progress: 100,
        riskLevel: "LOW",
        startDate: "2025-12-15",
        targetDate: "2026-01-05",
        stage: "Completed",
        tasksCompleted: 10,
        totalTasks: 10
    },
]

const filters = ["All", "In Progress", "Blocked", "Not Started", "Completed"]

import { getClients } from "@/app/actions/clients"
import { useEffect } from "react"

export default function ClientsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState("All")
    const [realClients, setRealClients] = useState<any[]>([])

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients()
                const formatted = data.map(client => ({
                    id: client.id,
                    name: client.name,
                    email: client.email,
                    industry: client.industry || "Other",
                    status: client.onboardings[0]?.status || "NOT_STARTED",
                    progress: 0,
                    riskLevel: "LOW",
                    startDate: client.createdAt.toISOString().split('T')[0],
                    targetDate: client.onboardings[0]?.targetDate?.toISOString().split('T')[0] || "2026-03-01",
                    stage: "Kickoff",
                    tasksCompleted: 0,
                    totalTasks: 10
                }))
                setRealClients(formatted)
            } catch (error) {
                console.error("Failed to fetch clients:", error)
            }
        }
        fetchClients()
    }, [])

    const allClients = [...realClients, ...clients]

    const filteredClients = allClients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesFilter = activeFilter === "All" ||
            (activeFilter === "In Progress" && client.status === "IN_PROGRESS") ||
            (activeFilter === "Blocked" && client.status === "BLOCKED") ||
            (activeFilter === "Not Started" && client.status === "NOT_STARTED") ||
            (activeFilter === "Completed" && client.status === "COMPLETED")

        return matchesSearch && matchesFilter
    })

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
            default:
                return null
        }
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Clients</h1>
                    <p className="text-slate-400 mt-1">Manage all your client onboardings in one place</p>
                </div>
                <Link href="/dashboard/clients/new">
                    <Button>
                        <Plus className="w-4 h-4" />
                        New Client
                    </Button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Search clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {filters.map((filter) => (
                        <Button
                            key={filter}
                            variant={activeFilter === filter ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Client Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map((client) => (
                    <Link key={client.id} href={`/dashboard/clients/${client.id}`}>
                        <Card className="h-full hover:border-violet-500/50 transition-all duration-200 cursor-pointer group">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <Avatar
                                        fallback={client.name}
                                        size="lg"
                                    />
                                    <button className="p-1.5 rounded-lg hover:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>

                                <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-violet-400 transition-colors">
                                    {client.name}
                                </h3>
                                <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {client.email}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {getStatusBadge(client.status)}
                                    {getRiskBadge(client.riskLevel)}
                                    <Badge variant="outline">{client.industry}</Badge>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-400">{client.stage}</span>
                                            <span className="text-slate-500">{client.progress}%</span>
                                        </div>
                                        <Progress
                                            value={client.progress}
                                            variant={client.status === "COMPLETED" ? "success" : client.riskLevel === "HIGH" ? "danger" : "default"}
                                            size="sm"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">
                                            {client.tasksCompleted}/{client.totalTasks} tasks
                                        </span>
                                        <span className="text-slate-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Due {new Date(client.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
                <Card className="p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No clients found</h3>
                    <p className="text-slate-400 mb-4">Try adjusting your search or filter criteria</p>
                    <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveFilter("All") }}>
                        Clear Filters
                    </Button>
                </Card>
            )}
        </div>
    )
}
