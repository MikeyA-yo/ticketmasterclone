"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initial: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initial);

  return (
    <form action={formAction} className="w-full max-w-sm">
      <label className="mb-1.5 block text-sm font-semibold text-tm-ink">
        Admin password
      </label>
      <input
        type="password"
        name="password"
        autoFocus
        required
        placeholder="••••••••"
        className="h-11 w-full rounded-lg border border-tm-line bg-white px-3.5 text-[15px] text-tm-ink outline-none focus:border-tm-blue focus:ring-2 focus:ring-tm-blue/20"
      />
      {state.error && <p className="mt-2 text-sm text-rose-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 h-11 w-full rounded-full bg-tm-blue text-[15px] font-bold text-white transition hover:bg-tm-blue-dark disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
