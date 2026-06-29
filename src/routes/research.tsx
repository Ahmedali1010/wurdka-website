import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Download, Leaf, Wheat, HeartPulse, Atom } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Areas — WURDKA" },
      {
        name: "description",
        content:
          "Four integrated research domains: environment, food, public health and natural elements analysis, plus interactive data visualizations.",
      },
      { property: "og:title", content: "Research Areas — WURDKA" },
      {
        property: "og:description",
        content: "Environment, food, public health and natural elements research at WURDKA.",
      },
    ],
  }),
  component: ResearchPage,
});

const domainDefs = [
  { Icon: Leaf, key: "env" },
  { Icon: Wheat, key: "food" },
  { Icon: HeartPulse, key: "health" },
  { Icon: Atom, key: "natural" },
] as const;

const chartData = [
  { year: "2021", lead: 38, cadmium: 14, arsenic: 22 },
  { year: "2022", lead: 35, cadmium: 13, arsenic: 20 },
  { year: "2023", lead: 30, cadmium: 12, arsenic: 19 },
  { year: "2024", lead: 27, cadmium: 11, arsenic: 17 },
  { year: "2025", lead: 23, cadmium: 9, arsenic: 15 },
  { year: "2026", lead: 19, cadmium: 8, arsenic: 13 },
];

function ResearchPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("research.eyebrow")}
        title={t("research.heroTitle")}
        subtitle={t("research.heroSubtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {domainDefs.map(({ Icon, key }, i) => (
            <div
              key={key}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-[5/4] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/15">
                <div className="flex h-full w-full items-center justify-center">
                  <Icon className="h-28 w-28 text-primary/40" strokeWidth={1.2} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  {t('research.domainFormat', { num: String(i + 1).padStart(2, "0") })}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{t(`research.${key}Title`)}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t(`research.${key}Desc`)}</p>
                <ul className="mt-5 space-y-2">
                  {["B1", "B2", "B3"].map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                      {t(`research.${key}${b}`)}
                    </li>
                  ))}
                </ul>
                <button className="mt-7 inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
                  <Download className="h-4 w-4" />
                  {t("research.downloadReport")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                {t("research.chartEyebrow")}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("research.chartHeading")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("research.chartSub")}</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="lead" name={t("research.legendLead")} stroke="var(--brand-deep)" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="cadmium" name={t("research.legendCadmium")} stroke="var(--brand-green)" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="arsenic" name={t("research.legendArsenic")} stroke="var(--brand-gold)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
