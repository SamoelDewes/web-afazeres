"use client";

import * as React from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { X, Plus, CheckCircle } from "lucide-react";
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

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative bg-surface w-full max-w-md p-5 rounded-2xl shadow-xl border border-border animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing ? "Editar tarefa" : "Nova tarefa"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-muted-bg hover:text-slate-900 transition-colors">
            <X width="20" height="20" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Título da tarefa"
            placeholder="Ex: Lavar louça"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={error}
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Período
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPeriod("week")}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                  period === "week"
                    ? "bg-indigo-dark border-indigo-dark text-white shadow-sm"
                    : "border-border bg-surface text-slate-700 hover:bg-slate-100"
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setPeriod("weekend")}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                  period === "weekend"
                    ? "bg-indigo-dark border-indigo-dark text-white shadow-sm"
                    : "border-border bg-surface text-slate-700 hover:bg-slate-100"
                }`}
              >
                Final de Semana
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Quem vai fazer?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {members.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => toggleMember(member.id)}
                  className={`rounded-xl border px-2 py-2 text-sm font-medium transition-all capitalize ${
                    selectedMemberIds.includes(member.id)
                      ? "bg-indigo-dark border-indigo-dark text-white shadow-sm"
                      : "border-border bg-surface text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {member.name}
                </button>
              ))}
            </div>
            {members.length === 0 && (
              <p className="text-sm text-muted">Nenhum membro cadastrado. Adicione em Configurações.</p>
            )}
          </div>

          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 ghost"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 primary lg"
              disabled={loading || !title.trim()}
            >
              {loading ? "Salvando..." : isEditing ? "Salvar" : "Criar tarefa"}
              <Plus width="16" height="16" className="ml-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
