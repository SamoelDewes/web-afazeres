"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface TaskFormData {
  title: string;
  period: "week" | "weekend";
  memberIds: string[];
}

export async function addTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const period = String(formData.get("period") ?? "");
  const memberIds = (formData.getAll("memberIds") as string[]).filter(Boolean);

  if (!title) return { error: "Informe o título da tarefa." };
  if (period !== "week" && period !== "weekend")
    return { error: "Selecione o período da tarefa." };

  const supabase = await createClient();

  const { data: task, error } = await supabase
    .from("tasks")
    .insert({ title, period })
    .select()
    .single();

  if (error) return { error: error.message };

  if (memberIds.length > 0) {
    const assignees = memberIds.map((memberId) => ({
      task_id: task.id,
      member_id: memberId,
    }));
    const { error: assigneeError } = await supabase
      .from("task_assignees")
      .insert(assignees);
    if (assigneeError) return { error: assigneeError.message };
  }

  revalidatePath("/dashboard");
  return { success: "Tarefa criada." };
}

export async function updateTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const period = String(formData.get("period") ?? "");
  const memberIds = (formData.getAll("memberIds") as string[]).filter(Boolean);

  if (!id) return { error: "Tarefa não informada." };
  if (!title) return { error: "Informe o título da tarefa." };
  if (period !== "week" && period !== "weekend")
    return { error: "Selecione o período da tarefa." };

  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({ title, period })
    .eq("id", id);

  if (error) return { error: error.message };

  await supabase.from("task_assignees").delete().eq("task_id", id);

  if (memberIds.length > 0) {
    const assignees = memberIds.map((memberId) => ({
      task_id: id,
      member_id: memberId,
    }));
    const { error: assigneeError } = await supabase
      .from("task_assignees")
      .insert(assignees);
    if (assigneeError) return { error: assigneeError.message };
  }

  revalidatePath("/dashboard");
  return { success: "Tarefa atualizada." };
}

export async function toggleTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const isCompleted = formData.get("isCompleted") === "true";

  if (!id) return { error: "Tarefa não informada." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ is_completed: !isCompleted })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: "Tarefa atualizada." };
}

export async function deleteTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Tarefa não informada." };

  const supabase = await createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: "Tarefa excluída." };
}
