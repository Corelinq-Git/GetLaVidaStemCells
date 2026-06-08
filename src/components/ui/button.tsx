"use client";

import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "cta";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-coral text-white font-semibold hover:bg-coral-dark shadow-md hover:shadow-lg",
  secondary:
    "border border-cream/30 text-cream font-semibold hover:bg-cream/10",
  ghost: "border border-cream/30 text-cream hover:bg-cream/10",
  cta: "bg-coral text-white font-bold hover:bg-coral-dark shadow-lg hover:shadow-xl text-lg",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm rounded-full",
  md: "px-7 py-3 text-base rounded-full",
  lg: "px-9 py-4 text-lg rounded-full",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
