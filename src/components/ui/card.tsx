import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CardVariant = "default" | "glass" | "elevated" | "dark";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white border border-gray-200 shadow-sm",
  glass: "bg-white/70 backdrop-blur-md border border-white/20 shadow-sm",
  elevated: "bg-white shadow-lg border-l-4 border-l-coral border-t-0 border-r-0 border-b-0",
  dark: "bg-white/5 border border-white/10 backdrop-blur-sm",
};

function Card({ className, hover = true, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        variantStyles[variant],
        hover && "hover:shadow-md transition-shadow duration-300",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-semibold text-cream", className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-cream-muted mt-1", className)} {...props} />;
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
