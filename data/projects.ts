export type Tone = "teal" | "mustard" | "clay" | "sage" | "ink";

export interface ProjectTag {
    label: string;
}

export interface ProjectSection {
    id: string; // URL anchor (kebab-case)
    title: string; // visible heading
    content: string[]; // body paragraphs
    image?: string; // optional accompanying image/video (right column)
    imageAlt?: string; // alt text for image
}

export interface GalleryItem {
    src: string; // image path
    alt: string; // alt text
    blurb?: string; // optional caption shown below the image
}

export interface Project {
    id: string;
    title: string;
    year: string;
    medium: string;
    role: string;
    context: string;
    tone: Tone;
    altTone: Tone;
    blurb: string;
    tags: ProjectTag[];
    lead: string;
    body1: string;
    quote: string;
    body2: string;
    body3: string;
    url?: string;
    heroImage?: string;
    heroImagePosition?: string; // CSS object-position override, default 'center'
    cardImage?: string; // overrides heroImage on the work grid card only
    screenshotImage?: string; // Template 1 right column; falls back to heroImage
    processImage?: string;
    detailImage?: string;
    public?: boolean;
    featured?: boolean; // true for homepage-featured projects
    pageTemplate: "tool" | "visual"; // determines which page template to render
    sections?: ProjectSection[]; // when present, replaces body1/quote/body2/body3 with anchored sections
    gallery?: GalleryItem[]; // when present, renders a custom gallery (used by portrait/visual collections)
}
