import React, { useState } from "react";
import { Sparkles, Edit2, Trash2 } from "lucide-react";

export default function SkillsTab({
  skills,
  skillForm,
  setSkillForm,
  editingSkillId,
  setEditingSkillId,
  saveSimple,
  deleteSimple,
  loadSkills,
  showToast,
  uiInput,
  uiTextarea,
  uiPrimaryBtn,
  uiSecondaryBtn,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJsonAssistant, setShowJsonAssistant] = useState(false);

  const jsonTemplate = {
    name: "TypeScript",
    category: "Languages",
    proficiency: 90,
    description: "Detailed libraries or context here.",
    display_order: 0,
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2));
    showToast("JSON Template copied to clipboard!", "success");
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setSkillForm({
        name: parsed.name || "",
        category: parsed.category || "",
        proficiency: parsed.proficiency !== undefined ? Number(parsed.proficiency) : 80,
        description: parsed.description || "",
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
            <Sparkles className="w-5 h-5 text-primary" />
            {editingSkillId ? "Edit Skill Details" : "Create New Skill"}
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
                "skills",
                editingSkillId,
                {
                  name: skillForm.name,
                  category: skillForm.category,
                  proficiency: Number(skillForm.proficiency) || 80,
                  description: skillForm.description,
                  display_order: Number(skillForm.display_order) || 0,
                },
                () => {
                  setEditingSkillId(null);
                  setSkillForm({
                    name: "",
                    category: "",
                    proficiency: 80,
                    description: "",
                    display_order: 0,
                  });
                },
                loadSkills,
              );
            } catch (error) {
              showToast(error.message || "Failed to save skill.", "error");
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skill Name</label>
            <input
              className={uiInput}
              placeholder="React / PostgreSQL / Git"
              value={skillForm.name}
              onChange={(e) => setSkillForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
            <input
              className={uiInput}
              placeholder="Frontend / Backend / DevOps"
              value={skillForm.category}
              onChange={(e) => setSkillForm((p) => ({ ...p, category: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Proficiency (%)</label>
            <input
              className={uiInput}
              type="number"
              min="0"
              max="100"
              placeholder="90"
              value={skillForm.proficiency}
              onChange={(e) => setSkillForm((p) => ({ ...p, proficiency: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Order</label>
            <input
              className={uiInput}
              type="number"
              placeholder="0"
              value={skillForm.display_order}
              onChange={(e) => setSkillForm((p) => ({ ...p, display_order: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Description / Technologies List
            </label>
            <textarea
              className={uiTextarea}
              placeholder="List specific library names or details..."
              rows={3}
              value={skillForm.description}
              onChange={(e) => setSkillForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4 border-t border-border/30">
            <button className={uiPrimaryBtn} type="submit">
              {editingSkillId ? "Update Skill" : "Save Skill"}
            </button>
            {editingSkillId && (
              <button
                type="button"
                onClick={() => {
                  setEditingSkillId(null);
                  setSkillForm({
                    name: "",
                    category: "",
                    proficiency: 80,
                    description: "",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((item) => (
          <div
            key={item.id}
            className="bg-card/35 border border-border/40 rounded-2xl p-5 flex items-center justify-between hover:border-primary/30 transition-all duration-300"
          >
            <div className="space-y-2 w-full pr-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                  {item.proficiency}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{item.category}</p>
              <p className="text-sm text-muted-foreground/80 line-clamp-1">{item.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-1 overflow-hidden">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${item.proficiency}%` }} />
              </div>
            </div>

            <div className="flex gap-1.5 flex-shrink-0">
              <button
                className="p-2 rounded-lg bg-card border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setEditingSkillId(item.id);
                  setSkillForm({
                    name: item.name || "",
                    category: item.category || "",
                    proficiency: item.proficiency || 80,
                    description: item.description || "",
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
                    await deleteSimple("skills", item.id, loadSkills);
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
