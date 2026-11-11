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
  const [toast, setToast] = React.useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const filteredTasks = tasks.filter((t) => t.period === period);
  const pendingCount = filteredTasks.filter((t) => !t.is_completed).length;
  const periodLabel = period === "week" ? "desta semana" : "do final de semana";

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

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
    else showToast(result.success || "Membro adicionado.");
  };

  const handleRemoveMember = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    const result = await removeMember(formData);
    if (result.error) showToast(result.error, "error");
    else showToast(result.success || "Membro removido.");
  };

  const openNewTask = () => {
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const openEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-indigo-700 text-white shadow-md shadow-indigo-900/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M22 4h-7.9a4 4 0 0 0-.566 2.826" />
              <path d="M22 4l-.7 3.887a2 2 0 0 1-.453 1.06" />
            </svg>
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-base">Tarefas de Casa</h1>
            <p className="text-[11px] text-white/70">
              {pendingCount} pendente{pendingCount === 1 ? "" : "s"}{" "}
              {period === "week" ? "na semana" : "no fim de semana"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMemberManagerOpen(true)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-white/90 hover:bg-white/10 transition-colors"
            aria-label="Configurações"
          >
            <Settings width="20" height="20" />
          </button>
          <form action={logoutAction}>
            <button
              className="flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <LogOut width="16" height="16" /> Sair
            </button>
          </form>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed left-4 right-4 top-16 z-50 mx-auto max-w-sm px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
          role="status"
        >
          {toast.type === "success" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          {toast.message}
        </div>
      )}

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-4 pb-28">
        {/* Toggle período — assinatura */}
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm grid grid-cols-2">
          <button
            onClick={() => setPeriod("week")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px] ${
              period === "week"
                ? "bg-indigo-700 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod("weekend")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px] ${
              period === "weekend"
                ? "bg-indigo-700 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Final de Semana
          </button>
        </div>

        {/* Lista de tarefas */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-14">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">
                Nenhuma tarefa {periodLabel}.
              </p>
              <button
                onClick={openNewTask}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl text-indigo-700 font-medium text-sm px-4 py-2.5 min-h-[44px] hover:bg-indigo-50 transition-colors"
              >
                <Plus width="16" height="16" /> Criar primeira tarefa
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const assignedMembers = members.filter((m) =>
                (task.assigneeIds ?? []).includes(m.id)
              );
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  members={assignedMembers}
                  onToggle={() => handleComplete(task)}
                  onEdit={() => openEditTask(task)}
                  onDelete={() => handleDelete(task)}
                />
              );
            })
          )}
        </div>
      </main>

      <Fab onClick={openNewTask} />

      <TaskFormModal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSuccess={() => showToast("Tarefa salva.")}
        task={editingTask ?? undefined}
        members={members}
      />

      <MemberManager
        open={memberManagerOpen}
        members={members}
        onAdd={handleAddMember}
        onRemove={handleRemoveMember}
        onClose={() => setMemberManagerOpen(false)}
      />
    </div>
  );
}
