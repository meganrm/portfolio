/** Split a multi-paragraph content string (blank-line separated) into paragraphs. */
export function paragraphs(text?: string): string[] {
  return (text ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
}
