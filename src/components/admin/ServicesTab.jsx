import React, { useState } from "react";
import { Wrench } from "lucide-react";
import {
  adminCard, adminInput, adminTextarea, adminPrimaryBtn, adminSecondaryBtn, adminLabel,
  JsonAssistantPanel, AdminPanelHeader, EditBtn, DeleteBtn,
} from "./adminUI.jsx";

export default function ServicesTab({
  services, serviceForm, setServiceForm,
  editingServiceId, setEditingServiceId,
  saveSimple, deleteSimple, loadServices, showToast,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJson, setShowJson] = useState(false);

  const jsonTemplate = { title: "Performance Optimization", description: "Speed fixes, core web vitals, SEO audits.", icon: "Zap", display_order: 0 };

  const applyJson = () => {
    try {
      const p = JSON.parse(jsonText);
      setServiceForm({ title: p.title || "", description: p.description || "", icon: p.icon || "Code", display_order: p.display_order !== undefined ? Number(p.display_order) : 0 });
      showToast("JSON applied — review and save.", "success");
      setShowJson(false); setJsonText("");
    } catch { showToast("Invalid JSON.", "error"); }
  };

  const resetForm = () => { setEditingServiceId(null); setServiceForm({ title: "", description: "", icon: "Code", display_order: 0 }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveSimple("services", editingServiceId, { title: serviceForm.title, description: serviceForm.description, icon: serviceForm.icon, display_order: Number(serviceForm.display_order) || 0 }, resetForm, loadServices);
    } catch (err) { showToast(err.message || "Failed to save.", "error"); }
  };

  return (
    <div className="space-y-6">
      <div className={adminCard}>
        <AdminPanelHeader
          icon={Wrench}
          title={editingServiceId ? "Edit Service" : "Add New Service"}
          color="text-amber-400"
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
              <label className={adminLabel}>Service Title</label>
              <input className={adminInput} placeholder="Web Development" value={serviceForm.title} onChange={(e) => setServiceForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div>
              <label className={adminLabel}>Icon Name</label>
              <input className={adminInput} placeholder="Code / Palette / Zap / Globe" value={serviceForm.icon} onChange={(e) => setServiceForm(f => ({ ...f, icon: e.target.value }))} />
            </div>
            <div>
              <label className={adminLabel}>Display Order</label>
              <input className={adminInput} type="number" placeholder="0" value={serviceForm.display_order} onChange={(e) => setServiceForm(f => ({ ...f, display_order: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={adminLabel}>Description</label>
              <textarea className={adminTextarea} rows={3} placeholder="Brief service description..." value={serviceForm.description} onChange={(e) => setServiceForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className={adminPrimaryBtn}><Wrench className="w-3.5 h-3.5" />{editingServiceId ? "Update Service" : "Add Service"}</button>
            {editingServiceId && <button type="button" onClick={resetForm} className={adminSecondaryBtn}>Cancel</button>}
          </div>
        </form>
      </div>

      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((item) => (
            <div key={item.id} className="group relative rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-5 transition-all duration-200">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-xs font-bold text-amber-400">
                  {item.icon?.slice(0, 2) || "??"}
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <EditBtn onClick={() => { setEditingServiceId(item.id); setServiceForm({ title: item.title || "", description: item.description || "", icon: item.icon || "Code", display_order: item.display_order || 0 }); }} />
                  <DeleteBtn onClick={async () => { try { await deleteSimple("services", item.id, loadServices); } catch (err) { showToast(err.message, "error"); } }} />
                </div>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-white/40 leading-relaxed line-clamp-3">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
