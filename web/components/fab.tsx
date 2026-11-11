"use client";

import * as React from "react";
import { Plus } from "lucide-react";

interface FabProps {
  onClick: () => void;
}

export function Fab({ onClick }: FabProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 z-40 w-14 h-14 rounded-full bg-indigo-dark text-white shadow-lg hover:bg-indigo-base focus:outline-none focus:ring-2 focus:ring-indigo-base focus:ring-offset-2 active:scale-95 transition-all"
      aria-label="Adicionar nova tarefa"
    >
      <Plus width="26" height="26" />
    </button>
  );
}
