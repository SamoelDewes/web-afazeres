"use client";

import * as React from "react";
import { Button } from "@/components/button";

interface MemberManagerProps {
  members: Array<{ id: string; name: string }>;
  onAdd: (name: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  adding: boolean;
  newName: string;
  setNewName: (name: string) => void;
  removing: Set<string>;
  onClose: () => void;
}

export function MemberManager({
  members,
  onAdd,
  onRemove,
  adding,
  newName,
  setNewName,
  removing,
  onClose,
}: MemberManagerProps) {
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(newName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-surface w-full max-w-md p-5 rounded-2xl shadow-xl border border-border animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Membros da casa</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-muted-bg hover:text-slate-900 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nome da pessoa"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-base"
              disabled={adding}
            />
            <button type="submit" className="primary lg" disabled={adding || !newName.trim()}>
              {adding ? "Adicionando..." : "Adicionar"}
            </button>
          </div>

          {members.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">Pessoas cadastradas</p>
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between px-3 py-2 rounded-xl border border-border bg-surface hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-300">{member.name}</span>
                  <button
                    onClick={() => onRemove(member.id)}
                    disabled={removing.has(member.id)}
                    className="text-slate-400 hover:text-danger hover:bg-danger-bg rounded-full p-1.5 transition-colors"
                    aria-label="Remover membro"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted text-center py-4">Nenhum membro cadastrado ainda.</p>
          )}
        </form>
      </div>
    </div>
  );
}
