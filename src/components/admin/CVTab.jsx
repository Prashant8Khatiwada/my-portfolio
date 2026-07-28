import React, { useState } from "react";
import { FileText, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";

// ─── Print styles injected once into <head> ───────────────────────────────────
const PRINT_CSS = `
@media print {
  body * { visibility: hidden !important; }
  #cv-printable, #cv-printable * { visibility: visible !important; }
  #cv-printable {
    position: fixed !important;
    inset: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0.6in 0.7in !important;
    box-shadow: none !important;
    border: none !important;
    background: #fff !important;
  }
  @page { margin: 0; size: A4; }
}
`;

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const g = item[key] || "Other";
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});
}

function calcYearsExp(startDate) {
  if (!startDate) return null;
  const start = new Date(startDate);
  if (isNaN(start)) return null;
  const diff = (new Date() - start) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(1, Math.floor(diff));
}

const TEMPLATES = {
  classic: {
    label: "Classic",
    accent: "#000000",
    headingBorder: "2px solid #000000",
    fontFamily: '"Times New Roman", Georgia, serif',
    nameFontSize: "26px",
    nameColor: "#000000",
    lineHeight: 1.5,
  },
  professional: {
    label: "Professional",
    accent: "#1a56db",
    headingBorder: "1.5px solid #1a56db",
    fontFamily: "Arial, Helvetica, sans-serif",
    nameFontSize: "26px",
    nameColor: "#1a56db",
    lineHeight: 1.5,
  },
  minimal: {
    label: "Minimal",
    accent: "#374151",
    headingBorder: "1px solid #d1d5db",
    fontFamily: "Arial, Helvetica, sans-serif",
    nameFontSize: "28px",
    nameColor: "#111827",
    lineHeight: 1.6,
  },
};

