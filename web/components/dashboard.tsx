"use client";

import * as React from "react";
import { LogOut, Settings, Plus } from "lucide-react";
import { Fab } from "@/components/fab";
import { TaskFormModal } from "@/components/task-form-modal";
import { MemberManager } from "@/components/member-manager";
import { TaskCard } from "@/components/task-card";
import { toggleTask, deleteTask } from "@/lib/actions/tasks";
import { addMember, removeMember } from "@/lib/actions/members";
import { logoutAction } from "@/lib/actions/logout";
import { Task } from "@/lib/types";

interface DashboardProps {
  members: Array<{ id: string; name: string }>;
  tasks: Task[];
}

export function Dashboard({ members, tasks }: DashboardProps) {
  const [period, setPeriod] = React.useState<"week" | "weekend">("week");
  const [taskModalOpen, setTaskModalOpen] = React.useState(false);
  const [memberManagerOpen, setMemberManagerOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null);

  const filteredTasks = tasks.filter((t) => t.period === period);
  const periodLabel = period === "week" ? "desta semana" : "de final de semana";

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // toggleTask/deleteTask esperam FormData; vamos criar wrappers que chamam as actions com FormData
  const handleComplete = async (task: Task) => {
    const formData = new FormData();
    formData.append("id", task.id);
    formData.append("isCompleted", String(task.is_completed));
    const result = await toggleTask(formData);
    if (result.error) showToast(result.error, "error");
    else showToast(result.success || "Tarefa atualizada.");
  };

  const handleDelete = async (task: Task) => {
    if (!confirm("Excluir esta tarefa?")) return;
    const formData = new FormData();
    formData.append("id", task.id);
    const result = await deleteTask(formData);
    if (result.error) showToast(result.error, "error");
    else showToast(result.success || "Tarefa excluída.");
  };

  const handleAddMember = async (name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    const result = await addMember(formData);
    if (result.error) showToast(result.error, "error");
    else {
      showToast(result.success || "Membro adicionado.");
      setMemberManagerOpen(false);
    }
  };

  const handleRemoveMember = async (id: string) => {
    if (!confirm("Remover este membro?")) return;
    const formData = new FormData();
    formData.append("id", id);
    const result = await removeMember(formData);
    if (result.error) showToast(result.error, "error");
    else showToast(result.success || "Membro removido.");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3.5 bg-indigo-dark text-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-indigo-light flex items-center justify-center text-indigo-dark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M22 4h-7.9a4 4 0 0 0-.566 2.826" />
              <path d="M22 4l-.7 3.887a2 2 0 0 1-.453 1.06" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">Tarefas de Casa</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMemberManagerOpen(true)}
            className="p-2 rounded-xl text-white/90 hover:bg-white/10 transition-colors"
            aria-label="Configurações"
          >
            <Settings width="20" height="20" />
          </button>
          <form action={logoutAction} style={{ display: "inline" }}>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/90 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <LogOut width="16" height="16" /> Sair
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-2">
        {/* Toggle período */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Período</span>
          </div>
          <div className="inline-flex rounded-2xl border border-border p-1 bg-surface shadow-sm">
            <button
              onClick={() => setPeriod("week")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                period === "week"
                  ? "bg-indigo-dark border-indigo-dark text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setPeriod("weekend")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                period === "weekend"
                  ? "bg-indigo-dark border-indigo-dark text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Final de Semana
            </button>
          </div>
        </div>

        {toast && (
          <div className="mb-4 px-4 py-3 rounded-xl border bg-success-bg border-success/20 text-success text-sm flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {toast.message}
          </div>
        )}

        {/* Lista de tarefas */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <svg width="48" height="48" className="mx-auto opacity-20 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p className="text-sm text-muted">
                Nenhuma tarefa neste período{" "}
                {periodLabel}.
              </p>
              <button
                onClick={() => setTaskModalOpen(true)}
                className="mt-4 ghost"
              >
                <Plus width="16" height="16" className="mr-1" /> Criar primeira tarefa
              </button>
            </div>
          ) : (
            <>
              {filteredTasks.map((task) => {
                const assignedMembers = members.filter((m) =>
                  task.assigneeIds?.includes(m.id)
                );
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    members={assignedMembers}
                    onToggle={() => handleComplete(task)}
                    onEdit={() => setEditingTask(task)}
                    onDelete={() => handleDelete(task)}
                  />
                );
              })}
            </>
          )}
        </div>
      </main>

      <Fab onClick={() => setTaskModalOpen(true)} />

      <TaskFormModal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSuccess={() => setTaskModalOpen(false)}
        task={editingTask ?? undefined}
        members={members}
      />

      <MemberManager
        members={members}
        onAdd={handleAddMember}
        onRemove={handleRemoveMember}
        adding={false}
        newName=""
        setNewName={() => {}}
        removing={new Set()}
        onClose={() => setMemberManagerOpen(false)}
      />
    </div>
  );
}
