"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMember(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Informe o nome da pessoa." };

  const supabase = await createClient();
  const { error } = await supabase.from("members").insert({ name });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: "Membro adicionado." };
}

export async function removeMember(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Membro não informado." };

  const supabase = await createClient();
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: "Membro removido." };
}
