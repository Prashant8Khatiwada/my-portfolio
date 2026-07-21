import React from "react";
import { Inbox } from "lucide-react";

export default function MessagesTab({ messages, messageLoading, markMessageRead }) {
  return (
    <div className="bg-card/45 border border-border/40 rounded-2xl p-6 backdrop-blur-xl shadow-xl shadow-black/10">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Inbox className="w-5 h-5 text-primary" />
        Inquiries Inbox
      </h3>

      {messageLoading ? (
        <p className="text-center py-12 text-muted-foreground animate-pulse font-medium">Loading inquiries...</p>
      ) : messages.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground bg-background/20 rounded-xl border border-border/40 font-medium">
          No messages received yet.
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`border rounded-2xl p-5 hover:border-primary/20 transition-colors duration-200 ${
                message.read ? "border-border/40 bg-background/20" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-lg">{message.name || "Unknown Sender"}</h4>
                    {!message.read && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mt-0.5">{message.email}</p>
                </div>

                <div className="flex items-center sm:items-end flex-col gap-2">
                  <span className="text-xs text-muted-foreground/80 font-medium">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                  {!message.read && (
                    <button
                      onClick={() => markMessageRead(message.id)}
                      className="px-3.5 py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 text-xs font-bold transition-all"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground/90 whitespace-pre-wrap leading-relaxed bg-background/40 border border-border/30 rounded-xl p-4">
                {message.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