function CVPreview({ profile, skills, timeline, projects, services, options, template }) {
  const t = TEMPLATES[template];
  const workItems = timeline.filter((i) => i.type === "work").sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const eduItems = timeline.filter((i) => i.type === "education").sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const displayProjects = options.featuredOnly ? projects.filter((p) => p.featured) : projects;
  const skillGroups = groupBy(skills.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)), "category");
  const yearsExp = profile?.stats_experience ? calcYearsExp(profile.stats_experience) : null;

  const s = {
    page: { fontFamily: t.fontFamily, fontSize: "10pt", color: "#111", lineHeight: t.lineHeight, background: "#fff" },
    name: { fontSize: t.nameFontSize, fontWeight: "bold", color: t.nameColor, margin: "0 0 4px 0", letterSpacing: "0.5px" },
    subtitle: { fontSize: "12pt", fontWeight: "600", color: "#374151", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "1px" },
    contactLine: { fontSize: "9pt", color: "#374151", margin: "2px 0" },
    header: { borderBottom: t.headingBorder, paddingBottom: "3px", marginBottom: "6px", marginTop: "14px" },
    sectionTitle: { fontSize: "10.5pt", fontWeight: "bold", color: t.accent, textTransform: "uppercase", letterSpacing: "1.5px", margin: "0" },
    bulletList: { margin: "4px 0 0 0", paddingLeft: "16px" },
    bullet: { marginBottom: "3px", fontSize: "9.5pt", color: "#1f2937" },
    jobTitle: { fontWeight: "bold", fontSize: "10pt", color: "#111" },
    jobMeta: { fontSize: "9pt", color: "#6b7280", marginBottom: "3px" },
    paragraph: { fontSize: "9.5pt", color: "#1f2937", margin: "4px 0 0 0" },
    row: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "4px" },
  };

  return (
    <div id="cv-printable" style={s.page}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "6px" }}>
        <h1 style={s.name}>{profile?.name || "Your Name"}</h1>
        {options.showTitle && (
          <p style={s.subtitle}>{options.jobTitleOverride || profile?.title || "Full Stack Developer"}</p>
        )}
        <p style={s.contactLine}>
          {options.location || "Kathmandu, Nepal"}
          {options.phone && <> | {options.phone}</>}
          {profile?.email && <> | <a href={`mailto:${profile.email}`} style={{ color: t.accent }}>{profile.email}</a></>}
        </p>
        <p style={s.contactLine}>
          {profile?.linkedin_url && <a href={profile.linkedin_url} style={{ color: t.accent }}>{profile.linkedin_url}</a>}
          {profile?.linkedin_url && profile?.github_url && " | "}
          {profile?.github_url && <a href={profile.github_url} style={{ color: t.accent }}>{profile.github_url}</a>}
          {options.portfolioUrl && <> | <a href={options.portfolioUrl} style={{ color: t.accent }}>{options.portfolioUrl}</a></>}
        </p>
      </div>

      {/* Summary */}
      {options.showSummary && profile?.description && (
        <div>
          <div style={s.header}><h2 style={s.sectionTitle}>Professional Summary</h2></div>
          <p style={s.paragraph}>
            {yearsExp
              ? profile.description.replace(/\d\+?\s*years?/gi, `${yearsExp}+`)
              : profile.description}
          </p>
        </div>
      )}

      {/* Skills */}
      {options.showSkills && skills.length > 0 && (
        <div>
          <div style={s.header}><h2 style={s.sectionTitle}>Technical Skills</h2></div>
          <ul style={s.bulletList}>
            {Object.entries(skillGroups).map(([cat, items]) => (
              <li key={cat} style={s.bullet}>
                <strong>{cat}:</strong>{" "}
                {items.map((sk) => sk.name + (sk.description ? ` (${sk.description})` : "")).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {options.showExperience && workItems.length > 0 && (
        <div>
          <div style={s.header}><h2 style={s.sectionTitle}>Professional Experience</h2></div>
          {workItems.map((item, i) => {
            const bullets = (item.description || "")
              .split(/\n/)
              .map((b) => b.trim())
              .filter(Boolean);
            return (
              <div key={item.id || i} style={{ marginBottom: "12px" }}>
                <div style={s.row}>
                  <span style={s.jobTitle}>{item.title}{item.company ? `, ${item.company}` : ""}</span>
                  <span style={{ fontSize: "9pt", color: "#6b7280" }}>{item.year}</span>
                </div>
                {bullets.length > 0 && (
                  <ul style={s.bulletList}>
                    {bullets.map((b, j) => <li key={j} style={s.bullet}>{b}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Projects */}
      {options.showProjects && displayProjects.length > 0 && (
        <div>
          <div style={s.header}><h2 style={s.sectionTitle}>Projects</h2></div>
          {displayProjects.map((p, i) => (
            <div key={p.id || i} style={{ marginBottom: "10px" }}>
              <div style={s.row}>
                <span style={{ fontWeight: "bold", fontSize: "10pt", color: "#111" }}>{p.title}</span>
                <span style={{ fontSize: "9pt" }}>
                  {p.live_url && <a href={p.live_url} style={{ color: t.accent }}>Live</a>}
                  {p.live_url && p.github_url && " | "}
                  {p.github_url && <a href={p.github_url} style={{ color: t.accent }}>GitHub</a>}
                </span>
              </div>
              {p.description && <p style={{ ...s.paragraph, marginTop: "2px" }}>{p.description}</p>}
              {p.tags && p.tags.length > 0 && (
                <p style={{ ...s.paragraph, marginTop: "2px" }}>
                  <strong>Stack:</strong> {Array.isArray(p.tags) ? p.tags.join(", ") : p.tags}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {options.showEducation && eduItems.length > 0 && (
        <div>
          <div style={s.header}><h2 style={s.sectionTitle}>Education</h2></div>
          {eduItems.map((item, i) => {
            const bullets = (item.description || "").split(/\n/).map((b) => b.trim()).filter(Boolean);
            return (
              <div key={item.id || i} style={{ marginBottom: "10px" }}>
                <div style={s.row}>
                  <span style={s.jobTitle}>{item.title}{item.company ? `, ${item.company}` : ""}</span>
                  <span style={{ fontSize: "9pt", color: "#6b7280" }}>{item.year}</span>
                </div>
                {bullets.length > 0 && (
                  <ul style={s.bulletList}>
                    {bullets.map((b, j) => <li key={j} style={s.bullet}>{b}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Areas of Expertise */}
      {options.showServices && services.length > 0 && (
        <div>
          <div style={s.header}><h2 style={s.sectionTitle}>Areas of Expertise</h2></div>
          <p style={s.paragraph}>{services.map((sv) => sv.title).join("  •  ")}</p>
        </div>
      )}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer py-1.5">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </label>
  );
}

function SettingsSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/60 transition-colors text-sm font-semibold text-foreground"
      >
        {title}
        {open ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-3 pt-1 space-y-0.5 bg-card">{children}</div>}
    </div>
  );
}

export default function CVTab({ profile, skills = [], timeline = [], projects = [], services = [] }) {
  React.useEffect(() => {
    if (document.getElementById("cv-print-styles")) return;
    const style = document.createElement("style");
    style.id = "cv-print-styles";
    style.textContent = PRINT_CSS;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("cv-print-styles");
      if (el) el.remove();
    };
  }, []);

  const [template, setTemplate] = useState("professional");
  const [options, setOptions] = useState({
    showTitle: true,
    showSummary: true,
    showSkills: true,
    showExperience: true,
    showProjects: true,
    showEducation: true,
    showServices: false,
    featuredOnly: true,
    jobTitleOverride: "",
    phone: "+977  9762713987",
    location: "Kathmandu, Nepal",
    portfolioUrl: "",
  });

  const setOpt = (key, val) => setOptions((o) => ({ ...o, [key]: val }));

  const inputCls =
    "w-full bg-muted/40 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-120px)]">
      {/* Settings */}
      <div className="lg:w-72 xl:w-80 flex-shrink-0 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">CV Generator</h2>
            <p className="text-[10px] text-muted-foreground/60">ATS-optimised resume</p>
          </div>
          <button
            onClick={() => window.print()}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-sm"
          >
            <Download className="w-3 h-3" /> PDF
          </button>
        </div>

        {/* Template picker */}
        <SettingsSection title="Template">
          <div className="grid grid-cols-3 gap-2 pt-2">
            {Object.entries(TEMPLATES).map(([key, tmpl]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTemplate(key)}
                className={`py-2 px-1 rounded-lg border text-xs font-semibold transition-all ${
                  template === key
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {tmpl.label}
              </button>
            ))}
          </div>
        </SettingsSection>

        {/* Sections */}
        <SettingsSection title="Sections">
          <Toggle label="Professional Title" checked={options.showTitle} onChange={(v) => setOpt("showTitle", v)} />
          <Toggle label="Professional Summary" checked={options.showSummary} onChange={(v) => setOpt("showSummary", v)} />
          <Toggle label="Technical Skills" checked={options.showSkills} onChange={(v) => setOpt("showSkills", v)} />
          <Toggle label="Experience" checked={options.showExperience} onChange={(v) => setOpt("showExperience", v)} />
          <Toggle label="Projects" checked={options.showProjects} onChange={(v) => setOpt("showProjects", v)} />
          <Toggle label="Education" checked={options.showEducation} onChange={(v) => setOpt("showEducation", v)} />
          <Toggle label="Areas of Expertise" checked={options.showServices} onChange={(v) => setOpt("showServices", v)} />
        </SettingsSection>

        {/* Projects filter */}
        <SettingsSection title="Projects Filter">
          <Toggle label="Featured projects only" checked={options.featuredOnly} onChange={(v) => setOpt("featuredOnly", v)} />
          <p className="text-[10px] text-muted-foreground/50 pt-1">
            {options.featuredOnly
              ? `Showing ${projects.filter((p) => p.featured).length} featured`
              : `Showing all ${projects.length} projects`}
          </p>
        </SettingsSection>

        {/* Overrides */}
        <SettingsSection title="Contact Overrides" defaultOpen={true}>
          <div className="space-y-3 pt-1">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1 block">Job Title Override</label>
              <input className={inputCls} type="text" placeholder={profile?.title || "Full Stack Developer"} value={options.jobTitleOverride} onChange={(e) => setOpt("jobTitleOverride", e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1 block">Phone Number</label>
              <input className={inputCls} type="text" placeholder="+977 9800000000" value={options.phone} onChange={(e) => setOpt("phone", e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1 block">Location</label>
              <input className={inputCls} type="text" placeholder="Kathmandu, Nepal" value={options.location} onChange={(e) => setOpt("location", e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60 mb-1 block">Portfolio URL</label>
              <input className={inputCls} type="text" placeholder="https://yourportfolio.com" value={options.portfolioUrl} onChange={(e) => setOpt("portfolioUrl", e.target.value)} />
            </div>
          </div>
        </SettingsSection>

        {/* ATS Tips */}
        <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4 space-y-2">
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Eye className="w-3 h-3" /> ATS Compliance ✓
          </p>
          <ul className="space-y-1">
            {["Single-column layout", "Standard section headings", "Bullet points for roles", "No images in output", "System-safe fonts only"].map((tip) => (
              <li key={tip} className="text-[10px] text-muted-foreground flex items-start gap-1.5">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CV Preview */}
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 pb-3 border-b border-border mb-5 bg-background/80 backdrop-blur-sm">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Live Preview — A4
          </p>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" /> Download as PDF
          </button>
        </div>

        <div
          style={{
            background: "#fff",
            boxShadow: "0 4px 40px rgba(0,0,0,0.18)",
            borderRadius: "4px",
            padding: "56px 64px",
            maxWidth: "794px",
            margin: "0 auto",
            minHeight: "1123px",
          }}
        >
          <CVPreview
            profile={profile}
            skills={skills}
            timeline={timeline}
            projects={projects}
            services={services}
            options={options}
            template={template}
          />
        </div>
      </div>
    </div>
  );
}
