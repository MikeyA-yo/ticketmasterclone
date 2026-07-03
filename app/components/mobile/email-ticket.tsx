"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

type SendResp = {
  ok: boolean;
  to?: string;
  transport?: "smtp" | "ethereal" | "stream";
  previewUrl?: string | null;
  savedTo?: string | null;
  note?: string;
  error?: string;
};

export default function EmailTicket({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [result, setResult] = useState<SendResp | null>(null);

  async function send() {
    if (!to) return;
    setStatus("sending");
    setResult(null);
    try {
      const res = await fetch("/api/send-ticket", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ to, orderId }),
      });
      const data: SendResp = await res.json();
      setResult(data);
      setStatus(data.ok ? "sent" : "error");
    } catch (e) {
      setResult({ ok: false, error: e instanceof Error ? e.message : "Request failed" });
      setStatus("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-black/[0.03]"
      >
        <Mail className="h-5 w-5 shrink-0 text-tm-ink" strokeWidth={1.75} />
        <span className="text-[15px] font-medium text-tm-ink">Email my tickets</span>
      </button>

      {open && (
        <div className="border-t border-tm-line px-4 py-3">
          <div className="flex gap-2">
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="you@email.com"
              className="h-10 flex-1 rounded-md border border-tm-line px-3 text-sm text-tm-ink outline-none focus:border-tm-blue"
            />
            <button
              type="button"
              onClick={send}
              disabled={status === "sending" || !to}
              className="h-10 rounded-md bg-tm-blue px-4 text-sm font-bold text-white transition disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </div>

          {status === "sent" && result && (
            <p className="mt-2 text-sm text-emerald-600">
              ✓ Sent to {result.to}
              {result.previewUrl && (
                <>
                  {" — "}
                  <a
                    href={result.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    open preview
                  </a>
                </>
              )}
              {result.transport === "stream" && (
                <span className="text-tm-ink-soft"> — SMTP unreachable, saved a local .eml</span>
              )}
            </p>
          )}
          {status === "error" && (
            <p className="mt-2 text-sm text-rose-600">Couldn’t send: {result?.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
