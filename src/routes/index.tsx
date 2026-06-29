import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Atom,
  Leaf,
  Wheat,
  HeartPulse,
  ArrowRight,
  FlaskConical,
  FileText,
  CalendarDays,
} from "lucide-react";
import logoUrl from "@/assets/logo.png";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WURDKA — Research on Natural Elements, Environment & Public Health" },
      {
        name: "description",
        content:
          "Independent scientific research on natural elements in environment, food production, and public health. Based in Sulaymaniyah, Kurdistan Region, Iraq.",
      },
      { property: "og:title", content: "WURDKA — Natural Elements Research Company" },
      {
        property: "og:description",
        content:
          "For research on natural elements in environment, food production & public health.",
      },
    ],
  }),
  component: HomePage,
});

const domainKeys = [
  { Icon: Atom, key: "natural" },
  { Icon: Leaf, key: "environment" },
  { Icon: Wheat, key: "food" },
  { Icon: HeartPulse, key: "health" },
] as const;

const statsBase = [
  { value: 50, suffix: "+", labelKey: "stats.publishedStudies" },
  { value: 10000, suffix: "+", labelKey: "stats.samplesTested" },
  { value: 15, suffix: "", labelKey: "stats.partnerOrganizations" },
  { value: 2026, suffix: "", labelKey: "stats.founded", format: (n: number) => String(n) },
] as const;

// Moved to HomePage for translations

function useCountUp(target: number, duration = 1400, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function StatCounter({
  value,
  suffix,
  label,
  format,
}: {
  value: number;
  suffix: string;
  label: string;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(value, 1500, visible);
  const display = format ? format(n) : n.toLocaleString();
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-primary md:text-4xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm">
        {label}
      </div>
    </div>
  );
}

function HomePage() {
  const { t } = useTranslation();

  const partners = [
    t("index.partners.p1"),
    t("index.partners.p2"),
    t("index.partners.p3"),
    t("index.partners.p4"),
    t("index.partners.p5"),
    t("index.partners.p6"),
    t("index.partners.p7"),
    t("index.partners.p8"),
    t("index.partners.p9"),
    t("index.partners.p10"),
  ];

  const news = [
    {
      tag: t("index.news.tagEnv"),
      date: t("index.news.date1"),
      title: t("index.news.title1"),
      excerpt: t("index.news.exc1"),
    },
    {
      tag: t("index.news.tagFood"),
      date: t("index.news.date2"),
      title: t("index.news.title2"),
      excerpt: t("index.news.exc2"),
    },
    {
      tag: t("index.news.tagHealth"),
      date: t("index.news.date3"),
      title: t("index.news.title3"),
      excerpt: t("index.news.exc3"),
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.25_0.07_250)] via-primary to-[oklch(0.32_0.08_240)] text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -end-32 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-accent/20 blur-3xl lg:block"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("hero.eyebrow")}
            </p>
            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.title_pre")}
              <span className="text-accent">{t("hero.title_highlight")}</span>
              {t("hero.title_post")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-[oklch(0.22_0.05_250)] shadow-sm transition hover:brightness-95"
              >
                <FlaskConical className="h-4 w-4" />
                {t("cta.requestTest")}
              </Link>
              <Link
                to="/research"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t("cta.exploreResearch")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5 flex items-center justify-center">
            <div className="relative flex items-center justify-center rounded-full shadow-2xl ring-8 ring-white/10 transform transition-transform duration-500 hover:scale-105 w-72 h-72 mx-auto overflow-hidden bg-white">
              <img
                src={logoUrl}
                alt="WURDKA Logo"
                className="w-full h-full object-cover scale-110 object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {statsBase.map((s) => (
            <StatCounter key={s.labelKey} value={s.value} suffix={s.suffix} label={t(s.labelKey)} format={"format" in s ? s.format : undefined} />
          ))}
        </div>
      </section>

      {/* DOMAINS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            {t("domains.eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("domains.heading")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("domains.sub")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domainKeys.map(({ Icon, key }) => (
            <div
              key={key}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {t(`domains.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`domains.items.${key}.desc`)}
              </p>
              <Link
                to="/research"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100"
              >
                {t("domains.learnMore")} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                {t("publications.eyebrowLatest")}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("publications.headingRecent")}
              </h2>
            </div>
            <Link
              to="/publications"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
            >
              {t("publications.viewAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((n) => (
              <article
                key={n.title}
                className="flex flex-col rounded-xl border border-border bg-card p-6 transition hover:shadow-md"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 font-semibold text-secondary">
                    {n.tag}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {n.date}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                  {n.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {n.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary">
                  <FileText className="h-4 w-4" />
                  {t("publications.readBrief")}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y border-border bg-background py-12">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {t("publications.partnersEyebrow")}
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 px-6">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="flex h-12 shrink-0 items-center whitespace-nowrap rounded-md border border-border px-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground grayscale"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* WHY CHOOSE WURDKA */}
      <WhyChooseUs />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.35_0.08_240)] p-10 text-primary-foreground md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold md:text-3xl">
                {t("cta.sampleHeading")}
              </h2>
              <p className="mt-2 text-slate-200">
                {t("cta.sampleSub")}
              </p>
            </div>
            <div className="md:text-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-[oklch(0.22_0.05_250)] transition hover:brightness-95"
              >
                <FlaskConical className="h-4 w-4" />
                {t("cta.requestTest")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
