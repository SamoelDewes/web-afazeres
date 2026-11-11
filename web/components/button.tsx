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
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2";

  const variants: Record<string, string> = {
    primary:
      "bg-indigo-700 text-white hover:bg-indigo-600 shadow-sm active:scale-95",
    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-95",
    ghost:
      "bg-transparent text-indigo-700 hover:bg-indigo-50 active:scale-95",
    outline:
      "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100 active:scale-95",
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
