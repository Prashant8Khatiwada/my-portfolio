import React, { useState } from "react";
import { Briefcase, Edit2, Trash2 } from "lucide-react";

export default function TimelineTab({
  timeline,
  timelineForm,
  setTimelineForm,
  editingTimelineId,
  setEditingTimelineId,
  saveSimple,
  deleteSimple,
  loadTimeline,
  showToast,
  uiInput,
  uiTextarea,
  uiSelect,
  uiPrimaryBtn,
  uiSecondaryBtn,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJsonAssistant, setShowJsonAssistant] = useState(false);

  const jsonTemplate = {
    year: "Jan 2025 - Sept 2025",
    title: "Senior Engineer",
    company: "Google / Blueneontech",
    description: "Detailed description of role, tech used, accomplishments.",
    type: "work",
    display_order: 0,
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2));
    showToast("JSON Template copied to clipboard!", "success");
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setTimelineForm({
        year: parsed.year || "",
        title: parsed.title || "",
        company: parsed.company || "",
        description: parsed.description || "",
        type: parsed.type || "work",
        display_order: parsed.display_order !== undefined ? Number(parsed.display_order) : 0,
      });
      showToast("JSON applied to form! Review fields and click save.", "success");
      setShowJsonAssistant(false);
      setJsonText("");
    } catch (e) {
      showToast("Invalid JSON syntax. Please check your formatting.", "error");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-card/45 border border-border/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-black/10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            {editingTimelineId ? "Edit Timeline Entry" : "Create Timeline Entry"}
          </h3>
          <button
            type="button"
            onClick={() => setShowJsonAssistant(!showJsonAssistant)}
            className="text-xs font-bold text-primary hover:underline"
          >
            {showJsonAssistant ? "Close JSON Assistant" : "Use JSON Assistant"}
          </button>
        </div>

        {showJsonAssistant && (
          <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">JSON Assistant</span>
              <button
                type="button"
                onClick={copyTemplate}
                className="px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary hover:bg-primary/20 transition-all"
              >
                Copy JSON Schema
              </button>
            </div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Paste generated JSON here..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background/50 text-xs font-mono text-foreground outline-none transition focus:border-primary/60"
            />
            <button
              type="button"
              onClick={applyJson}
              className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow hover:bg-primary/90 transition-all"
            >
              Apply JSON to Form
            </button>
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await saveSimple(
                "timeline",
                editingTimelineId,
                {
                  year: timelineForm.year,
                  title: timelineForm.title,
                  company: timelineForm.company,
                  description: timelineForm.description,
                  type: timelineForm.type,
                  display_order: Number(timelineForm.display_order) || 0,
                },
                () => {
                  setEditingTimelineId(null);
                  setTimelineForm({
                    year: "",
                    title: "",
                    company: "",
                    description: "",
                    type: "work",
                    display_order: 0,
                  });
                },
                loadTimeline,
              );
            } catch (error) {
              showToast(error.message || "Failed to save timeline item.", "error");
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Year / Date Range</label>
            <input
              className={uiInput}
              placeholder="2024 - Present"
              value={timelineForm.year}
              onChange={(e) => setTimelineForm((p) => ({ ...p, year: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Job Title / Qualification</label>
            <input
              className={uiInput}
              placeholder="Software Engineer"
              value={timelineForm.title}
              onChange={(e) => setTimelineForm((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company / Institution</label>
            <input
              className={uiInput}
              placeholder="Acme Corporation"
              value={timelineForm.company}
              onChange={(e) => setTimelineForm((p) => ({ ...p, company: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</label>
            <select
              className={uiSelect}
              value={timelineForm.type}
              onChange={(e) => setTimelineForm((p) => ({ ...p, type: e.target.value }))}
            >
              <option value="work">Professional Work</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Detailed Description</label>
            <textarea
              className={uiTextarea}
              placeholder="Responsibilities and achievements..."
              rows={3}
              value={timelineForm.description}
              onChange={(e) => setTimelineForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4 border-t border-border/30">
            <button className={uiPrimaryBtn} type="submit">
              {editingTimelineId ? "Update Entry" : "Save Entry"}
            </button>
            {editingTimelineId && (
              <button
                type="button"
                onClick={() => {
                  setEditingTimelineId(null);
                  setTimelineForm({
                    year: "",
                    title: "",
                    company: "",
                    description: "",
                    type: "work",
                    display_order: 0,
                  });
                }}
                className={uiSecondaryBtn}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {timeline.map((item) => (
          <div
            key={item.id}
            className="bg-card/35 border border-border/40 rounded-2xl p-5 flex items-start justify-between gap-4 hover:border-primary/30 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    item.type === "work"
                      ? "bg-violet-950/40 border-violet-500/25 text-violet-400"
                      : "bg-cyan-950/40 border-cyan-500/25 text-cyan-400"
                  }`}
                >
                  {item.type}
                </span>
                <span className="text-sm font-semibold text-primary">{item.year}</span>
              </div>
              <h4 className="text-lg font-bold mt-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-medium">{item.company}</p>
              <p className="text-sm text-muted-foreground/80 mt-2 max-w-3xl leading-relaxed">{item.description}</p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                className="p-2 rounded-lg bg-card border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setEditingTimelineId(item.id);
                  setTimelineForm({
                    year: item.year || "",
                    title: item.title || "",
                    company: item.company || "",
                    description: item.description || "",
                    type: item.type || "work",
                    display_order: item.display_order || 0,
                  });
                }}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-lg bg-card border border-border hover:border-red-500/40 hover:bg-red-500/5 text-red-500 transition-colors"
                onClick={async () => {
                  try {
                    await deleteSimple("timeline", item.id, loadTimeline);
                  } catch (error) {
                    showToast(error.message, "error");
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
