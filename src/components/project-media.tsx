import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

/** `eager`: the cover image at the top of the page loads right away (good for page speed scores). */
export function Figure({ image, eager = false }: { image: ProjectImage; eager?: boolean }) {
  return (
    // Never stretch an image past its real size (small charts would go blurry).
    <figure className="mx-auto w-full space-y-3" style={{ maxWidth: image.width + 16 }}>
      <div className="card overflow-hidden !rounded-[24px] p-2">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full rounded-[18px]"
        />
      </div>
      {image.caption && <figcaption className="px-2 text-sm text-muted">{image.caption}</figcaption>}
    </figure>
  );
}

/** YouTube links become a privacy-friendly embed; anything else is treated as a video file. */
export function DemoVideo({ url, title }: { url: string; title: string }) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  return (
    <div className="card overflow-hidden !rounded-[24px] p-2">
      <div className="aspect-video overflow-hidden rounded-[18px] bg-bg">
        {yt ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${yt[1]}`}
            title={`${title} — demo video`}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            className="size-full"
          />
        ) : (
          <video src={url} controls preload="metadata" className="size-full" aria-label={`${title} — demo video`} />
        )}
      </div>
    </div>
  );
}

/** Live app inside the page. Some hosts block embedding, so there's always an "open in new tab" link too. */
export function LiveEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="card overflow-hidden !rounded-[24px] p-2">
      <iframe
        src={url}
        title={`${title} — live demo`}
        loading="lazy"
        className="h-[70vh] min-h-[480px] w-full rounded-[18px] bg-bg"
      />
    </div>
  );
}
