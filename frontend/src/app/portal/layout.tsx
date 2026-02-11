import { getClientSession } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logout } from "@/app/actions/auth"

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getClientSession()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            {/* Simple Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-xl">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm">
                            OA
                        </div>
                        OnboardAI
                        <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full ml-2">Portal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-400">
                            Logged in as <span className="text-white">{session.name}</span>
                        </div>
                        <form action={logout}>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <LogOut className="w-4 h-4 mr-2" />
                                Log Out
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    )
}
