"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export function CadastroForm() {
  const { pending } = useFormStatus();

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="block w-full rounded-xl border border-border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-base"
          placeholder="seu@email.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="block w-full rounded-xl border border-border px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-base"
          placeholder="••••••••"
        />
      </div>

      <button type="submit" disabled={pending} className="w-full primary lg disabled:opacity-100">
        {pending ? "Criando..." : "Criar conta"}
      </button>
    </form>
  );
}
