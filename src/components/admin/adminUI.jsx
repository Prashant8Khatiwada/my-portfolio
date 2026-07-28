/**
 * Shared UI primitive class strings for Admin form components.
 * Import and use these to keep all admin tabs visually consistent.
 */

export const adminInput =
  "w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-background/80 focus:ring-1 focus:ring-primary/10";

export const adminTextarea =
  "w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-background/80 focus:ring-1 focus:ring-primary/10 resize-none";

export const adminSelect =
  "w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm outline-none transition-all duration-200 focus:border-primary/50 cursor-pointer";

export const adminPrimaryBtn =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95";

export const adminSecondaryBtn =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted/55 border border-border hover:bg-muted text-foreground text-sm font-medium transition-all duration-200 active:scale-95";

export const adminDangerBtn =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 text-destructive text-sm font-medium transition-all duration-200";

/** Shared Card Shell */
export const adminCard = "rounded-2xl border border-border bg-card p-6 shadow-sm";

/** Section heading */
export const adminSectionTitle = "text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-4";

/** Form label */
export const adminLabel = "block text-[11px] font-bold text-muted-foreground mb-1.5 uppercase tracking-wider";

/** JSON Assistant panel */
export function JsonAssistantPanel({ show, onToggle, jsonText, setJsonText, onCopy, onApply }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        {show ? "↑ Close JSON Assistant" : "⚡ JSON Assistant"}
      </button>
      {show && (
        <div className="mt-3 p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Paste JSON</span>
            <button
              type="button"
              onClick={onCopy}
              className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary hover:bg-primary/20 transition-all"
            >
              Copy Schema
            </button>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder="Paste generated JSON here..."
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition resize-none"
          />
          <button
            type="button"
            onClick={onApply}
            className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-all duration-200"
          >
            Apply to Form
          </button>
        </div>
      )}
    </div>
  );
}

/** Reusable action icon buttons */
export function EditBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/40 border border-border hover:bg-primary/10 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-200"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  );
}

export function DeleteBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/40 border border-border hover:bg-destructive/10 hover:border-destructive/30 text-muted-foreground hover:text-destructive transition-all duration-200"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}

/** Card panel header */
export function AdminPanelHeader({ icon: Icon, title, color = "text-primary", right }) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-muted border border-border`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
      </div>
      {right}
    </div>
  );
}
