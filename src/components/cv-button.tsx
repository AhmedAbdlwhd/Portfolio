import { hasCv } from "@/lib/cv";
import { site } from "@/lib/site";

export function CvButton() {
  if (!hasCv()) return null;
  return (
    <a href="/cv.pdf" download={`${site.name.replace(/ /g, "-")}-CV.pdf`} className="btn btn-glass glass">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
      </svg>
      Download CV
    </a>
  );
}
