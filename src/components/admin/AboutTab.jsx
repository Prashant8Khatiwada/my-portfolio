import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import {
  adminCard, adminInput, adminTextarea, adminPrimaryBtn, adminLabel,
  JsonAssistantPanel, AdminPanelHeader,
} from "./adminUI.jsx";

export default function AboutTab({ profile, saveProfile, showToast, projectsCount = 0 }) {
  const [form, setForm] = useState({
    about_title: "", about_subtitle: "",
    about_description_1: "", about_description_2: "",
    stats_experience: "", stats_projects: "", stats_clients: "", stats_technologies: "",
  });
  const [jsonText, setJsonText] = useState("");
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    if (profile) {
      const isValidDate = profile.stats_experience && profile.stats_experience.includes("-");
      setForm({
        about_title: profile.about_title || "",
        about_subtitle: profile.about_subtitle || "",
        about_description_1: profile.about_description_1 || "",
        about_description_2: profile.about_description_2 || "",
        stats_experience: isValidDate ? profile.stats_experience : "",
        stats_projects: profile.stats_projects || "",
        stats_clients: profile.stats_clients || "",
        stats_technologies: profile.stats_technologies || "",
      });
    }
  }, [profile]);

  const jsonTemplate = {
    about_title: "About Me", about_subtitle: "Get To Know Me",
    about_description_1: "Bio paragraph 1...", about_description_2: "Bio paragraph 2...",
    stats_experience: "2023-01-01", stats_projects: "10", stats_clients: "20", stats_technologies: "10",
  };

  const applyJson = () => {
    try {
      const p = JSON.parse(jsonText);
      setForm(f => ({ ...f, ...Object.fromEntries(Object.entries(p).filter(([k]) => k in f)) }));
      showToast("JSON applied — review and save.", "success");
      setShowJson(false); setJsonText("");
    } catch { showToast("Invalid JSON format.", "error"); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile({
      ...form,
      stats_projects: String(projectsCount),
    });
  };

  const statsFields = [
    { key: "stats_experience", label: "Career Start Date", type: "date" },
    { key: "stats_projects", label: "Projects Completed (Auto)", disabled: true, value: projectsCount },
    { key: "stats_clients", label: "Happy Clients" },
    { key: "stats_technologies", label: "Technologies" },
  ];

  return (
    <div className={adminCard}>
      <AdminPanelHeader
        icon={User}
        title="About Section & Stats"
        color="text-sky-400"
        right={
          <JsonAssistantPanel
            show={showJson} onToggle={() => setShowJson(s => !s)}
            jsonText={jsonText} setJsonText={setJsonText}
            onCopy={() => { navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2)); showToast("Schema copied!", "success"); }}
            onApply={applyJson}
          />
        }
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={adminLabel}>About Title</label>
            <input className={adminInput} placeholder="About Me" value={form.about_title} onChange={(e) => setForm(f => ({ ...f, about_title: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabel}>About Subtitle</label>
            <input className={adminInput} placeholder="Get To Know Me" value={form.about_subtitle} onChange={(e) => setForm(f => ({ ...f, about_subtitle: e.target.value }))} required />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabel}>Bio Paragraph 1</label>
            <textarea className={adminTextarea} rows={4} placeholder="First bio paragraph..." value={form.about_description_1} onChange={(e) => setForm(f => ({ ...f, about_description_1: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <label className={adminLabel}>Bio Paragraph 2</label>
            <textarea className={adminTextarea} rows={4} placeholder="Second bio paragraph..." value={form.about_description_2} onChange={(e) => setForm(f => ({ ...f, about_description_2: e.target.value }))} />
          </div>
        </div>

        {/* Stats section */}
        <div className="border-t border-white/5 pt-5">
          <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Stats Counters</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsFields.map(({ key, label, type, disabled, value }) => (
              <div key={key}>
                <label className={adminLabel}>{label}</label>
                <input
                  type={type || "text"}
                  disabled={disabled}
                  className={`${adminInput} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  placeholder="0"
                  value={value !== undefined ? value : form[key]}
                  onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button type="submit" className={adminPrimaryBtn}>
            <User className="w-3.5 h-3.5" />
            Save About Section
          </button>
        </div>
      </form>
    </div>
  );
}
