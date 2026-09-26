import { Marked } from "marked";

// Content comes only from our own /content files, so rendering it as HTML is safe.
const marked = new Marked({
  gfm: true,
  renderer: {
    // External links open in a new tab.
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const attrs = [
        `href="${href}"`,
        title ? `title="${title}"` : "",
        external ? `target="_blank" rel="noopener noreferrer"` : "",
      ].join(" ");
      return `<a ${attrs}>${text}</a>`;
    },
  },
});

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false });
}
