import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CadastroForm } from "@/components/cadastro-form";

export const dynamic = "force-dynamic";

const MESSAGES: Record<string, string> = {
  user_already_registered:
    "Este e-mail já tem uma conta. Faça login ou use outro e-mail.",
  weak_password: "A senha precisa ter pelo menos 6 caracteres.",
  signup_disabled:
    "O cadastro está desativado neste projeto Supabase. Ative o cadastro por e-mail em Authentication > Providers.",
  email_exists: "Este e-mail já está cadastrado. Faça login.",
};

export default async function CadastroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-indigo-dark px-4">
      <div className="w-full max-w-md bg-surface rounded-3xl shadow-2xl border border-indigo-light/50 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-light text-indigo-dark mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M22 4h-7.9a4 4 0 0 0-.566 2.826" />
              <path d="M22 4l-.7 3.887a2 2 0 0 1-.453 1.06" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Tarefas de Casa</h1>
          <p className="text-muted text-sm">Criar sua conta</p>
        </div>

        {notice === "confirm_email" && (
          <div className="mb-4 p-3 rounded-xl bg-indigo-light border border-indigo-dark/20 text-indigo-dark text-sm">
            Conta criada! Confirme seu e-mail (verifique a caixa de entrada e o
            spam) e depois faça login.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger-bg border border-danger/20 text-danger text-sm">
            {MESSAGES[error] ?? "Não foi possível criar a conta. Tente novamente."}
          </div>
        )}

        <form action={cadastroAction} className="space-y-4">
          <CadastroForm />
        </form>

        <p className="text-center text-sm text-muted">
          Já tem conta?{" "}
          <a href="/login" className="text-indigo-dark font-medium hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}

async function cadastroAction(formData: FormData): Promise<void> {
  "use server";

  const supabase = await createClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    const code = error.code ?? "unknown";
    redirect(`/cadastro?error=${encodeURIComponent(code)}`);
  }

  // Sem sessão pós-signup = confirmação de e-mail obrigatória no Supabase
  if (!data.session) {
    redirect("/cadastro?notice=confirm_email");
  }

  redirect("/dashboard");
}
