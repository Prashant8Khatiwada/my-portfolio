import React, { useState } from "react";
import { Layers } from "lucide-react";
import {
  adminCard, adminInput, adminTextarea, adminPrimaryBtn, adminSecondaryBtn, adminLabel,
  JsonAssistantPanel, AdminPanelHeader, EditBtn, DeleteBtn,
} from "./adminUI.jsx";

export default function SkillsTab({
  skills, skillForm, setSkillForm,
  editingSkillId, setEditingSkillId,
  saveSimple, deleteSimple, loadSkills, showToast,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJson, setShowJson] = useState(false);

  const jsonTemplate = { name: "TypeScript", category: "Languages", proficiency: 90, description: "...", display_order: 0 };

  const applyJson = () => {
    try {
      const p = JSON.parse(jsonText);
      setSkillForm({ name: p.name || "", category: p.category || "", proficiency: p.proficiency !== undefined ? Number(p.proficiency) : 80, description: p.description || "", display_order: p.display_order !== undefined ? Number(p.display_order) : 0 });
      showToast("JSON applied — review and save.", "success");
      setShowJson(false); setJsonText("");
    } catch { showToast("Invalid JSON.", "error"); }
  };

  const resetForm = () => { setEditingSkillId(null); setSkillForm({ name: "", category: "", proficiency: 80, description: "", display_order: 0 }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveSimple("skills", editingSkillId, { name: skillForm.name, category: skillForm.category, proficiency: Number(skillForm.proficiency) || 80, description: skillForm.description, display_order: Number(skillForm.display_order) || 0 }, resetForm, loadSkills);
    } catch (err) { showToast(err.message || "Failed to save.", "error"); }
  };

  const profColor = (p) => p >= 85 ? "from-emerald-500 to-emerald-400" : p >= 65 ? "from-violet-500 to-violet-400" : "from-amber-500 to-amber-400";

  return (
    <div className="space-y-6">
      {/* Form card */}
      <div className={adminCard}>
        <AdminPanelHeader
          icon={Layers}
          title={editingSkillId ? "Edit Skill" : "Add New Skill"}
          color="text-cyan-400"
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
              <label className={adminLabel}>Skill Name</label>
              <input className={adminInput} placeholder="React / PostgreSQL / Git" value={skillForm.name} onChange={(e) => setSkillForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label className={adminLabel}>Category</label>
              <input className={adminInput} placeholder="Frontend / Backend / DevOps" value={skillForm.category} onChange={(e) => setSkillForm(f => ({ ...f, category: e.target.value }))} />
            </div>
            <div>
              <label className={adminLabel}>Proficiency (%)</label>
              <input className={adminInput} type="number" min="0" max="100" placeholder="90" value={skillForm.proficiency} onChange={(e) => setSkillForm(f => ({ ...f, proficiency: e.target.value }))} />
            </div>
            <div>
              <label className={adminLabel}>Display Order</label>
              <input className={adminInput} type="number" placeholder="0" value={skillForm.display_order} onChange={(e) => setSkillForm(f => ({ ...f, display_order: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={adminLabel}>Description / Technologies</label>
              <textarea className={adminTextarea} placeholder="List specific library names or context..." rows={3} value={skillForm.description} onChange={(e) => setSkillForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className={adminPrimaryBtn}>
              <Layers className="w-3.5 h-3.5" />
              {editingSkillId ? "Update Skill" : "Add Skill"}
            </button>
            {editingSkillId && (
              <button type="button" onClick={resetForm} className={adminSecondaryBtn}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* Skills list */}
      {skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((item) => (
            <div key={item.id} className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-4 transition-all duration-200">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                  <span className="text-xs font-bold text-white/60 flex-shrink-0">{item.proficiency}%</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-white/30">{item.category}</p>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-1 rounded-full bg-gradient-to-r ${profColor(item.proficiency)} transition-all duration-500`} style={{ width: `${item.proficiency}%` }} />
                </div>
                {item.description && <p className="text-xs text-white/30 truncate">{item.description}</p>}
              </div>
              <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <EditBtn onClick={() => { setEditingSkillId(item.id); setSkillForm({ name: item.name || "", category: item.category || "", proficiency: item.proficiency || 80, description: item.description || "", display_order: item.display_order || 0 }); }} />
                <DeleteBtn onClick={async () => { try { await deleteSimple("skills", item.id, loadSkills); } catch (err) { showToast(err.message, "error"); } }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
