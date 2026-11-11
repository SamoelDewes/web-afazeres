"use client";

import * as React from "react";
import { addTask, updateTask } from "@/lib/actions/tasks";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task?: { id: string; title: string; period: string; assigneeIds?: string[] };
  members: { id: string; name: string }[];
}

export function TaskFormModal({
  open,
  onClose,
  onSuccess,
  task,
  members,
}: TaskFormModalProps) {
  const [title, setTitle] = React.useState(task?.title ?? "");
  const [period, setPeriod] = React.useState<"week" | "weekend">(
    (task?.period as "week" | "weekend") ?? "week"
  );
  const [selectedMemberIds, setSelectedMemberIds] = React.useState<string[]>(
    task?.assigneeIds ?? []
  );
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const isEditing = !!task;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("period", period);
    selectedMemberIds.forEach((id) => formData.append("memberIds", id));
    if (isEditing && task) formData.append("id", task.id);

    const action = isEditing ? updateTask : addTask;
    const result = await action(formData);

    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onSuccess();
    onClose();
  };

  const toggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing ? "Editar tarefa" : "Nova tarefa"}
          </h2>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="task-title" className="block text-sm font-medium text-slate-700">
              Título da tarefa
            </label>
            <input
              id="task-title"
              type="text"
              placeholder="Ex: Lavar louça"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">Período</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPeriod("week")}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all min-h-[44px] ${
                  period === "week"
                    ? "bg-indigo-700 border-indigo-700 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Semana
              </button>
              <button
                type="button"
                onClick={() => setPeriod("weekend")}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all min-h-[44px] ${
                  period === "weekend"
                    ? "bg-indigo-700 border-indigo-700 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Final de Semana
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">
              Quem vai fazer?
            </span>
            {members.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {members.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.id)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all min-h-[44px] flex items-center justify-between ${
                      selectedMemberIds.includes(member.id)
                        ? "bg-indigo-700 border-indigo-700 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{member.name}</span>
                    {selectedMemberIds.includes(member.id) && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Nenhum membro cadastrado. Adicione pelo menu de configurações no
                header.
              </p>
            )}
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium px-4 py-2.5 min-h-[48px] hover:bg-slate-50 active:scale-95 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-700 text-white font-medium px-4 py-2.5 min-h-[48px] shadow-sm hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
              disabled={loading || !title.trim()}
            >
              {loading ? "Salvando..." : isEditing ? "Salvar" : "Criar tarefa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
