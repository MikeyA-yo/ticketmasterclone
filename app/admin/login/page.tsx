import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin, isAdminConfigured } from "../../lib/auth";
import Logo from "../../components/logo";
import LoginForm from "../login-form";

export const metadata: Metadata = { title: "Admin sign in | Ticketmaster" };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-tm-surface px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-tm-ink">
              Admin Console
            </h1>
            <p className="mt-1 text-sm text-tm-ink-soft">
              Sign in to manage ticket listings.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-tm-line bg-white p-6 shadow-card">
          <LoginForm />
          {!isAdminConfigured() && (
            <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Heads up: <code>ADMIN_PASSWORD</code> isn&apos;t set in{" "}
              <code>.env.local</code>, so sign-in will fail until you add it and
              restart the server.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
