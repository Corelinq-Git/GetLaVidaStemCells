"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageDividerProps {
  src: string;
  alt: string;
  height?: string;
  overlay?: "dark" | "ocean" | "none";
  grayscale?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function ParallaxImageDivider({
  src,
  alt,
  height = "h-[50vh] md:h-[60vh]",
  overlay = "dark",
  grayscale = false,
  children,
  className,
}: ParallaxImageDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  const overlayClasses = {
    dark: "bg-gradient-to-b from-ocean-deepest/60 via-ocean-deepest/30 to-ocean-deepest/60",
    ocean: "bg-gradient-to-b from-ocean-deepest/80 via-ocean-deepest/40 to-ocean-deepest/80",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", height, className)}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className={cn(
          "absolute inset-0 w-full h-[130%] object-cover -top-[15%]",
          grayscale && "grayscale"
        )}
      />

      {/* Overlay */}
      {overlay !== "none" && (
        <div className={cn("absolute inset-0 z-[1]", overlayClasses[overlay])} />
      )}

      {/* Optional content centered over image */}
      {children && (
        <div className="relative z-[2] flex items-center justify-center h-full px-6">
          {children}
        </div>
      )}
    </div>
  );
}
