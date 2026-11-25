"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";

// Same rule as the database: 3 to 20 letters, numbers, _ or -
const NICKNAME_RULE = /^[A-Za-z0-9_-]{3,20}$/;

export default function AccountPage() {
  const { t } = useLanguage();
  const a = t.account;

  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [agreed, setAgreed] = useState(false);
  // A message is either "key:<name>" (translated) or raw text from Supabase
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  function show(m: string) {
    if (m.startsWith("key:")) {
      const k = m.slice(4) as keyof typeof a;
      const value = a[k];
      return typeof value === "string" ? value : "";
    }
    return m;
  }

  // Know who is logged in, and react when they log in or out
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  // Load the nickname of the logged-in student
  useEffect(() => {
    if (!user) {
      setNickname(null);
      return;
    }
    supabase
      .from("profiles")
      .select("nickname")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setNickname(data?.nickname ?? null));
  }, [user, supabase]);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setNotice("");
    if (!NICKNAME_RULE.test(newNickname)) {
      setMessage("key:nicknameRule");
      return;
    }
    if (password.length < 8) {
      setMessage("key:passwordRule");
      return;
    }
    if (!agreed) {
      setMessage("key:agreeRule");
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { nickname: newNickname } },
    });
    setBusy(false);
    if (error) {
      if (error.message.toLowerCase().includes("database error")) {
        setMessage("key:nicknameTaken");
      } else if (error.message.toLowerCase().includes("already registered")) {
        setMessage("key:alreadyRegistered");
      } else {
        setMessage(error.message);
      }
      return;
    }
    if (!data.session) {
      setMessage("key:confirmOn");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setNotice("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) {
      setMessage("key:wrongLogin");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setPassword("");
    setMessage("");
    setNotice("");
  }

  async function handleDelete() {
    setMessage("");
    if (confirmText !== a.deleteWord) {
      setMessage("key:deleteConfirmMsg");
      return;
    }
    setDeleting(true);
    const { error } = await supabase.rpc("delete_my_account");
    if (error) {
      setDeleting(false);
      setMessage("key:deleteFail");
      return;
    }
    await supabase.auth.signOut();
    setDeleting(false);
    setConfirmText("");
    setPassword("");
    setNotice("key:deleted");
  }

  if (loading) {
    return <main className="mx-auto max-w-md px-6 py-16">{a.loading}</main>;
  }

  if (user) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="font-display text-3xl font-extrabold">{a.yourAccount}</h1>
        <p className="mt-4">
          {a.loggedInAs} <strong>{nickname ?? "..."}</strong>.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-full border-2 border-sea px-6 py-2 text-sm font-semibold text-sea hover:bg-sea hover:text-white"
        >
          {a.logout}
        </button>

        <section className="mt-12 rounded-2xl border border-red-300 p-5">
          <h2 className="font-display text-lg font-bold">{a.deleteTitle}</h2>
          <p className="mt-2 text-sm">{a.deleteText}</p>
          <label htmlFor="confirm-delete" className="mt-4 block text-sm font-semibold">
            {a.deleteLabel}
          </label>
          <input
            id="confirm-delete"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-1 w-full rounded-lg border border-deep/25 bg-white px-3 py-2"
            autoComplete="off"
          />
          {message && (
            <p className="mt-3 text-sm font-semibold text-red-700">
              {show(message)}
            </p>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="mt-4 rounded-full border-2 border-red-700 px-6 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white disabled:opacity-60"
          >
            {deleting ? a.deleting : a.deleteTitle}
          </button>
        </section>
      </main>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-deep/25 bg-white px-3 py-2";

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-extrabold">
        {mode === "login" ? a.loginTitle : a.signupTitle}
      </h1>

      {notice && (
        <p className="mt-4 text-sm font-semibold text-sea">{show(notice)}</p>
      )}

      <form
        onSubmit={mode === "login" ? handleLogin : handleSignUp}
        className="mt-6 space-y-4"
      >
        {mode === "signup" && (
          <div>
            <label htmlFor="nickname" className="block text-sm font-semibold">
              {a.nickname}
            </label>
            <input
              id="nickname"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className={inputClass}
              autoComplete="nickname"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-semibold">
            {a.email}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold">
            {a.password}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
        </div>

        {mode === "signup" && (
          <div className="rounded-2xl bg-sand/60 p-4 text-sm">
            <p>{a.notice}</p>
            <label className="mt-3 flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <span>{a.agree}</span>
            </label>
          </div>
        )}

        {message && (
          <p className="text-sm font-semibold text-red-700">{show(message)}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-sea px-7 py-3 font-semibold text-white hover:bg-deep disabled:opacity-60"
        >
          {busy ? a.wait : mode === "login" ? a.loginTitle : a.createAccount}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setMessage("");
          setNotice("");
        }}
        className="mt-6 text-sm font-semibold text-sea underline underline-offset-4"
      >
        {mode === "login" ? a.noAccount : a.haveAccount}
      </button>
    </main>
  );
}