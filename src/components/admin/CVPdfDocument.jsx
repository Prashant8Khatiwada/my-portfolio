import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles
const createStyles = (t) => StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#111111",
    lineHeight: 1.4,
    padding: "0.5in 0.6in",
  },
  header: {
    textAlign: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: t.nameColor || "#000000",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  contactLine: {
    fontSize: 8.5,
    color: "#374151",
    marginBottom: 2,
  },
  sectionHeader: {
    borderBottomWidth: 1.5,
    borderBottomColor: t.accent || "#1a56db",
    borderBottomStyle: "solid",
    paddingBottom: 2,
    marginBottom: 6,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: t.accent || "#1a56db",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
    fontSize: 9,
    color: "#1f2937",
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 9.5,
    color: "#111111",
  },
  dateText: {
    fontSize: 8.5,
    color: "#6b7280",
  },
  paragraph: {
    fontSize: 9,
    color: "#1f2937",
    marginTop: 2,
  },
});

const TEMPLATE_THEMES = {
  classic: {
    accent: "#000000",
    nameColor: "#000000",
  },
  professional: {
    accent: "#1a56db",
    nameColor: "#1a56db",
  },
  minimal: {
    accent: "#374151",
    nameColor: "#111827",
  },
};

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

function parseBullets(text) {
  if (!text) return [];
  return text
    .split(/\n|●|•|\*|(?<=\.)\s+(?=[A-Z])/)
    .map(x => x.trim())
    .filter(Boolean);
}

export default function CVPdfDocument({ profile, skills = [], timeline = [], projects = [], services = [], options = {}, template = "professional" }) {
  const t = TEMPLATE_THEMES[template] || TEMPLATE_THEMES.professional;
  const styles = createStyles(t);

  const workItems = timeline.filter((i) => i.type === "work").sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const displayProjects = options.featuredOnly ? projects.filter((p) => p.featured) : projects;
  const skillGroups = groupBy(skills.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)), "category");
  const yearsExp = profile?.stats_experience ? calcYearsExp(profile.stats_experience) : null;
  const displaySummary = options.summaryOverride || (profile?.description ? (yearsExp ? profile.description.replace(/\d\+?\s*years?/gi, `${yearsExp}+`) : profile.description) : "");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile?.name || "Your Name"}</Text>
          {options.showTitle && (
            <Text style={styles.subtitle}>{options.jobTitleOverride || profile?.title || "Fullstack Developer"}</Text>
          )}
          <Text style={styles.contactLine}>
            {options.location || "Kathmandu, Nepal"}
            {options.phone ? ` | ${options.phone}` : ""}
            {options.emailOverride || profile?.email ? ` | ${options.emailOverride || profile.email}` : ""}
          </Text>
          <Text style={styles.contactLine}>
            {profile?.linkedin_url ? `${profile.linkedin_url}` : ""}
            {profile?.linkedin_url && profile?.github_url ? " | " : ""}
            {profile?.github_url ? `${profile.github_url}` : ""}
            {options.portfolioUrl ? ` | ${options.portfolioUrl}` : ""}
          </Text>
        </View>

        {/* Summary */}
        {options.showSummary && displaySummary && (
          <View wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.paragraph}>{displaySummary}</Text>
          </View>
        )}

        {/* Skills */}
        {options.showSkills && skills.length > 0 && (
          <View wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
            </View>
            <View style={styles.bulletList}>
              {Object.entries(skillGroups).map(([cat, items]) => (
                <View key={cat} style={styles.bulletItem} wrap={false}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>
                    <Text style={{ fontWeight: "bold" }}>{cat}: </Text>
                    {items.map((sk) => sk.name + (sk.description ? ` (${sk.description})` : "")).join(", ")}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {options.showExperience && workItems.length > 0 && (
          <View>
            <View style={styles.sectionHeader} wrap={false}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
            </View>
            {workItems.map((item, i) => {
              const bullets = parseBullets(item.description);
              return (
                <View key={item.id || i} style={{ marginBottom: 10 }} wrap={false}>
                  <View style={styles.row}>
                    <Text style={styles.jobTitle}>{item.title}{item.company ? ` | ${item.company}` : ""}</Text>
                    <Text style={styles.dateText}>{item.year}</Text>
                  </View>
                  {bullets.length > 0 && (
                    <View style={styles.bulletList}>
                      {bullets.map((b, j) => (
                        <View key={j} style={styles.bulletItem} wrap={false}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Projects */}
        {options.showProjects && displayProjects.length > 0 && (
          <View>
            <View style={styles.sectionHeader} wrap={false}>
              <Text style={styles.sectionTitle}>Key Projects</Text>
            </View>
            {displayProjects.map((p, i) => (
              <View key={p.id || i} style={{ marginBottom: 10 }} wrap={false}>
                <View style={styles.row}>
                  <Text style={styles.jobTitle}>{p.title}</Text>
                  <Text style={styles.dateText}>
                    {p.live_url ? "Live" : ""}
                    {p.live_url && p.github_url ? " | " : ""}
                    {p.github_url ? "GitHub" : ""}
                  </Text>
                </View>
                {p.description && (() => {
                  const descBullets = parseBullets(p.description);
                  return descBullets.length > 0 ? (
                    <View style={styles.bulletList}>
                      {descBullets.map((b, j) => (
                        <View key={j} style={styles.bulletItem} wrap={false}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null;
                })()}
                {p.tags && p.tags.length > 0 && (
                  <Text style={[styles.paragraph, { marginTop: 2 }]}>
                    <Text style={{ fontWeight: "bold" }}>Stack: </Text>
                    {Array.isArray(p.tags) ? p.tags.join(", ") : p.tags}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {options.showEducation && (
          <View>
            <View style={styles.sectionHeader} wrap={false}>
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            <View style={{ marginBottom: 8 }} wrap={false}>
              <View style={styles.row}>
                <Text style={styles.jobTitle}>BSc. CSIT (Computer Science & Information Technology)</Text>
                <Text style={styles.dateText}>2022-2026</Text>
              </View>
              <Text style={[styles.paragraph, { color: "#4b5563", marginTop: 1 }]}>Tribhuvan University, Patan multiple campus</Text>
            </View>
            <View style={{ marginBottom: 8 }} wrap={false}>
              <View style={styles.row}>
                <Text style={styles.jobTitle}>+2 Science with CS</Text>
                <Text style={styles.dateText}>2020-2021</Text>
              </View>
              <Text style={[styles.paragraph, { color: "#4b5563", marginTop: 1 }]}>Reliance International Academy</Text>
            </View>
          </View>
        )}

        {/* Languages */}
        {options.showLanguages && (
          <View wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Languages</Text>
            </View>
            <Text style={styles.paragraph}>
              English (Fluent), Nepali (Native), Hindi (Proficient)
            </Text>
          </View>
        )}

        {/* Areas of Expertise */}
        {options.showServices && services.length > 0 && (
          <View wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Areas of Expertise</Text>
            </View>
            <Text style={styles.paragraph}>{services.map((sv) => sv.title).join("  •  ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
