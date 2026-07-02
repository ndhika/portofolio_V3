import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseFilter from "@/components/NoiseFilter";
import ContactSection from "@/components/ContactSection";
import MagneticButton from "@/components/MagneticButton";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <CustomCursor />
      <Navbar />
      <SmoothScroll>
        <NoiseFilter />
        <main
          className="relative min-h-screen pt-32 pb-24"
          style={{ background: "var(--bg)" }}
        >
          {/* Header */}
          <div className="px-6 md:px-12 lg:px-20 max-w-[1300px] mx-auto mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
              <div className="max-w-2xl">
                <span
                  className="text-label block mb-6"
                  style={{ color: "var(--text-dim)" }}
                >
                  {project.category} — {project.year}
                </span>
                <h1
                  className="font-display font-medium"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: "0.9",
                    color: "var(--text)",
                    marginBottom: "2rem",
                  }}
                >
                  {project.title}
                </h1>
                <p
                  className="text-lg md:text-xl"
                  style={{ color: "var(--text-muted)", lineHeight: "1.6" }}
                >
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col gap-6 md:text-right">
                <div>
                  <span
                    className="text-label block mb-2"
                    style={{ color: "var(--text-dim)" }}
                  >
                    Role
                  </span>
                  <span style={{ color: "var(--text)" }}>Development</span>
                </div>
                <div>
                  <span
                    className="text-label block mb-2"
                    style={{ color: "var(--text-dim)" }}
                  >
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-2 md:justify-end max-w-[250px]">
                    {project.tech.map((t) => (
                      <span key={t} style={{ color: "var(--text)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {project.link !== "#" && (
                  <div className="mt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-grow inline-block"
                      style={{ color: "var(--text)" }}
                      data-cursor-hover
                    >
                      Visit Live Site ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-40">
            <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-neutral-200">
              <div className="shimmer absolute inset-0 z-0" />
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover relative z-10"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          </div>

          {/* Next Project Nav */}
          <div
            className="px-6 md:px-12 lg:px-20 max-w-[1300px] mx-auto py-24 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex flex-col items-center text-center">
              <span
                className="text-label mb-6"
                style={{ color: "var(--text-dim)" }}
              >
                Next Project
              </span>
              <Link
                href={`/works/${nextProject.slug}`}
                className="group inline-block"
                data-cursor-hover
              >
                <h2
                  className="font-display font-medium group-hover:italic transition-all duration-500"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    letterSpacing: "-0.03em",
                    color: "var(--text)",
                  }}
                >
                  {nextProject.title}
                </h2>
              </Link>
            </div>
          </div>

          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  );
}
