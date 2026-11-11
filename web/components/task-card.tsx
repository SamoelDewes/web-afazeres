"use client";

import * as React from "react";
import { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  members: { id: string; name: string }[];
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({
  task,
  members,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const assigned = members.filter((m) =>
    (task.assigneeIds ?? []).includes(m.id)
  );

  return (
    <article className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md group">
      <button
        onClick={onToggle}
        aria-label={task.is_completed ? "Marcar como não concluída" : "Marcar como concluída"}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 active:scale-90 ${
          task.is_completed
            ? "border-green-600 bg-green-600 text-white"
            : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        }`}
      >
        {task.is_completed && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3
            className={`text-sm font-semibold leading-snug ${
              task.is_completed ? "line-through text-slate-400" : "text-slate-900"
            }`}
          >
            {task.title}
          </h3>
          {task.period === "weekend" && (
            <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              Fim de Semana
            </span>
          )}
        </div>
        {assigned.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {assigned.map((member) => (
              <span
                key={member.id}
                className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
              >
                {member.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 ml-2">
        <button
          onClick={onEdit}
          className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-center"
          aria-label="Editar tarefa"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center"
          aria-label="Excluir tarefa"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </article>
  );
}
