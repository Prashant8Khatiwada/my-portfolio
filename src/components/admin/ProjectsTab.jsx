import React, { useState } from "react";
import { FolderKanban, Edit2, Trash2 } from "lucide-react";

export default function ProjectsTab({
  projects,
  projectLoading,
  projectForm,
  setProjectForm,
  projectImageFile,
  setProjectImageFile,
  editingProjectId,
  setEditingProjectId,
  resetProjectForm,
  saveProject,
  deleteProject,
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
    title: "Example Project",
    description: "A detailed description of the project.",
    tags: ["React", "TypeScript", "Tailwind"],
    live_url: "https://example.com",
    github_url: "https://github.com/username/repo",
    featured: true,
    display_order: 0,
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonTemplate, null, 2));
    showToast("JSON Template copied to clipboard!", "success");
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setProjectForm({
        title: parsed.title || "",
        description: parsed.description || "",
        tags: Array.isArray(parsed.tags) ? parsed.tags.join(", ") : parsed.tags || "",
        live_url: parsed.live_url || "",
        github_url: parsed.github_url || "",
        featured: parsed.featured !== undefined ? Boolean(parsed.featured) : false,
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
      {/* Project Form Card */}
      <div className="bg-card/45 border border-border/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-black/10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-primary" />
            {editingProjectId ? "Edit Project Details" : "Create New Project"}
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

        <form onSubmit={saveProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</label>
            <input
              className={uiInput}
              placeholder="Project title"
              value={projectForm.title}
              onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Order</label>
            <input
              className={uiInput}
              placeholder="Display order index"
              type="number"
              value={projectForm.display_order}
              onChange={(e) => setProjectForm((p) => ({ ...p, display_order: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Site URL</label>
            <input
              className={uiInput}
              placeholder="https://example.com"
              type="url"
              value={projectForm.live_url}
              onChange={(e) => setProjectForm((p) => ({ ...p, live_url: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">GitHub URL</label>
            <input
              className={uiInput}
              placeholder="https://github.com/username/project"
              type="url"
              value={projectForm.github_url}
              onChange={(e) => setProjectForm((p) => ({ ...p, github_url: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Tags / Technologies (comma separated)
            </label>
            <input
              className={uiInput}
              placeholder="React, TypeScript, Tailwind, CSS"
              value={projectForm.tags}
              onChange={(e) => setProjectForm((p) => ({ ...p, tags: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Description</label>
            <textarea
              className={uiTextarea}
              placeholder="Brief project details..."
              rows={4}
              value={projectForm.description}
              onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Thumbnail Image</label>
            <div className="relative border border-dashed border-border/80 rounded-xl p-4 flex flex-col items-center justify-center bg-background/30 hover:bg-background/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProjectImageFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <p className="text-sm font-semibold text-muted-foreground text-center">
                {projectImageFile ? projectImageFile.name : "Select or drag files here"}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <ToggleSwitch
              checked={projectForm.featured}
              onChange={(e) => setProjectForm((p) => ({ ...p, featured: e.target.checked }))}
              label="Feature this project on frontpage"
            />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4 border-t border-border/30">
            <button type="submit" className={uiPrimaryBtn}>
              {editingProjectId ? "Save Changes" : "Create Project"}
            </button>
            {editingProjectId && (
              <button type="button" onClick={resetProjectForm} className={uiSecondaryBtn}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Projects List View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projectLoading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground font-medium animate-pulse">
            Loading project details...
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground font-medium bg-card/20 rounded-2xl border border-border/40">
            No projects available. Click Reset to Defaults or add manually.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card/35 border border-border/40 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-5 space-y-4">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-xl border border-border/20 bg-neutral-900"
                  />
                ) : (
                  <div className="w-full h-40 rounded-xl bg-neutral-900 border border-border/20 flex items-center justify-center text-xs text-muted-foreground">
                    No image upload
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg leading-tight truncate">{project.title}</h4>
                    <span className="text-[10px] font-bold text-muted-foreground bg-background/50 border border-border/40 px-2 py-0.5 rounded-full">
                      Order {project.display_order}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(project.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-5 py-4 bg-background/30 border-t border-border/30 flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    project.featured
                      ? "bg-emerald-950/40 border-emerald-500/25 text-emerald-400"
                      : "bg-neutral-800/40 border-neutral-700/25 text-neutral-400"
                  }`}
                >
                  {project.featured ? "Featured" : "Standard"}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    className="p-2 rounded-lg bg-card border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => {
                      setEditingProjectId(project.id);
                      setProjectForm({
                        title: project.title || "",
                        description: project.description || "",
                        tags: (project.tags || []).join(", "),
                        live_url: project.live_url || "",
                        github_url: project.github_url || "",
                        featured: Boolean(project.featured),
                        display_order: project.display_order || 0,
                      });
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-card border border-border hover:border-red-500/40 hover:bg-red-500/5 text-red-500 transition-colors"
                    onClick={() => deleteProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
