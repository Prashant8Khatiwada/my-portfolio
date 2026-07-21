import React from "react";
import { Inbox, Mail, CheckCheck } from "lucide-react";

export default function MessagesTab({ messages, messageLoading, markMessageRead }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
          <Inbox className="w-4 h-4 text-rose-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Inquiries Inbox</h3>
          <p className="text-xs text-white/30">{messages.length} message{messages.length !== 1 ? "s" : ""} total</p>
        </div>
      </div>

      {messageLoading ? (
        <div className="py-16 text-center text-white/20 animate-pulse text-sm">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="py-16 rounded-xl border border-white/5 flex flex-col items-center gap-3 text-white/20">
          <Mail className="w-8 h-8" />
          <p className="text-sm">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <article
              key={msg.id}
              className={`rounded-xl border p-5 transition-all duration-200 ${
                msg.read
                  ? "border-white/5 bg-white/[0.02]"
                  : "border-violet-500/20 bg-violet-500/5"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-sm font-bold text-white/50 flex-shrink-0">
                    {(msg.name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{msg.name || "Unknown Sender"}</h4>
                      {!msg.read && (
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-violet-500/15 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/35 mt-0.5">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <span className="text-[10px] text-white/20">{new Date(msg.created_at).toLocaleString()}</span>
                  {!msg.read && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/8 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400 text-white/50 transition-all duration-200"
                    >
                      <CheckCheck className="w-3 h-3" />
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-1 rounded-lg bg-white/3 border border-white/5 p-3">
                <p className="text-xs text-white/50 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
