import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, FileText, Filter, Microscope, Wheat, Leaf, HeartPulse } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications & Media — WURDKA" },
      {
        name: "description",
        content:
          "Peer-reviewed papers, policy reports and media gallery from WURDKA's research programmes.",
      },
      { property: "og:title", content: "Publications & Media — WURDKA" },
      {
        property: "og:description",
        content: "Browse peer-reviewed papers, policy reports and fieldwork media from WURDKA.",
      },
    ],
  }),
  component: PublicationsPage,
});

const papers = [
  { title: "Heavy Metal Distribution in the Tanjero River Basin", typeKey: "peer", domainKey: "environment", year: 2026 },
  { title: "Cadmium Levels in Locally Grown Cereals: A Regional Survey", typeKey: "peer", domainKey: "food", year: 2026 },
  { title: "Iodine Status in School-Age Children: Baseline 2026", typeKey: "policy", domainKey: "health", year: 2026 },
  { title: "Arsenic Contamination of Irrigation Water in Rural Sulaymaniyah", typeKey: "brief", domainKey: "environment", year: 2025 },
  { title: "Trace Element Profile of Kurdish Honeys", typeKey: "peer", domainKey: "food", year: 2025 },
  { title: "Air Quality and Respiratory Outcomes near Industrial Zones", typeKey: "policy", domainKey: "health", year: 2025 },
];

const typeKeys = ["all", "peer", "policy", "brief"] as const;
const domainKeys = ["all", "environment", "food", "health"] as const;

const galleryGradients = [
  "from-primary/30 via-primary/10 to-secondary/30",
  "from-secondary/30 via-accent/15 to-primary/20",
  "from-accent/30 via-secondary/15 to-primary/30",
  "from-primary/25 via-accent/20 to-secondary/25",
  "from-secondary/30 via-primary/20 to-accent/20",
  "from-accent/30 via-primary/15 to-secondary/25",
];

const galleryIcons = [Microscope, Leaf, Wheat, HeartPulse, Microscope, Leaf];

function PublicationsPage() {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof typeKeys)[number]>("all");
  const [domain, setDomain] = useState<(typeof domainKeys)[number]>("all");

  const galleryLabels = [
    t("publications.gallery.lab", { defaultValue: "Laboratory analysis" }),
    t("publications.gallery.field", { defaultValue: "Field sampling — watershed" }),
    t("publications.gallery.cereal", { defaultValue: "Cereal grain survey" }),
    t("publications.gallery.community", { defaultValue: "Community health screening" }),
    t("publications.gallery.spectroscopy", { defaultValue: "Spectroscopy workstation" }),
    t("publications.gallery.soil", { defaultValue: "Soil sampling — agricultural plot" }),
  ];

  const filtered = useMemo(
    () =>
      papers.filter(
        (p) =>
          (type === "all" || p.typeKey === type) &&
          (domain === "all" || p.domainKey === domain) &&
          (q.trim() === "" || p.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, type, domain],
  );

  return (
    <>
      <PageHero
        eyebrow={t("publications.eyebrow")}
        title={t("publications.heroTitle")}
        subtitle={t("publications.heroSubtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{t("publications.libraryEyebrow")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("publications.libraryHeading")}
            </h2>
          </div>
          <div className="grid w-full max-w-2xl gap-3 md:grid-cols-3">
            <div className="relative md:col-span-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("publications.searchPh")}
                className="w-full rounded-md border border-input bg-background ps-9 pe-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Select
              label={t("publications.typeLabel")}
              value={type}
              onChange={(v) => setType(v as (typeof typeKeys)[number])}
              options={typeKeys.map((k) => ({ value: k, label: t(`publications.types.${k}`) }))}
            />
            <Select
              label={t("publications.domainLabel")}
              value={domain}
              onChange={(v) => setDomain(v as (typeof domainKeys)[number])}
              options={domainKeys.map((k) => ({ value: k, label: t(`publications.filterDomains.${k}`) }))}
            />
          </div>
        </div>

        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {filtered.map((p) => (
            <li
              key={p.title}
              className="flex flex-col gap-3 p-5 transition hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{p.year}</span>
                    <span>·</span>
                    <span>{t(`publications.filterDomains.${p.domainKey}`)}</span>
                    <span className="rounded-full bg-secondary/10 px-2 py-0.5 font-semibold text-secondary">
                      {t(`publications.types.${p.typeKey}`)}
                    </span>
                  </p>
                </div>
              </div>
              <button className="self-start rounded-md border border-input bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted sm:self-auto">
                {t("publications.downloadPdf")}
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="p-8 text-center text-sm text-muted-foreground">
              <Filter className="mx-auto mb-2 h-5 w-5" />
              {t("publications.noResults")}
            </li>
          )}
        </ul>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{t("publications.galleryEyebrow")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("publications.galleryHeading")}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryGradients.map((g, i) => {
              const Icon = galleryIcons[i];
              return (
                <figure key={i} className="group relative overflow-hidden rounded-xl border border-border">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${g} flex items-center justify-center`}>
                    <Icon className="h-14 w-14 text-primary/40" strokeWidth={1.2} />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-medium text-white">
                    {galleryLabels[i]}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {label}: {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
