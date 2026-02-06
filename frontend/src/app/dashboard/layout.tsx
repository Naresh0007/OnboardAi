"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import {
    LayoutDashboard,
    Users,
    FileStack,
    Settings,
    LogOut,
    Sparkles,
    Bell,
    Search,
    ChevronDown
} from "lucide-react"

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Templates", href: "/dashboard/templates", icon: FileStack },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const isAuth = document.cookie.includes("onboard_ai_simulated_auth=true")
        if (isAuth) {
            setIsAuthorized(true)
        } else {
            router.push("/login")
        }
    }, [router])

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-slate-800 flex flex-col z-50">
                {/* Logo */}
                <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">OnboardAI</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4">
                    <ul className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== "/dashboard" && pathname.startsWith(item.href))
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white border border-violet-500/30"
                                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5", isActive && "text-violet-400")} />
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* User section */}
                <div className="p-3 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <Avatar
                            fallback="John Doe"
                            size="sm"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">John Doe</p>
                            <p className="text-xs text-slate-500 truncate">Admin</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 ml-64">
                {/* Top bar */}
                <header className="h-16 glass border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search clients, tasks..."
                                className="w-80 h-9 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
