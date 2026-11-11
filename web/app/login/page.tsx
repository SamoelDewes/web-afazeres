import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: hasError } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-indigo-700 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M22 4h-7.9a4 4 0 0 0-.566 2.826" />
              <path d="M22 4l-.7 3.887a2 2 0 0 1-.453 1.06" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Tarefas de Casa</h1>
          <p className="text-slate-500 text-sm">Entrar na sua conta</p>
        </div>

        {hasError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {hasError === "email_not_confirmed"
              ? "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada (e a pasta de spam)."
              : hasError === "invalid_credentials"
                ? "E-mail ou senha incorretos. Tente novamente."
                : "Não foi possível entrar. Tente novamente."}
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <LoginForm />
        </form>

        <p className="text-center text-sm text-slate-500">
          Não tem conta?{" "}
          <a href="/cadastro" className="text-indigo-700 font-medium hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}

async function loginAction(formData: FormData): Promise<void> {
  "use server";

  const supabase = await createClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const code = error.code ?? "unknown";
    redirect(`/login?error=${encodeURIComponent(code)}`);
  }

  redirect("/dashboard");
}
