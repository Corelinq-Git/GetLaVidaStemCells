"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  X,
  PhoneCall,
  PhoneIncoming,
  Mic,
  MicOff,
  MessageCircle,
} from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";
import { cn } from "@/lib/utils";
import { ARIANA_OPEN_EVENT, type ArianaOpenDetail } from "@/lib/ariana";
import { track } from "@/lib/track";
import { normalizePhone } from "@/lib/phone";

type WidgetView =
  | "closed"
  | "menu"
  | "chat"
  | "calling"
  | "callback"
  | "callback-sent";

export default function VoiceAgentWidget() {
  const [view, setView] = useState<WidgetView>("closed");
  const [callStatus, setCallStatus] = useState<"connecting" | "active" | "ended">("connecting");
  const [isMuted, setIsMuted] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackName, setCallbackName] = useState("");
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [callbackError, setCallbackError] = useState<string | null>(null);
  const retellRef = useRef<RetellWebClient | null>(null);

  const chatAgentId = process.env.NEXT_PUBLIC_RETELL_CHAT_AGENT_ID || "";
  // Reuse the public key associated with the WebRTC agent — Retell's
  // hosted chat widget will accept the agent id alone if no public key
  // is required for the agent.
  const chatPublicKey = process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY || "";

  const endCall = useCallback(() => {
    if (retellRef.current) {
      retellRef.current.stopCall();
      retellRef.current = null;
    }
    setCallStatus("ended");
    setTimeout(() => setView("closed"), 1500);
  }, []);

  const startWebCall = useCallback(async () => {
    setView("calling");
    setCallStatus("connecting");

    try {
      const res = await fetch("/api/retell/web-call", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create call");
      const { access_token } = await res.json();

      const client = new RetellWebClient();
      retellRef.current = client;

      client.on("call_started", () => setCallStatus("active"));
      client.on("call_ended", () => endCall());
      client.on("error", () => endCall());

      await client.startCall({ accessToken: access_token });
    } catch {
      setCallStatus("ended");
      setTimeout(() => setView("menu"), 1500);
    }
  }, [endCall]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retellRef.current) {
        retellRef.current.stopCall();
      }
    };
  }, []);

  // Global event listener so any element on the page can call
  // openAriana("menu" | "chat" | "calling" | "callback") to open the widget.
  useEffect(() => {
    function handleOpen(event: Event) {
      const detail = (event as CustomEvent<ArianaOpenDetail>).detail;
      const mode = detail?.mode ?? "menu";
      if (mode === "calling") {
        void startWebCall();
      } else {
        setView(mode);
      }
    }
    window.addEventListener(ARIANA_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(ARIANA_OPEN_EVENT, handleOpen);
  }, [startWebCall]);

  function toggleMute() {
    if (!retellRef.current) return;
    if (isMuted) {
      retellRef.current.unmute();
    } else {
      retellRef.current.mute();
    }
    setIsMuted(!isMuted);
  }

  async function requestCallback() {
    const phoneCheck = normalizePhone(callbackPhone);
    if (!phoneCheck.valid) {
      setCallbackError(phoneCheck.error || "Please enter a valid phone number");
      return;
    }
    const e164 = phoneCheck.e164!;

    setCallbackLoading(true);
    setCallbackError(null);

    try {
      const res = await fetch("/api/retell/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e164, name: callbackName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to request callback");
      }

      track("callback_requested", { source: "widget_form" });
      setView("callback-sent");
    } catch (err) {
      setCallbackError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCallbackLoading(false);
    }
  }

  const chatEmbedSrc = chatAgentId
    ? `/chat-embed.html?agent_id=${encodeURIComponent(chatAgentId)}` +
      (chatPublicKey ? `&public_key=${encodeURIComponent(chatPublicKey)}` : "") +
      `&bot_name=Ariana&title=${encodeURIComponent("La Vida")}&color=${encodeURIComponent("#0E2A47")}`
    : "";

  return (
    <>
      {/* Floating trigger button + delayed nudge bubble */}
      <AnimatePresence>
        {view === "closed" && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Nudge speech bubble — appears after a short delay */}
            <motion.button
              type="button"
              onClick={() => setView("menu")}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ delay: 3.5, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative max-w-[260px] rounded-2xl bg-white text-ocean-deepest shadow-2xl shadow-black/20 border border-gray-100 px-4 py-3 text-sm text-left cursor-pointer hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              aria-label="Open chat with Ariana"
            >
              <span className="block font-semibold text-ocean-deepest leading-tight">
                Have a question?
              </span>
              <span className="block text-xs text-gray-500 leading-snug mt-0.5">
                Ask Ariana — she&apos;s here.
              </span>
              {/* Speech-bubble tail */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 right-7 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45"
              />
            </motion.button>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setView("menu")}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-seafoam-dark text-white shadow-lg shadow-seafoam-dark/40 transition-colors hover:bg-ocean-dark cursor-pointer"
              aria-label="Talk to Ariana, our AI assistant"
            >
              {/* Pulse ring */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-seafoam-dark/40 animate-ping"
                style={{ animationDuration: "2.4s" }}
              />
              <MessageCircle className="relative h-6 w-6" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Widget panel */}
      <AnimatePresence>
        {view !== "closed" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className={cn(
              "fixed bottom-6 right-6 z-50 rounded-2xl bg-white shadow-2xl shadow-black/15 border border-gray-200 overflow-hidden flex flex-col",
              view === "chat"
                ? "w-[360px] h-[560px] max-h-[calc(100vh-3rem)]"
                : "w-[340px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-ocean-deepest px-5 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-seafoam/25 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-seafoam-dark" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">Ariana</p>
                  <p className="text-xs text-cream-muted">La Vida AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {view !== "menu" && view !== "callback-sent" && (
                  <button
                    onClick={() => {
                      if (view === "calling") endCall();
                      setView("menu");
                    }}
                    className="text-xs text-cream/60 hover:text-cream transition-colors cursor-pointer"
                    aria-label="Back to options"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (view === "calling") endCall();
                    setView("closed");
                  }}
                  className="text-cream/50 hover:text-cream transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Menu view */}
            {view === "menu" && (
              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-600 mb-4">
                  Hi! I&apos;m Ariana. I can answer questions about our stem cell treatments, pricing, and process.
                </p>

                <button
                  onClick={() => {
                    track("chat_opened", { source: "widget_menu" });
                    setView("chat");
                  }}
                  className="w-full flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-ocean hover:bg-ocean/5 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-seafoam/15 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-seafoam-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ocean-deepest">Chat with Ariana</p>
                    <p className="text-xs text-gray-500">Type your questions and get instant answers</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    track("talk_now_started", { source: "widget_menu" });
                    void startWebCall();
                  }}
                  className="w-full flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-ocean hover:bg-ocean/5 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-seafoam/15 flex items-center justify-center shrink-0">
                    <PhoneCall className="h-5 w-5 text-seafoam-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ocean-deepest">Talk Now</p>
                    <p className="text-xs text-gray-500">Speak with Ariana live in your browser</p>
                  </div>
                </button>

                <button
                  onClick={() => setView("callback")}
                  className="w-full flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-ocean hover:bg-ocean/5 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-seafoam/10 flex items-center justify-center shrink-0">
                    <PhoneIncoming className="h-5 w-5 text-seafoam-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ocean-deepest">Request a Callback</p>
                    <p className="text-xs text-gray-500">Ariana will call you for a qualification chat</p>
                  </div>
                </button>
              </div>
            )}

            {/* Chat view — Retell hosted chat in iframe */}
            {view === "chat" && (
              <div className="flex-1 bg-white overflow-hidden">
                {chatEmbedSrc ? (
                  <iframe
                    src={chatEmbedSrc}
                    title="Chat with Ariana"
                    className="w-full h-full border-0"
                    allow="clipboard-write"
                  />
                ) : (
                  <div className="p-6 text-sm text-gray-600">
                    <p className="font-semibold text-ocean-deepest mb-2">Chat not configured</p>
                    <p>
                      Set <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_RETELL_CHAT_AGENT_ID</code> to enable chat.
                      In the meantime, try Talk Now or request a callback.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Active call view */}
            {view === "calling" && (
              <div className="p-5 text-center">
                {/* Pulsing indicator */}
                <div className="relative mx-auto w-20 h-20 mb-4">
                  {callStatus === "active" && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-seafoam/25"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <div className={cn(
                    "relative w-20 h-20 rounded-full flex items-center justify-center",
                    callStatus === "connecting" ? "bg-gray-100" : callStatus === "active" ? "bg-seafoam/15" : "bg-gray-100"
                  )}>
                    <Phone className={cn(
                      "h-8 w-8",
                      callStatus === "active" ? "text-seafoam-dark" : "text-gray-400"
                    )} />
                  </div>
                </div>

                <p className="text-sm font-semibold text-ocean-deepest">
                  {callStatus === "connecting" && "Connecting to Ariana..."}
                  {callStatus === "active" && "Speaking with Ariana"}
                  {callStatus === "ended" && "Call ended"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {callStatus === "active" && "Ask about treatments, pricing, or next steps"}
                </p>

                {callStatus === "active" && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={toggleMute}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer",
                        isMuted ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={endCall}
                      className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                      aria-label="End call"
                    >
                      <Phone className="h-5 w-5 rotate-[135deg]" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Callback form */}
            {view === "callback" && (
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4">
                  Enter your number and Ariana will call you to discuss your treatment options.
                </p>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="Phone number"
                    aria-invalid={!!callbackError}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
                      callbackError
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-ocean"
                    }`}
                  />

                  {callbackError && (
                    <p className="text-xs text-red-600">{callbackError}</p>
                  )}

                  <button
                    onClick={requestCallback}
                    disabled={!callbackPhone || callbackLoading}
                    className="w-full py-2.5 rounded-lg bg-ocean text-white text-sm font-semibold transition-colors hover:bg-ocean-dark disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {callbackLoading ? "Requesting..." : "Call Me"}
                  </button>

                  <button
                    onClick={() => setView("menu")}
                    className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    Back to options
                  </button>
                </div>
              </div>
            )}

            {/* Callback confirmation */}
            {view === "callback-sent" && (
              <div className="p-5 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-seafoam/20">
                  <PhoneIncoming className="h-6 w-6 text-seafoam-dark" />
                </div>
                <p className="text-sm font-semibold text-ocean-deepest">Callback Requested!</p>
                <p className="text-xs text-gray-500 mt-1">
                  Ariana will call you shortly at {callbackPhone}
                </p>
                <button
                  onClick={() => {
                    setView("closed");
                    setCallbackPhone("");
                    setCallbackName("");
                  }}
                  className="mt-4 text-xs text-seafoam-dark hover:text-ocean-dark transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
