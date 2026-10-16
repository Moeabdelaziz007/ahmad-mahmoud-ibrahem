"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const isArabic = language === "ar";

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => { setEmail(data.user?.email ?? null); setLoading(false); });
  }, []);

  async function signOut() { await createClient().auth.signOut(); setEmail(null); }

  if (loading) return <main className="flex min-h-screen items-center justify-center">{isArabic ? "جارٍ التحميل..." : "Loading..."}</main>;
  if (!email) return <main className="flex min-h-screen items-center justify-center px-6"><div className="max-w-md text-center"><h1 className="font-display text-4xl">{isArabic ? "دخول الإدارة" : "Admin sign in"}</h1><p className="mt-3 text-muted-foreground">{isArabic ? "سجّل الدخول للوصول إلى لوحة المعالجين." : "Sign in to access the therapist dashboard."}</p><Link className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-background" href="/auth">{isArabic ? "تسجيل الدخول" : "Go to sign in"}</Link></div></main>;

  return <main className="min-h-screen bg-background px-6 py-12"><div className="mx-auto max-w-5xl"><div className="flex items-center justify-between"><div><Link href="/" className="font-display text-2xl">Naya · نجاة</Link><p className="mt-3 text-sm text-muted-foreground">{isArabic ? "لوحة إدارة الدعم والكورسات" : "Support and courses dashboard"}</p></div><div className="flex items-center gap-3"><button onClick={() => setLanguage(isArabic ? "en" : "ar")} className="rounded-full border border-foreground/15 px-3 py-2 text-xs">{isArabic ? "English" : "العربية"}</button><button onClick={signOut} className="rounded-full border border-foreground/15 px-4 py-2 text-sm">{isArabic ? "تسجيل الخروج" : "Sign out"}</button></div></div><section className="mt-12 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-foreground/10 p-6"><p className="text-sm text-muted-foreground">{isArabic ? "الحساب" : "Account"}</p><p className="mt-3 font-medium">{email}</p></div><div className="rounded-2xl border border-foreground/10 p-6"><p className="text-sm text-muted-foreground">{isArabic ? "الكورسات" : "Courses"}</p><p className="mt-3 font-display text-3xl">0</p></div><div className="rounded-2xl border border-foreground/10 p-6"><p className="text-sm text-muted-foreground">{isArabic ? "طلبات الدعم" : "Support requests"}</p><p className="mt-3 font-display text-3xl">0</p></div></section></div></main>;
}
