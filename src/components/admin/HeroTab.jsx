import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function HeroTab({
  profile,
  saveProfile,
  showToast,
  uiInput,
  uiTextarea,
  uiPrimaryBtn,
}) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    availability_status: "",
    github_url: "",
    linkedin_url: "",
    email: "",
  });

  const [jsonText, setJsonText] = useState("");
  const [showJsonAssistant, setShowJsonAssistant] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        title: profile.title || "",
        description: profile.description || "",
        availability_status: profile.availability_status || "",
        github_url: profile.github_url || "",
        linkedin_url: profile.linkedin_url || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const jsonTemplate = {
    name: "Prashant Khatiwada",
    title: "Frontend Developer",
    description: "Detailed summary about developer...",
    availability_status: "Available for freelance work",
    github_url: "https://github.com/...",
    linkedin_url: "https://linkedin.com/in/...",
    email: "email@example.com",
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2));
    showToast("JSON Template copied to clipboard!", "success");
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setForm({
        name: parsed.name || form.name,
        title: parsed.title || form.title,
        description: parsed.description || form.description,
        availability_status: parsed.availability_status || form.availability_status,
        github_url: parsed.github_url || form.github_url,
        linkedin_url: parsed.linkedin_url || form.linkedin_url,
        email: parsed.email || form.email,
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
          Edit Hero Section Settings
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
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Developer Name</label>
          <input
            className={uiInput}
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Professional Title</label>
          <input
            className={uiInput}
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Availability Status</label>
          <input
            className={uiInput}
            value={form.availability_status}
            onChange={(e) => setForm((p) => ({ ...p, availability_status: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Contact</label>
          <input
            className={uiInput}
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">GitHub Profile Link</label>
          <input
            className={uiInput}
            type="url"
            value={form.github_url}
            onChange={(e) => setForm((p) => ({ ...p, github_url: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">LinkedIn Profile Link</label>
          <input
            className={uiInput}
            type="url"
            value={form.linkedin_url}
            onChange={(e) => setForm((p) => ({ ...p, linkedin_url: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Short Introduction</label>
          <textarea
            className={uiTextarea}
            rows={4}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2 pt-4 border-t border-border/30">
          <button type="submit" className={uiPrimaryBtn}>
            Save Hero Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
