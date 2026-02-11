"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Layout } from "lucide-react"
import { getTemplates, type OnboardingTemplate } from "@/app/actions/templates"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<OnboardingTemplate[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const data = await getTemplates()
            setTemplates(data)
            setLoading(false)
        }
        load()
    }, [])

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Templates</h1>
                    <p className="text-slate-400 mt-1">Manage your onboarding workflows</p>
                </div>
                <Link href="/dashboard/templates/new">
                    <Button>
                        <Plus className="w-4 h-4" />
                        New Template
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading templates...</div>
            ) : templates.length === 0 ? (
                <Card className="p-12 text-center border-dashed border-2 border-slate-700 bg-slate-800/20">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Layout className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No templates yet</h3>
                    <p className="text-slate-400 mb-6">Create your first template to streamline onboardings</p>
                    <Link href="/dashboard/templates/new">
                        <Button>Create Template</Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template, i) => (
                        <Card key={i} className="hover:border-violet-500/50 transition-all cursor-pointer">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mb-2">
                                        <Layout className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <Badge variant="secondary">{template.industryType}</Badge>
                                </div>
                                <CardTitle className="text-lg">{template.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                                    {template.description}
                                </p>
                                <div className="text-xs text-slate-500">
                                    {template.stages?.length || 0} Stages • {template.stages?.reduce((acc, s) => acc + (s.tasks?.length || 0), 0) || 0} Tasks
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
