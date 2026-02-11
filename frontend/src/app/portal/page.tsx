import { getClientSession } from "@/app/actions/auth"
import { getClientTasks } from "@/app/actions/portal"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, FileText, Upload, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function PortalPage() {
    const session = await getClientSession()
    // For MVP, we fallback to a mock structure if backend data isn't perfectly linked yet.
    // In real app, we fetch: const onboarding = await getClientTasks(session.clientId);
    
    // Mock Data for Visuals (since we need backend endpoints for specific task fetching)
    const mockTasks = [
        {
            name: "Kickoff Phase",
            tasks: [
                { title: "Sign Service Agreement", status: "completed", type: "esign" },
                { title: "Upload Company Logo", status: "pending", type: "upload" },
                { title: "Fill Technical Requirements Form", status: "pending", type: "form" }
            ]
        },
        {
            name: "Implementation",
            tasks: [
                { title: "Schedule Training Session", status: "locked", type: "meeting" },
                { title: "Invite Team Members", status: "locked", type: "action" }
            ]
        }
    ]

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Hello, {session?.name}</h1>
                <p className="text-slate-400">Here is your onboarding progress for <span className="text-violet-400">{session?.clientName}</span>.</p>
            </div>

            {/* Overall Progress */}
            <Card className="border-slate-800 bg-slate-900/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-400">Overall Progress</span>
                        <span className="text-sm font-bold text-white">33%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 w-1/3 transition-all duration-1000" />
                    </div>
                </CardContent>
            </Card>

            {/* Task List */}
            <div className="space-y-6">
                {mockTasks.map((stage, i) => (
                    <Card key={i} className="border-slate-800 bg-slate-900/30">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400">
                                    {i + 1}
                                </div>
                                {stage.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {stage.tasks.map((task, j) => (
                                <div key={j} className="group flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        {task.status === "completed" ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : task.status === "locked" ? (
                                            <Clock className="w-5 h-5 text-slate-600" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-violet-500" />
                                        )}
                                        
                                        <div className={task.status === "locked" ? "opacity-50" : ""}>
                                            <h4 className="font-medium text-slate-200">{task.title}</h4>
                                            <p className="text-xs text-slate-500 capitalize">{task.type}</p>
                                        </div>
                                    </div>

                                    <div>
                                        {task.status === "pending" && task.type === "upload" && (
                                            <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                                                <Upload className="w-3 h-3 mr-2" />
                                                Upload
                                            </Button>
                                        )}
                                        {task.status === "pending" && task.type === "form" && (
                                            <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                                                <FileText className="w-3 h-3 mr-2" />
                                                Fill Form
                                            </Button>
                                        )}
                                        {task.status === "locked" && (
                                            <Badge variant="secondary" className="bg-slate-800 text-slate-500 hover:bg-slate-800">Locked</Badge>
                                        )}
                                        {task.status === "completed" && (
                                            <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Done</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
