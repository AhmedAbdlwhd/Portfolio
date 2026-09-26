import type { Metadata } from "next";
import { About } from "@/components/home/about";
import { Certifications } from "@/components/home/certifications";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Featured } from "@/components/home/featured";
import { Hero } from "@/components/home/hero";
import { getCertifications } from "@/lib/certifications";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Structured data: helps search engines show who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.tagline,
  email: `mailto:${site.email}`,
  url: siteUrl,
  sameAs: [site.links.github, site.links.linkedin, site.links.credly],
  alumniOf: { "@type": "CollegeOrUniversity", name: "UCSI University" },
  knowsAbout: site.skills.filter((s) => s.group !== "Languages").flatMap((s) => s.items),
};

export default async function Home() {
  const projects = getProjects();
  const certs = await getCertifications();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero projectCount={projects.length} certCount={certs.length} />
      <Featured projects={getFeaturedProjects()} />
      <Experience />
      <Certifications certs={certs} />
      <About />
      <Contact />
    </>
  );
}
