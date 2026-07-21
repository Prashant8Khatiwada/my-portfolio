import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import {
  adminCard, adminInput, adminTextarea, adminPrimaryBtn, adminSecondaryBtn, adminLabel,
  JsonAssistantPanel, AdminPanelHeader, EditBtn, DeleteBtn,
} from "./adminUI.jsx";

export default function TestimonialsTab({
  testimonials, testimonialForm, setTestimonialForm,
  editingTestimonialId, setEditingTestimonialId,
  saveSimple, deleteSimple, loadTestimonials, showToast,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJson, setShowJson] = useState(false);

  const jsonTemplate = { name: "John Doe", role: "Engineering Manager", company: "Acme Corp", content: "Fantastic job!", rating: 5, display_order: 0, active: true };

  const applyJson = () => {
    try {
      const p = JSON.parse(jsonText);
      setTestimonialForm({ name: p.name || "", role: p.role || "", company: p.company || "", content: p.content || "", rating: p.rating !== undefined ? Number(p.rating) : 5, display_order: p.display_order !== undefined ? Number(p.display_order) : 0, active: p.active !== undefined ? Boolean(p.active) : true });
      showToast("JSON applied — review and save.", "success");
      setShowJson(false); setJsonText("");
    } catch { showToast("Invalid JSON.", "error"); }
  };

  const resetForm = () => { setEditingTestimonialId(null); setTestimonialForm({ name: "", role: "", company: "", content: "", rating: 5, display_order: 0, active: true }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveSimple("testimonials", editingTestimonialId, { name: testimonialForm.name, role: testimonialForm.role, company: testimonialForm.company, content: testimonialForm.content, rating: Number(testimonialForm.rating) || 5, display_order: Number(testimonialForm.display_order) || 0, active: Boolean(testimonialForm.active) }, resetForm, loadTestimonials);
    } catch (err) { showToast(err.message || "Failed to save.", "error"); }
  };

  return (
    <div className="space-y-6">
      <div className={adminCard}>
        <AdminPanelHeader
          icon={MessageSquare}
          title={editingTestimonialId ? "Edit Testimonial" : "Add Testimonial"}
          color="text-pink-400"
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
              <label className={adminLabel}>Client Name</label>
              <input className={adminInput} placeholder="Jane Doe" value={testimonialForm.name} onChange={(e) => setTestimonialForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label className={adminLabel}>Role / Position</label>
              <input className={adminInput} placeholder="CTO / Founder" value={testimonialForm.role} onChange={(e) => setTestimonialForm(f => ({ ...f, role: e.target.value }))} required />
            </div>
            <div>
              <label className={adminLabel}>Company</label>
              <input className={adminInput} placeholder="Company name" value={testimonialForm.company} onChange={(e) => setTestimonialForm(f => ({ ...f, company: e.target.value }))} />
            </div>
            <div>
              <label className={adminLabel}>Rating (1–5)</label>
              <input className={adminInput} type="number" min="1" max="5" placeholder="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm(f => ({ ...f, rating: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={adminLabel}>Testimonial Content</label>
              <textarea className={adminTextarea} rows={4} placeholder="Client feedback..." value={testimonialForm.content} onChange={(e) => setTestimonialForm(f => ({ ...f, content: e.target.value }))} required />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={testimonialForm.active}
                onClick={() => setTestimonialForm(f => ({ ...f, active: !f.active }))}
                className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0 ${testimonialForm.active ? "bg-violet-600" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform duration-200 ${testimonialForm.active ? "translate-x-4.5" : "translate-x-0"}`} />
              </button>
              <span className="text-xs font-medium text-white/50">{testimonialForm.active ? "Visible on portfolio" : "Hidden (draft)"}</span>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className={adminPrimaryBtn}><MessageSquare className="w-3.5 h-3.5" />{editingTestimonialId ? "Update" : "Add Testimonial"}</button>
            {editingTestimonialId && <button type="button" onClick={resetForm} className={adminSecondaryBtn}>Cancel</button>}
          </div>
        </form>
      </div>

      {testimonials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((item) => (
            <div key={item.id} className="group relative rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-5 transition-all duration-200">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-xs text-white/35 mt-0.5">{item.role}{item.company ? ` · ${item.company}` : ""}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.active ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/10 text-white/30"}`}>
                    {item.active ? "Live" : "Draft"}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditBtn onClick={() => { setEditingTestimonialId(item.id); setTestimonialForm({ name: item.name || "", role: item.role || "", company: item.company || "", content: item.content || "", rating: item.rating || 5, display_order: item.display_order || 0, active: item.active !== false }); }} />
                    <DeleteBtn onClick={async () => { try { await deleteSimple("testimonials", item.id, loadTestimonials); } catch (err) { showToast(err.message, "error"); } }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/40 italic leading-relaxed line-clamp-3">"{item.content}"</p>
              <p className="mt-3 text-amber-400 text-xs tracking-widest">{"★".repeat(item.rating || 5)}{"☆".repeat(5 - (item.rating || 5))}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
