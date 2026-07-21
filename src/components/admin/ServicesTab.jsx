import React, { useState } from "react";
import { Wrench, Edit2, Trash2 } from "lucide-react";

export default function ServicesTab({
  services,
  serviceForm,
  setServiceForm,
  editingServiceId,
  setEditingServiceId,
  saveSimple,
  deleteSimple,
  loadServices,
  showToast,
  uiInput,
  uiTextarea,
  uiPrimaryBtn,
  uiSecondaryBtn,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJsonAssistant, setShowJsonAssistant] = useState(false);

  const jsonTemplate = {
    title: "Performance Optimization",
    description: "Speed fixes, core web vitals adjustments, SEO audits.",
    icon: "Zap",
    display_order: 0,
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2));
    showToast("JSON Template copied to clipboard!", "success");
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setServiceForm({
        title: parsed.title || "",
        description: parsed.description || "",
        icon: parsed.icon || "Code",
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
            <Wrench className="w-5 h-5 text-primary" />
            {editingServiceId ? "Edit Service details" : "Create New Service"}
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
                "services",
                editingServiceId,
                {
                  title: serviceForm.title,
                  description: serviceForm.description,
                  icon: serviceForm.icon,
                  display_order: Number(serviceForm.display_order) || 0,
                },
                () => {
                  setEditingServiceId(null);
                  setServiceForm({
                    title: "",
                    description: "",
                    icon: "Code",
                    display_order: 0,
                  });
                },
                loadServices,
              );
            } catch (error) {
              showToast(error.message || "Failed to save service.", "error");
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Service Title</label>
            <input
              className={uiInput}
              placeholder="Web Development"
              value={serviceForm.title}
              onChange={(e) => setServiceForm((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Icon Identifier</label>
            <input
              className={uiInput}
              placeholder="Code, Palette, Zap, Globe..."
              value={serviceForm.icon}
              onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</label>
            <textarea
              className={uiTextarea}
              placeholder="Brief service description details..."
              rows={3}
              value={serviceForm.description}
              onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4 border-t border-border/30">
            <button className={uiPrimaryBtn} type="submit">
              {editingServiceId ? "Update Service" : "Save Service"}
            </button>
            {editingServiceId && (
              <button
                type="button"
                onClick={() => {
                  setEditingServiceId(null);
                  setServiceForm({
                    title: "",
                    description: "",
                    icon: "Code",
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-card/35 border border-border/40 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30 flex justify-end gap-2">
              <button
                className="p-2 rounded-lg bg-card border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setEditingServiceId(item.id);
                  setServiceForm({
                    title: item.title || "",
                    description: item.description || "",
                    icon: item.icon || "Code",
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
                    await deleteSimple("services", item.id, loadServices);
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
