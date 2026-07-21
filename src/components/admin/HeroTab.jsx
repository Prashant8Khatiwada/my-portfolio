import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import {
  adminCard, adminInput, adminTextarea, adminPrimaryBtn, adminLabel,
  JsonAssistantPanel, AdminPanelHeader,
} from "./adminUI.jsx";

export default function HeroTab({ profile, saveProfile, showToast }) {
  const [form, setForm] = useState({
    name: "", title: "", description: "", availability_status: "",
    github_url: "", linkedin_url: "", email: "",
  });
  const [jsonText, setJsonText] = useState("");
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      name: profile.name || "",
      title: profile.title || "",
      description: profile.description || "",
      availability_status: profile.availability_status || "",
      github_url: profile.github_url || "",
      linkedin_url: profile.linkedin_url || "",
      email: profile.email || "",
    });
  }, [profile]);

  const jsonTemplate = { name: "Prashant Khatiwada", title: "Frontend Developer", description: "...", availability_status: "Available for freelance work", github_url: "https://github.com/...", linkedin_url: "https://linkedin.com/in/...", email: "email@example.com" };

  const applyJson = () => {
    try {
      const p = JSON.parse(jsonText);
      setForm(f => ({ ...f, ...Object.fromEntries(Object.entries(p).filter(([k]) => k in f)) }));
      showToast("JSON applied — review and save.", "success");
      setShowJson(false); setJsonText("");
    } catch { showToast("Invalid JSON format.", "error"); }
  };

  const fields = [
    { key: "name", label: "Developer Name", placeholder: "Prashant Khatiwada" },
    { key: "title", label: "Professional Title", placeholder: "Frontend Developer" },
    { key: "availability_status", label: "Availability Status", placeholder: "Available for freelance work" },
    { key: "email", label: "Email Contact", placeholder: "you@example.com", type: "email" },
    { key: "github_url", label: "GitHub URL", placeholder: "https://github.com/...", type: "url" },
    { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/...", type: "url" },
  ];

  return (
    <div className={adminCard}>
      <AdminPanelHeader
        icon={Sparkles}
        title="Hero Section"
        color="text-indigo-400"
        right={
          <JsonAssistantPanel
            show={showJson} onToggle={() => setShowJson(s => !s)}
            jsonText={jsonText} setJsonText={setJsonText}
            onCopy={() => { navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2)); showToast("Schema copied!", "success"); }}
            onApply={applyJson}
          />
        }
      />

      <form onSubmit={(e) => { e.preventDefault(); saveProfile(form); }} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map(({ key, label, placeholder, type = "text" }) => (
            <div key={key}>
              <label className={adminLabel}>{label}</label>
              <input
                type={type}
                className={adminInput}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                required={key === "name" || key === "title"}
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className={adminLabel}>Short Introduction</label>
            <textarea
              className={adminTextarea}
              rows={5}
              placeholder="I'm a developer who..."
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button type="submit" className={adminPrimaryBtn}>
            <Sparkles className="w-3.5 h-3.5" />
            Save Hero Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
