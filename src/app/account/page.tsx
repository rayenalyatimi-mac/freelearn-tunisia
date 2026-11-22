"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// Same rule as the database: 3 to 20 letters, numbers, _ or -
const NICKNAME_RULE = /^[A-Za-z0-9_-]{3,20}$/;

export default function AccountPage() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

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
    if (!NICKNAME_RULE.test(newNickname)) {
      setMessage("Nickname: 3 to 20 characters, using letters, numbers, _ or - only.");
      return;
    }
    if (password.length < 8) {
      setMessage("Password: at least 8 characters.");
      return;
    }
    if (!agreed) {
      setMessage("Please tick the box to confirm you have read the notice.");
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
        setMessage("That nickname is probably already taken. Please try another one.");
      } else if (error.message.toLowerCase().includes("already registered")) {
        setMessage("This email already has an account. Try logging in.");
      } else {
        setMessage(error.message);
      }
      return;
    }
    if (!data.session) {
      setMessage("Account created, but email confirmation is still switched on in Supabase. Tell the site owner.");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) {
      setMessage("Wrong email or password.");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setPassword("");
    setMessage("");
  }

  if (loading) {
    return <main className="mx-auto max-w-md px-6 py-16">Loading...</main>;
  }

  if (user) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="font-display text-3xl font-extrabold">Your account</h1>
        <p className="mt-4">
          You are logged in as <strong>{nickname ?? "..."}</strong>.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-full border-2 border-sea px-6 py-2 text-sm font-semibold text-sea hover:bg-sea hover:text-white"
        >
          Log out
        </button>
      </main>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-deep/25 bg-white px-3 py-2";

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl font-extrabold">
        {mode === "login" ? "Log in" : "Create your account"}
      </h1>

      <form
        onSubmit={mode === "login" ? handleLogin : handleSignUp}
        className="mt-6 space-y-4"
      >
        {mode === "signup" && (
          <div>
            <label htmlFor="nickname" className="block text-sm font-semibold">
              Nickname (shown on the leaderboard if you choose to join it)
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
            Email
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
            Password
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
            <p>
              We store your email, your nickname and your course progress.
              Your email is never shown to other students. The leaderboard is
              off unless you turn it on. For now, a forgotten password cannot
              be reset, so choose one you will remember and do not reuse a
              password from another site.
            </p>
            <label className="mt-3 flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <span>I have read this notice.</span>
            </label>
          </div>
        )}

        {message && <p className="text-sm font-semibold text-red-700">{message}</p>}

        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-sea px-7 py-3 font-semibold text-white hover:bg-deep disabled:opacity-60"
        >
          {busy ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setMessage("");
        }}
        className="mt-6 text-sm font-semibold text-sea underline underline-offset-4"
      >
        {mode === "login"
          ? "No account yet? Create one"
          : "Already have an account? Log in"}
      </button>
    </main>
  );
}