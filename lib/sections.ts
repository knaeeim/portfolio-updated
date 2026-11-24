// Homepage sections that the admin can switch on/off. `anchors` are the element ids each section renders.
export const SECTIONS = [
    { key: "hero", label: "Hero & Banner", anchors: ["home"] },
    { key: "about", label: "About & Vision", anchors: ["about"] },
    { key: "skills", label: "Architecture & Skills", anchors: ["architecture"] },
    { key: "projects", label: "Selected Works / Projects", anchors: ["projects"] },
    { key: "experience", label: "Problem Solving & Mentorship", anchors: ["problem-solving", "mentorship"] },
    { key: "research", label: "Research", anchors: ["research"] },
    { key: "education", label: "Education", anchors: ["education"] },
    { key: "contact", label: "Contact", anchors: ["contact"] },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];

// Missing entries count as "on", so content saved before this feature keeps every section visible.
export function isSectionVisible(data: any, key: SectionKey): boolean {
    return data?.sectionVisibility?.[key] !== false;
}

export function hiddenAnchors(data: any): string[] {
    return SECTIONS.filter((s) => !isSectionVisible(data, s.key)).flatMap((s) => [...s.anchors]);
}

// Which section owns an anchor id, e.g. "mentorship" -> experience section.
export function sectionForAnchor(anchor: string) {
    return SECTIONS.find((s) => (s.anchors as readonly string[]).includes(anchor));
}
