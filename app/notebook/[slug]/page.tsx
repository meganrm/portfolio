import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Tag from "@/components/Tag";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { POSTS } from "@/lib/content";
import type { Metadata } from "next";

export function generateStaticParams() {
    return POSTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = POSTS.find((p) => p.id === params.slug);
    if (!post) return {};
    return { title: `${post.title} — Megan Riel-Mehan` };
}

export default function PostPage({ params }: { params: { slug: string } }) {
    const post = POSTS.find((p) => p.id === params.slug);
    if (!post) notFound();

    const imgTone = post.tag.label === "Fine Art" ? "clay" : "teal";

    return (
        <main>
            <div className="container">
                <Link href="/notebook" className="back">
                    <ArrowLeft size={16} /> Notebook
                </Link>
                <header className="article-head">
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                        }}
                    >
                        <Tag>{post.tag.label}</Tag>
                        <span className="meta">
                            {post.date} · {post.read}
                        </span>
                    </div>
                    <h1 className="article-title">{post.title}</h1>
                    <div className="article-byline">
                        <div className="avatar">MR</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>
                                Megan Riel-Mehan
                            </div>
                            <div className="meta" style={{ fontSize: 12 }}>
                                Scientific Visualization
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            <div className="container article-hero">
                {post.coverImage ? (
                    <div
                        className="imgph"
                        style={{ position: "relative", aspectRatio: "16 / 9" }}
                    >
                        <Image
                            src={post.coverImage}
                            alt={`${post.title} cover`}
                            fill
                            sizes="(max-width: 860px) 100vw, 860px"
                            style={{ objectFit: "cover" }}
                            unoptimized={post.coverImage.endsWith(".gif")}
                        />
                    </div>
                ) : (
                    <ImagePlaceholder tone={imgTone} label="Cover" />
                )}
            </div>

            <div className="container">
                <div className="article-body prose-col">
                    <p style={{ fontSize: 21, color: "var(--ink-2)" }}>
                        {post.lead}
                    </p>
                    <p>{post.body1}</p>
                    <h3>{post.h1}</h3>
                    <p>{post.body2}</p>
                    <p>{post.body3}</p>
                    {post.url && (
                        <p>
                            <a
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-arrow"
                            >
                                Read the paper <ExternalLink size={15} />
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
