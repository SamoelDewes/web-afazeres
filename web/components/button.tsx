"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-base focus-visible:ring-offset-2";

  const variants: Record<string, string> = {
    primary:
      "bg-indigo-dark text-white hover:bg-indigo-base shadow-sm active:scale-95",
    danger:
      "bg-danger text-white hover:bg-bc-800 shadow-sm active:scale-95",
    ghost:
      "bg-transparent text-indigo-dark hover:bg-indigo-light active:scale-95",
    outline:
      "border border-border text-slate-900 hover:bg-slate-100 active:scale-95",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base min-h-[48px]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
