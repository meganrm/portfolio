export interface PostTag {
    label: string;
}

export interface Post {
    id: string;
    date: string;
    read: string;
    tag: PostTag;
    title: string;
    excerpt: string;
    lead: string;
    body1: string;
    h1: string;
    body2: string;
    body3: string;
    url?: string;
    coverImage?: string;
}
