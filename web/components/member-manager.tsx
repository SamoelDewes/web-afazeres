"use client";

import * as React from "react";

interface MemberManagerProps {
  members: Array<{ id: string; name: string }>;
  onAdd: (name: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onClose: () => void;
}

export function MemberManager({
  members,
  onAdd,
  onRemove,
  onClose,
}: MemberManagerProps) {
  const [name, setName] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [removing, setRemoving] = React.useState<Set<string>>(new Set());

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setAdding(true);
    await onAdd(trimmed);
    setAdding(false);
    setName("");
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Remover este membro?")) return;
    setRemoving((prev) => new Set(prev).add(id));
    await onRemove(id);
    setRemoving((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Membros da casa</h2>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Fechar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            placeholder="Nome da pessoa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 min-h-[44px] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            disabled={adding}
          />
          <button
            type="submit"
            disabled={adding || !name.trim()}
            className="rounded-xl bg-indigo-700 text-white font-medium px-4 min-h-[44px] text-sm shadow-sm hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {adding ? "Adicionando..." : "Adicionar"}
          </button>
        </form>

        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Pessoas cadastradas
          </p>
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm text-slate-700 truncate">{member.name}</span>
                <button
                  onClick={() => handleRemove(member.id)}
                  disabled={removing.has(member.id)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label={`Remover ${member.name}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-6">
              Nenhum membro cadastrado ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
