"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const isArabic = language === "ar";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const supabase = createClient();
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
    if (result.error) {
      setMessage(isArabic ? "تعذر إكمال الطلب. راجع البريد وكلمة المرور وحاول مرة أخرى." : result.error.message);
      return;
    }
    if (mode === "signin") {
      window.location.assign("/admin");
      return;
    }
    setMessage(isArabic ? "راجع بريدك لتأكيد الحساب." : "Check your email to confirm your account.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-foreground/10 bg-card/60 p-8 shadow-xl backdrop-blur">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-tight">Naya · نجاة</Link>
          <button type="button" onClick={() => setLanguage(isArabic ? "en" : "ar")} className="rounded-full border border-foreground/15 px-3 py-2 text-xs" aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}>{isArabic ? "English" : "العربية"}</button>
        </div>
        <p className="mb-2 text-sm text-muted-foreground">{isArabic ? "طريقك للتعافي من المخدرات" : "Your path to recovery from drugs"}</p>
        <h1 className="font-display text-4xl">{mode === "signin" ? (isArabic ? "أهلاً بعودتك" : "Welcome back") : (isArabic ? "ابدأ رحلة التعافي" : "Start your recovery")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{isArabic ? "دعم آمن وكورسات أونلاين." : "Safe support and online courses."}</p>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm"><span>{isArabic ? "البريد الإلكتروني" : "Email"}</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-xl border border-foreground/15 bg-background px-4 outline-none focus:border-foreground/50" /></label>
          <label className="flex flex-col gap-2 text-sm"><span>{isArabic ? "كلمة المرور" : "Password"}</span><input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border border-foreground/15 bg-background px-4 outline-none focus:border-foreground/50" /></label>
          <button className="h-12 rounded-xl bg-foreground font-medium text-background" type="submit">{mode === "signin" ? (isArabic ? "تسجيل الدخول" : "Sign in") : (isArabic ? "إنشاء حساب" : "Create account")}</button>
        </form>
        {message && <p role="status" className="mt-4 text-sm text-muted-foreground">{message}</p>}
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-6 text-sm underline underline-offset-4">{mode === "signin" ? (isArabic ? "ليس لديك حساب؟ إنشاء حساب" : "New here? Create an account") : (isArabic ? "لديك حساب؟ تسجيل الدخول" : "Already have an account? Sign in")}</button>
        <Link href="/admin" className="mt-6 block text-xs text-muted-foreground hover:text-foreground">{isArabic ? "دخول المعالجين والإدارة" : "Therapist and admin access"}</Link>
      </div>
    </main>
  );
}
