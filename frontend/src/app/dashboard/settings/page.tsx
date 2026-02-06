"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import {
    Building2,
    Users,
    Bell,
    Palette,
    Shield,
    Webhook,
    Key,
    Mail,
    Globe,
    Save,
    Plus,
    Trash2
} from "lucide-react"

const teamMembers = [
    { id: "1", name: "John Doe", email: "john@company.com", role: "Admin", avatar: null },
    { id: "2", name: "Sarah Smith", email: "sarah@company.com", role: "Member", avatar: null },
    { id: "3", name: "Mike Johnson", email: "mike@company.com", role: "Member", avatar: null },
]

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your workspace and preferences</p>
            </div>

            {/* Company Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle>Company Settings</CardTitle>
                            <CardDescription>Basic information about your organization</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                            <Input defaultValue="Acme Corporation" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Subdomain</label>
                            <div className="flex">
                                <Input defaultValue="acme" className="rounded-r-none" />
                                <div className="px-3 flex items-center bg-slate-800 border border-l-0 border-slate-700 rounded-r-lg text-slate-500 text-sm">
                                    .onboardai.io
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Support Email</label>
                            <Input defaultValue="support@acme.com" type="email" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                            <Input defaultValue="https://acme.com" />
                        </div>
                    </div>
                    <Button>
                        <Save className="w-4 h-4" />
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>Manage who has access to your workspace</CardDescription>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4" />
                            Invite Member
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                            >
                                <Avatar fallback={member.name} />
                                <div className="flex-1">
                                    <p className="font-medium text-white">{member.name}</p>
                                    <p className="text-sm text-slate-500">{member.email}</p>
                                </div>
                                <Badge variant={member.role === "Admin" ? "default" : "secondary"}>
                                    {member.role}
                                </Badge>
                                <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4 text-slate-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Branding */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                            <Palette className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle>Branding</CardTitle>
                            <CardDescription>Customize the client portal appearance</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Primary Color</label>
                            <div className="flex gap-2">
                                <div className="w-10 h-10 rounded-lg bg-violet-500 border-2 border-white cursor-pointer" />
                                <div className="w-10 h-10 rounded-lg bg-blue-500 border-2 border-transparent cursor-pointer hover:border-white/50 transition-colors" />
                                <div className="w-10 h-10 rounded-lg bg-emerald-500 border-2 border-transparent cursor-pointer hover:border-white/50 transition-colors" />
                                <div className="w-10 h-10 rounded-lg bg-orange-500 border-2 border-transparent cursor-pointer hover:border-white/50 transition-colors" />
                                <div className="w-10 h-10 rounded-lg bg-pink-500 border-2 border-transparent cursor-pointer hover:border-white/50 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Logo</label>
                            <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center hover:border-slate-600 transition-colors cursor-pointer">
                                <p className="text-sm text-slate-500">Click to upload logo</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Configure email and in-app notifications</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { label: "New client onboarding started", enabled: true },
                        { label: "Task completed by client", enabled: true },
                        { label: "Document uploaded", enabled: true },
                        { label: "Onboarding at risk", enabled: true },
                        { label: "Daily progress digest", enabled: false },
                        { label: "Weekly summary report", enabled: true },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                            <span className="text-slate-300">{item.label}</span>
                            <button
                                className={`w-12 h-6 rounded-full transition-colors ${item.enabled ? "bg-violet-500" : "bg-slate-700"
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${item.enabled ? "translate-x-6" : "translate-x-0.5"
                                    }`} />
                            </button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* API & Integrations */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Key className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle>API & Integrations</CardTitle>
                            <CardDescription>Manage API keys and external connections</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
                        <div className="flex gap-2">
                            <Input
                                value="sk_live_••••••••••••••••••••"
                                readOnly
                                className="font-mono"
                            />
                            <Button variant="outline">Regenerate</Button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                        {[
                            { name: "Slack", connected: true, icon: "💬" },
                            { name: "DocuSign", connected: true, icon: "✍️" },
                            { name: "Zapier", connected: false, icon: "⚡" },
                        ].map((integration) => (
                            <div
                                key={integration.name}
                                className="p-4 rounded-xl bg-slate-800/30 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{integration.icon}</span>
                                    <span className="text-slate-300">{integration.name}</span>
                                </div>
                                <Badge variant={integration.connected ? "success" : "secondary"}>
                                    {integration.connected ? "Connected" : "Connect"}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-500/30">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-red-400">Danger Zone</CardTitle>
                            <CardDescription>Irreversible actions</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div>
                            <p className="font-medium text-white">Delete Workspace</p>
                            <p className="text-sm text-slate-500">Permanently delete all data</p>
                        </div>
                        <Button variant="destructive">Delete Workspace</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
