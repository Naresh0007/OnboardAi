import * as React from "react"
import { cn, getInitials } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const avatarVariants = cva(
    "relative flex shrink-0 overflow-hidden rounded-full",
    {
        variants: {
            size: {
                sm: "h-8 w-8 text-xs",
                default: "h-10 w-10 text-sm",
                lg: "h-12 w-12 text-base",
                xl: "h-16 w-16 text-lg",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

export interface AvatarProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
    src?: string | null
    alt?: string
    fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, size, src, alt, fallback, ...props }, ref) => {
        const [hasError, setHasError] = React.useState(false)

        const initials = fallback ? getInitials(fallback) : alt ? getInitials(alt) : "?"

        return (
            <div
                ref={ref}
                className={cn(avatarVariants({ size }), className)}
                {...props}
            >
                {src && !hasError ? (
                    <img
                        src={src}
                        alt={alt || "Avatar"}
                        className="aspect-square h-full w-full object-cover"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 font-medium text-white">
                        {initials}
                    </div>
                )}
            </div>
        )
    }
)
Avatar.displayName = "Avatar"

export { Avatar, avatarVariants }
