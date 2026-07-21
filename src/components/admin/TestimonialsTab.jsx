import React, { useState } from "react";
import { MessageSquare, Edit2, Trash2 } from "lucide-react";

export default function TestimonialsTab({
  testimonials,
  testimonialForm,
  setTestimonialForm,
  editingTestimonialId,
  setEditingTestimonialId,
  saveSimple,
  deleteSimple,
  loadTestimonials,
  showToast,
  uiInput,
  uiTextarea,
  uiPrimaryBtn,
  uiSecondaryBtn,
  ToggleSwitch,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJsonAssistant, setShowJsonAssistant] = useState(false);

  const jsonTemplate = {
    name: "John Doe",
    role: "Engineering Manager",
    company: "Acme Corp",
    content: "Prashant did a fantastic job designing our interface.",
    rating: 5,
    display_order: 0,
    active: true,
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2));
    showToast("JSON Template copied to clipboard!", "success");
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setTestimonialForm({
        name: parsed.name || "",
        role: parsed.role || "",
        company: parsed.company || "",
        content: parsed.content || "",
        rating: parsed.rating !== undefined ? Number(parsed.rating) : 5,
        display_order: parsed.display_order !== undefined ? Number(parsed.display_order) : 0,
        active: parsed.active !== undefined ? Boolean(parsed.active) : true,
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
            <MessageSquare className="w-5 h-5 text-primary" />
            {editingTestimonialId ? "Edit Testimonial Details" : "Create New Testimonial"}
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
                "testimonials",
                editingTestimonialId,
                {
                  name: testimonialForm.name,
                  role: testimonialForm.role,
                  company: testimonialForm.company,
                  content: testimonialForm.content,
                  rating: Number(testimonialForm.rating) || 5,
                  display_order: Number(testimonialForm.display_order) || 0,
                  active: Boolean(testimonialForm.active),
                },
                () => {
                  setEditingTestimonialId(null);
                  setTestimonialForm({
                    name: "",
                    role: "",
                    company: "",
                    content: "",
                    rating: 5,
                    display_order: 0,
                    active: true,
                  });
                },
                loadTestimonials,
              );
            } catch (error) {
              showToast(error.message || "Failed to save testimonial.", "error");
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</label>
            <input
              className={uiInput}
              placeholder="Client name"
              value={testimonialForm.name}
              onChange={(e) => setTestimonialForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Role</label>
            <input
              className={uiInput}
              placeholder="CTO / Founder"
              value={testimonialForm.role}
              onChange={(e) => setTestimonialForm((p) => ({ ...p, role: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company</label>
            <input
              className={uiInput}
              placeholder="Company name"
              value={testimonialForm.company}
              onChange={(e) => setTestimonialForm((p) => ({ ...p, company: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Rating (1 to 5 Stars)</label>
            <input
              className={uiInput}
              type="number"
              min="1"
              max="5"
              placeholder="5"
              value={testimonialForm.rating}
              onChange={(e) => setTestimonialForm((p) => ({ ...p, rating: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Testimonial Content</label>
            <textarea
              className={uiTextarea}
              placeholder="Client feedback details..."
              rows={3}
              value={testimonialForm.content}
              onChange={(e) => setTestimonialForm((p) => ({ ...p, content: e.target.value }))}
              required
            />
          </div>

          <div className="flex items-center">
            <ToggleSwitch
              checked={testimonialForm.active}
              onChange={(e) => setTestimonialForm((p) => ({ ...p, active: e.target.checked }))}
              label="Active / Visible testimonials"
            />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4 border-t border-border/30">
            <button type="submit" className={uiPrimaryBtn}>
              {editingTestimonialId ? "Update Feedback" : "Save Testimonial"}
            </button>
            {editingTestimonialId && (
              <button
                type="button"
                onClick={() => {
                  setEditingTestimonialId(null);
                  setTestimonialForm({
                    name: "",
                    role: "",
                    company: "",
                    content: "",
                    rating: 5,
                    display_order: 0,
                    active: true,
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

      {/* Testimonials List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-card/35 border border-border/40 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.role} {item.company ? `@ ${item.company}` : ""}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    item.active
                      ? "bg-emerald-950/40 border-emerald-500/25 text-emerald-400"
                      : "bg-neutral-800/40 border-neutral-700/25 text-neutral-400"
                  }`}
                >
                  {item.active ? "Active" : "Draft"}
                </span>
              </div>
              <p className="text-sm italic text-muted-foreground">"{item.content}"</p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-sm text-yellow-400">{"★".repeat(item.rating || 5)}</span>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    setEditingTestimonialId(item.id);
                    setTestimonialForm({
                      name: item.name || "",
                      role: item.role || "",
                      company: item.company || "",
                      content: item.content || "",
                      rating: item.rating || 5,
                      display_order: item.display_order || 0,
                      active: item.active !== false,
                    });
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg bg-card border border-border hover:border-red-500/40 hover:bg-red-500/5 text-red-500 transition-colors"
                  onClick={async () => {
                    try {
                      await deleteSimple("testimonials", item.id, loadTestimonials);
                    } catch (error) {
                      showToast(error.message, "error");
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
