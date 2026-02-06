import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 backdrop-blur-sm transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-200",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
