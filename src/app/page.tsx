import { About } from "@/components/home/about";
import { Certifications } from "@/components/home/certifications";
import { Contact } from "@/components/home/contact";
import { Featured } from "@/components/home/featured";
import { Hero } from "@/components/home/hero";
import { getCertifications } from "@/lib/certifications";
import { getFeaturedProjects, getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = getProjects();
  const certs = await getCertifications();

  return (
    <>
      <Hero projectCount={projects.length} certCount={certs.length} />
      <Featured projects={getFeaturedProjects()} />
      <Certifications certs={certs} />
      <About />
      <Contact />
    </>
  );
}
