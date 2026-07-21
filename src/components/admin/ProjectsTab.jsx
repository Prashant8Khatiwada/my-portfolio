import React, { useState } from "react";
import { FolderKanban, ExternalLink, Github } from "lucide-react";
import {
  adminCard, adminInput, adminTextarea, adminPrimaryBtn, adminSecondaryBtn, adminLabel,
  JsonAssistantPanel, AdminPanelHeader, EditBtn, DeleteBtn,
} from "./adminUI.jsx";

export default function ProjectsTab({
  projects, projectLoading, projectForm, setProjectForm,
  projectImageFile, setProjectImageFile,
  editingProjectId, setEditingProjectId,
  resetProjectForm, saveProject, deleteProject, showToast,
}) {
  const [jsonText, setJsonText] = useState("");
  const [showJson, setShowJson] = useState(false);

  const jsonTemplate = { title: "Example Project", description: "A detailed description.", tags: ["React", "TypeScript", "Tailwind"], live_url: "https://example.com", github_url: "https://github.com/username/repo", featured: true, display_order: 0 };

  const applyJson = () => {
    try {
      const p = JSON.parse(jsonText);
      setProjectForm({ title: p.title || "", description: p.description || "", tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "", live_url: p.live_url || "", github_url: p.github_url || "", featured: p.featured !== undefined ? Boolean(p.featured) : false, display_order: p.display_order !== undefined ? Number(p.display_order) : 0 });
      showToast("JSON applied — review and save.", "success");
      setShowJson(false); setJsonText("");
    } catch { showToast("Invalid JSON.", "error"); }
  };

  return (
    <div className="space-y-6">
      {/* Form card */}
      <div className={adminCard}>
        <AdminPanelHeader
          icon={FolderKanban}
          title={editingProjectId ? "Edit Project" : "Add New Project"}
          color="text-emerald-400"
          right={
            <JsonAssistantPanel
              show={showJson} onToggle={() => setShowJson(s => !s)}
              jsonText={jsonText} setJsonText={setJsonText}
              onCopy={() => { navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2)); showToast("Schema copied!", "success"); }}
              onApply={applyJson}
            />
          }
        />
        <form onSubmit={saveProject} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={adminLabel}>Project Title</label>
              <input className={adminInput} placeholder="My awesome project" value={projectForm.title} onChange={(e) => setProjectForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div>
              <label className={adminLabel}>Display Order</label>
              <input className={adminInput} type="number" placeholder="0" value={projectForm.display_order} onChange={(e) => setProjectForm(f => ({ ...f, display_order: e.target.value }))} />
            </div>
            <div>
              <label className={adminLabel}>Live Site URL</label>
              <input className={adminInput} type="url" placeholder="https://example.com" value={projectForm.live_url} onChange={(e) => setProjectForm(f => ({ ...f, live_url: e.target.value }))} />
            </div>
            <div>
              <label className={adminLabel}>GitHub URL</label>
              <input className={adminInput} type="url" placeholder="https://github.com/user/repo" value={projectForm.github_url} onChange={(e) => setProjectForm(f => ({ ...f, github_url: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={adminLabel}>Tags / Technologies (comma separated)</label>
              <input className={adminInput} placeholder="React, TypeScript, Tailwind, Supabase" value={projectForm.tags} onChange={(e) => setProjectForm(f => ({ ...f, tags: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={adminLabel}>Project Description</label>
              <textarea className={adminTextarea} rows={4} placeholder="What this project does..." value={projectForm.description} onChange={(e) => setProjectForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div>
              <label className={adminLabel}>Thumbnail Image</label>
              <div className="relative rounded-xl border border-dashed border-white/15 hover:border-violet-500/40 bg-white/3 hover:bg-white/5 transition-all cursor-pointer p-6 flex flex-col items-center justify-center gap-2">
                <input type="file" accept="image/*" onChange={(e) => setProjectImageFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <FolderKanban className="w-4 h-4 text-white/30" />
                </div>
                <p className="text-xs text-white/30 text-center">{projectImageFile ? projectImageFile.name : "Click or drag to upload image"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end pb-2">
              <button
                type="button"
                role="switch"
                aria-checked={projectForm.featured}
                onClick={() => setProjectForm(f => ({ ...f, featured: !f.featured }))}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${projectForm.featured ? "bg-violet-600" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${projectForm.featured ? "translate-x-5" : "translate-x-0"}`} />
              </button>
              <span className="text-xs font-medium text-white/50">{projectForm.featured ? "Featured on frontpage" : "Standard project"}</span>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" className={adminPrimaryBtn}><FolderKanban className="w-3.5 h-3.5" />{editingProjectId ? "Save Changes" : "Create Project"}</button>
            {editingProjectId && <button type="button" onClick={resetProjectForm} className={adminSecondaryBtn}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Projects grid */}
      {projectLoading ? (
        <div className="py-12 text-center text-white/20 animate-pulse text-sm">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="py-12 text-center rounded-xl border border-white/5 text-white/20 text-sm">No projects yet. Add one above.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="group rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] overflow-hidden transition-all duration-200 flex flex-col">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-36 object-cover border-b border-white/5 bg-white/5" />
              ) : (
                <div className="w-full h-36 bg-gradient-to-br from-white/3 to-white/[0.01] border-b border-white/5 flex items-center justify-center">
                  <FolderKanban className="w-8 h-8 text-white/10" />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-white leading-tight truncate">{project.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex-shrink-0 ${project.featured ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/10 text-white/30"}`}>
                    {project.featured ? "Featured" : "Standard"}
                  </span>
                </div>
                <p className="text-xs text-white/35 leading-relaxed line-clamp-2 mb-3 flex-1">{project.description}</p>
                {(project.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(project.tags || []).slice(0, 4).map((tag, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/8 border border-violet-500/15 text-violet-400 font-medium">{tag}</span>
                    ))}
                    {(project.tags || []).length > 4 && <span className="text-[10px] text-white/20">+{project.tags.length - 4}</span>}
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <div className="flex gap-2">
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors"><ExternalLink className="w-3.5 h-3.5" /></a>}
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors"><Github className="w-3.5 h-3.5" /></a>}
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditBtn onClick={() => { setEditingProjectId(project.id); setProjectForm({ title: project.title || "", description: project.description || "", tags: (project.tags || []).join(", "), live_url: project.live_url || "", github_url: project.github_url || "", featured: Boolean(project.featured), display_order: project.display_order || 0 }); }} />
                    <DeleteBtn onClick={() => deleteProject(project.id)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
