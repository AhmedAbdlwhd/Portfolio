import { Reveal } from "@/components/motion";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, action, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
          <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        {action}
      </Reveal>
      <Reveal delay={0.1}>{children}</Reveal>
    </section>
  );
}
