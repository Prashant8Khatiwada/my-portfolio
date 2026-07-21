import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function AboutTab({
  profile,
  saveProfile,
  showToast,
  uiInput,
  uiTextarea,
  uiPrimaryBtn,
}) {
  const [form, setForm] = useState({
    about_title: "",
    about_subtitle: "",
    about_description_1: "",
    about_description_2: "",
    stats_experience: "",
    stats_projects: "",
    stats_clients: "",
    stats_technologies: "",
  });

  const [jsonText, setJsonText] = useState("");
  const [showJsonAssistant, setShowJsonAssistant] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        about_title: profile.about_title || "",
        about_subtitle: profile.about_subtitle || "",
        about_description_1: profile.about_description_1 || "",
        about_description_2: profile.about_description_2 || "",
        stats_experience: profile.stats_experience || "",
        stats_projects: profile.stats_projects || "",
        stats_clients: profile.stats_clients || "",
        stats_technologies: profile.stats_technologies || "",
      });
    }
  }, [profile]);

  const jsonTemplate = {
    about_title: "About Me",
    about_subtitle: "Get To Know Me",
    about_description_1: "Detailed bio paragraph 1...",
    about_description_2: "Detailed bio paragraph 2...",
    stats_experience: "3",
    stats_projects: "10",
    stats_clients: "20",
    stats_technologies: "10",
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2));
    showToast("JSON Template copied to clipboard!", "success");
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setForm({
        about_title: parsed.about_title || form.about_title,
        about_subtitle: parsed.about_subtitle || form.about_subtitle,
        about_description_1: parsed.about_description_1 || form.about_description_1,
        about_description_2: parsed.about_description_2 || form.about_description_2,
        stats_experience: parsed.stats_experience || form.stats_experience,
        stats_projects: parsed.stats_projects || form.stats_projects,
        stats_clients: parsed.stats_clients || form.stats_clients,
        stats_technologies: parsed.stats_technologies || form.stats_technologies,
      });
      showToast("JSON applied to form! Review fields and click save.", "success");
      setShowJsonAssistant(false);
      setJsonText("");
    } catch (e) {
      showToast("Invalid JSON syntax. Please check your formatting.", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile(form);
  };

  return (
    <div className="bg-card/45 border border-border/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-black/10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Edit About Section & Profile Stats
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About Title</label>
          <input
            className={uiInput}
            value={form.about_title}
            onChange={(e) => setForm((p) => ({ ...p, about_title: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About Subtitle</label>
          <input
            className={uiInput}
            value={form.about_subtitle}
            onChange={(e) => setForm((p) => ({ ...p, about_subtitle: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stats: Years Experience</label>
          <input
            className={uiInput}
            value={form.stats_experience}
            onChange={(e) => setForm((p) => ({ ...p, stats_experience: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stats: Projects Completed</label>
          <input
            className={uiInput}
            value={form.stats_projects}
            onChange={(e) => setForm((p) => ({ ...p, stats_projects: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stats: Happy Clients</label>
          <input
            className={uiInput}
            value={form.stats_clients}
            onChange={(e) => setForm((p) => ({ ...p, stats_clients: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stats: Technologies</label>
          <input
            className={uiInput}
            value={form.stats_technologies}
            onChange={(e) => setForm((p) => ({ ...p, stats_technologies: e.target.value }))}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About Paragraph 1</label>
          <textarea
            className={uiTextarea}
            rows={3}
            value={form.about_description_1}
            onChange={(e) => setForm((p) => ({ ...p, about_description_1: e.target.value }))}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About Paragraph 2</label>
          <textarea
            className={uiTextarea}
            rows={3}
            value={form.about_description_2}
            onChange={(e) => setForm((p) => ({ ...p, about_description_2: e.target.value }))}
            required
          />
        </div>

        <div className="md:col-span-2 pt-4 border-t border-border/30">
          <button type="submit" className={uiPrimaryBtn}>
            Save About Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
