import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Dashboard } from "@/components/dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const [membersResult, tasksResult] = await Promise.all([
    supabase.from("members").select("*").order("created_at", { ascending: true }),
    supabase.from("tasks").select("*, task_assignees(member_id)").order("created_at", { ascending: false }),
  ]);

  const members = (membersResult.data ?? []) as { id: string; name: string }[];
  const tasks = (tasksResult.data ?? []).map((t: any) => ({
    id: t.id,
    title: t.title,
    period: t.period,
    is_completed: t.is_completed,
    created_at: t.created_at,
    assigneeIds: (t.task_assignees ?? []).map((a: any) => a.member_id),
  }));

  return (
    <Dashboard
      members={members}
      tasks={tasks as { id: string; title: string; period: "week" | "weekend"; is_completed: boolean; created_at: string; assigneeIds: string[] }[]}
    />
  );
}
