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
  const [copied, setCopied] = useState(false);

  const parseRobustJson = (str) => {
    let cleaned = str.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }
    cleaned = cleaned.trim();
    
    let inString = false;
    let result = "";
    for (let i = 0; i < cleaned.length; i++) {
      const char = cleaned[i];
      if (char === '"' && (i === 0 || cleaned[i - 1] !== '\\')) {
        inString = !inString;
        result += char;
      } else if (inString && (char === '\n' || char === '\r')) {
        if (char === '\n') {
          result += '\\n';
        }
      } else {
        result += char;
      }
    }
    return JSON.parse(result);
  };

  const applyToForm = () => {
    try {
      const p = parseRobustJson(jsonText);
      setProjectForm({
        title: p.title || "",
        description: p.description || "",
        tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "",
        live_url: p.live_url || "",
        github_url: p.github_url || "",
        featured: p.featured !== undefined ? Boolean(p.featured) : false,
        display_order: p.display_order !== undefined ? Number(p.display_order) : 0
      });
      showToast("Loaded into form. Review and save.", "success");
      setShowJson(false);
      setJsonText("");
    } catch {
      showToast("Invalid JSON format.", "error");
    }
  };

  const applyAndCreate = async () => {
    try {
      const p = parseRobustJson(jsonText);
      const tagsArray = Array.isArray(p.tags) ? p.tags : (p.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
      const payload = {
        title: p.title || "Untitled Project",
        description: p.description || "",
        tags: tagsArray,
        live_url: p.live_url || null,
        github_url: p.github_url || null,
        featured: p.featured !== undefined ? Boolean(p.featured) : false,
        display_order: p.display_order !== undefined ? Number(p.display_order) : 0
      };
      await saveProject(null, payload);
      setShowJson(false);
      setJsonText("");
    } catch (err) {
      showToast("Invalid JSON format or creation failed.", "error");
    }
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
            <button
              type="button"
              onClick={() => setShowJson(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/20 transition-all duration-200"
            >
              ⚡ JSON Assistant
            </button>
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
            <div key={project.id} className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 flex flex-col shadow-sm hover:shadow-md">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-36 object-cover border-b border-border bg-muted" />
              ) : (
                <div className="w-full h-36 bg-muted border-b border-border flex items-center justify-center">
                  <FolderKanban className="w-8 h-8 text-muted-foreground/30" />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-foreground leading-tight truncate">{project.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex-shrink-0 ${project.featured ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-muted border-border text-muted-foreground"}`}>
                    {project.featured ? "Featured" : "Standard"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3 flex-1">{project.description}</p>
                {(project.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(project.tags || []).slice(0, 4).map((tag, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/5 border border-primary/15 text-primary font-medium">{tag}</span>
                    ))}
                    {(project.tags || []).length > 4 && <span className="text-[10px] text-muted-foreground/50">+{project.tags.length - 4}</span>}
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
                  <div className="flex gap-2">
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><ExternalLink className="w-3.5 h-3.5" /></a>}
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-3.5 h-3.5" /></a>}
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

      {/* JSON Assistant Modal */}
      {showJson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 text-left">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <h3 className="font-bold text-foreground">JSON Assistant</h3>
                  <p className="text-xs text-muted-foreground">Extract project insights via AI</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowJson(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Copy the AI Prompt below and paste it in ChatGPT or Gemini along with your project details. It will generate a clean JSON payload which you can paste back here.
              </p>

              {/* Prompt options */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const promptText = `You are an expert technical copywriter and developer relations agent. Your task is to analyze the provided raw project details, codebase excerpts, or README content, and extract it into a highly polished, clean JSON metadata structure matching the schema below.

### INSTRUCTIONS:
1. **title**: Extract a clean, professional, and clear project name. Remove generic versioning or repo prefixes.
2. **description**: Write a highly engaging, professional 2-3 sentence description of the project. Focus on the core value proposition, key features, and what problems it solves. Avoid generic text. It must be polished and ready to showcase on a premium developer portfolio.
3. **tags**: Identify and extract the exact technologies, frameworks, libraries, and languages used (e.g., ["React", "TypeScript", "Tailwind CSS", "Supabase", "Node.js"]). Order them by importance. Do not include generic tags.
4. **live_url**: If a live preview, website, or deployment URL is mentioned, extract it. Otherwise, set it to null.
5. **github_url**: If a GitHub, GitLab, or bitbucket repository URL is mentioned, extract it. Otherwise, set it to null.
6. **featured**: Determine if this is a major/signature project (true) or a standard project (false). Default to true if it seems like a core piece of work.
7. **display_order**: Set to 0.

### JSON SCHEMA:
{
  "title": "String",
  "description": "String",
  "tags": ["String"],
  "live_url": "String or null",
  "github_url": "String or null",
  "featured": Boolean,
  "display_order": Number
}

### CRITICAL REQUIREMENT:
Output ONLY the JSON block. Do not include markdown code block styling (\`\`\`json), no introduction, no conversational filler, and no explanation.

Here are the project details to analyze:
[INSERT YOUR PROJECT DESCRIPTION, README CONTENT, OR BULLET POINTS HERE]`;
                    navigator.clipboard.writeText(promptText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    showToast("AI Prompt copied to clipboard!", "success");
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                    copied
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                  }`}
                >
                  {copied ? "✓ Prompt Copied!" : "📋 Copy AI Prompt"}
                </button>
              </div>

              {/* Paste JSON */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Paste AI JSON Output</label>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder="Paste generated JSON here..."
                  rows={6}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-all resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-2 border-t border-border pt-4">
              <button
                type="button"
                onClick={applyAndCreate}
                disabled={!jsonText.trim()}
                className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none text-primary-foreground font-bold text-xs transition-all flex items-center justify-center gap-1"
              >
                🚀 Direct Create Project
              </button>
              <button
                type="button"
                onClick={applyToForm}
                disabled={!jsonText.trim()}
                className="flex-1 py-2.5 rounded-xl border border-border bg-muted/50 hover:bg-muted disabled:opacity-50 disabled:pointer-events-none text-foreground font-bold text-xs transition-all"
              >
                Load into Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
