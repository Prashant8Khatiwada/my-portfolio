import React, { useState } from "react";
import { Briefcase } from "lucide-react";
import {
  adminCard, adminInput, adminTextarea, adminSelect, adminPrimaryBtn, adminSecondaryBtn, adminLabel,
  JsonAssistantPanel, AdminPanelHeader, EditBtn, DeleteBtn,
} from "./adminUI.jsx";

export default function TimelineTab({
  timeline, timelineForm, setTimelineForm,
  editingTimelineId, setEditingTimelineId,
  saveSimple, deleteSimple, loadTimeline, showToast,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJson, setShowJson] = useState(false);

  const jsonTemplate = { year: "Jan 2025 - Sept 2025", title: "Senior Engineer", company: "Acme Corp", description: "Role details...", type: "work", display_order: 0 };

  const applyJson = () => {
    try {
      const p = JSON.parse(jsonText);
      setTimelineForm({ year: p.year || "", title: p.title || "", company: p.company || "", description: p.description || "", type: p.type || "work", display_order: p.display_order !== undefined ? Number(p.display_order) : 0 });
      showToast("JSON applied — review and save.", "success");
      setShowJson(false); setJsonText("");
    } catch { showToast("Invalid JSON.", "error"); }
  };

  const resetForm = () => { setEditingTimelineId(null); setTimelineForm({ year: "", title: "", company: "", description: "", type: "work", display_order: 0 }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveSimple("timeline", editingTimelineId, { year: timelineForm.year, title: timelineForm.title, company: timelineForm.company, description: timelineForm.description, type: timelineForm.type, display_order: Number(timelineForm.display_order) || 0 }, resetForm, loadTimeline);
    } catch (err) { showToast(err.message || "Failed to save.", "error"); }
  };

  const typeStyles = {
    work: { dot: "bg-violet-500", badge: "bg-violet-500/10 border-violet-500/20 text-violet-400", label: "Work" },
    education: { dot: "bg-cyan-500", badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400", label: "Education" },
  };

  const bullets = timelineForm.description ? timelineForm.description.split("\n") : [""];

  const handleBulletChange = (index, value) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    setTimelineForm(f => ({ ...f, description: newBullets.join("\n") }));
  };

  const addBullet = () => {
    const newBullets = [...bullets, ""];
    setTimelineForm(f => ({ ...f, description: newBullets.join("\n") }));
  };

  const removeBullet = (index) => {
    const newBullets = bullets.filter((_, i) => i !== index);
    setTimelineForm(f => ({ ...f, description: newBullets.join("\n") }));
  };

  return (
    <div className="space-y-6">
      <div className={adminCard}>
        <AdminPanelHeader
          icon={Briefcase}
          title={editingTimelineId ? "Edit Entry" : "Add Timeline Entry"}
          color="text-orange-400"
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
              <label className={adminLabel}>Year / Date Range</label>
              <input className={adminInput} placeholder="2024 – Present" value={timelineForm.year} onChange={(e) => setTimelineForm(f => ({ ...f, year: e.target.value }))} required />
            </div>
            <div>
              <label className={adminLabel}>Type</label>
              <select className={adminSelect} value={timelineForm.type} onChange={(e) => setTimelineForm(f => ({ ...f, type: e.target.value }))}>
                <option value="work">Professional Work</option>
                <option value="education">Education</option>
              </select>
            </div>
            <div>
              <label className={adminLabel}>Job Title / Qualification</label>
              <input className={adminInput} placeholder="Software Engineer" value={timelineForm.title} onChange={(e) => setTimelineForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div>
              <label className={adminLabel}>Company / Institution</label>
              <input className={adminInput} placeholder="Acme Corporation" value={timelineForm.company} onChange={(e) => setTimelineForm(f => ({ ...f, company: e.target.value }))} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <div className="flex justify-between items-center">
                <label className={adminLabel}>Description / Responsibility Bullets</label>
                <button
                  type="button"
                  onClick={addBullet}
                  className="text-xs px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all font-semibold"
                >
                  + Add Point
                </button>
              </div>
              <div className="space-y-2">
                {bullets.map((bulletText, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span className="text-muted-foreground/60 text-xs w-4 flex-shrink-0 text-right">{index + 1}.</span>
                    <input
                      className={adminInput}
                      placeholder={`Detail point #${index + 1}...`}
                      value={bulletText}
                      onChange={(e) => handleBulletChange(index, e.target.value)}
                    />
                    {bullets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBullet(index)}
                        className="p-2 text-muted-foreground hover:text-rose-500 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className={adminPrimaryBtn}><Briefcase className="w-3.5 h-3.5" />{editingTimelineId ? "Update Entry" : "Add Entry"}</button>
            {editingTimelineId && <button type="button" onClick={resetForm} className={adminSecondaryBtn}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Timeline list */}
      {timeline.length > 0 && (
        <div className="relative space-y-3">
          {timeline.map((item) => {
            const s = typeStyles[item.type] || typeStyles.work;
            return (
              <div key={item.id} className="group flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-4 transition-all duration-200">
                <div className="flex-shrink-0 flex flex-col items-center pt-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.dot} shadow-lg`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${s.badge}`}>{s.label}</span>
                    <span className="text-xs font-semibold text-white/50">{item.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-white/40 mt-0.5">{item.company}</p>
                  {item.description && <p className="text-xs text-white/30 mt-2 leading-relaxed line-clamp-2">{item.description}</p>}
                </div>
                <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <EditBtn onClick={() => { setEditingTimelineId(item.id); setTimelineForm({ year: item.year || "", title: item.title || "", company: item.company || "", description: item.description || "", type: item.type || "work", display_order: item.display_order || 0 }); }} />
                  <DeleteBtn onClick={async () => { try { await deleteSimple("timeline", item.id, loadTimeline); } catch (err) { showToast(err.message, "error"); } }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
