"use client";

import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  className = "",
  label,
  error,
  id,
  ...props
}: InputProps) {
  const inputId = id || React.useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-base focus:border-indigo-base transition-all disabled:bg-slate-100 disabled:text-slate-500 ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-danger">{error}</p>
      )}
    </div>
  );
}
