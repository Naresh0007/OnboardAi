"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
    showLabel?: boolean
    size?: "sm" | "default" | "lg"
    variant?: "default" | "success" | "warning" | "danger"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value = 0, max = 100, showLabel = false, size = "default", variant = "default", ...props }, ref) => {
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

        const sizeClasses = {
            sm: "h-1.5",
            default: "h-2.5",
            lg: "h-4",
        }

        const variantClasses = {
            default: "bg-gradient-to-r from-violet-500 to-indigo-500",
            success: "bg-gradient-to-r from-emerald-500 to-teal-500",
            warning: "bg-gradient-to-r from-amber-500 to-orange-500",
            danger: "bg-gradient-to-r from-red-500 to-rose-500",
        }

        return (
            <div className={cn("relative w-full", className)} ref={ref} {...props}>
                <div
                    className={cn(
                        "w-full overflow-hidden rounded-full bg-slate-800",
                        sizeClasses[size]
                    )}
                >
                    <div
                        className={cn(
                            "h-full transition-all duration-500 ease-out rounded-full",
                            variantClasses[variant]
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {showLabel && (
                    <span className="absolute right-0 -top-6 text-xs text-slate-400">
                        {Math.round(percentage)}%
                    </span>
                )}
            </div>
        )
    }
)
Progress.displayName = "Progress"

export { Progress }
