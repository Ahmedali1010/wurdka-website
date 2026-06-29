import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Users2,
  Lightbulb,
  Microscope,
  FlaskConical,
  Stethoscope,
  Sprout,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About WURDKA — Mission, Values & Team" },
      {
        name: "description",
        content:
          "Founded in 2026, WURDKA bridges scientific discovery with real-world application across environment, food production and public health.",
      },
      { property: "og:title", content: "About WURDKA" },
      {
        property: "og:description",
        content: "Mission, vision, core values and the multidisciplinary team behind WURDKA.",
      },
    ],
  }),
  component: AboutPage,
});

const valueDefs = [
  { Icon: ShieldCheck, tKey: "vIntegrity" },
  { Icon: HeartHandshake, tKey: "vPublic" },
  { Icon: Leaf, tKey: "vEnv" },
  { Icon: Users2, tKey: "vCollab" },
  { Icon: Lightbulb, tKey: "vInnov" },
] as const;

const teamDefs = [
  { name: "Dr. A. Saeed", roleKey: "roleDirector", tagKey: "tagChemist", Icon: FlaskConical },
  { name: "Dr. L. Hassan", roleKey: "roleHealth", tagKey: "tagEpi", Icon: Stethoscope },
  { name: "Dr. M. Karim", roleKey: "roleLab", tagKey: "tagAnalytical", Icon: Microscope },
  { name: "Dr. S. Ahmad", roleKey: "roleSenior", tagKey: "tagEnvsci", Icon: Sprout },
] as const;

function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.heroTitle")}
        subtitle={t("about.heroSubtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{t("about.visionEyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{t("about.visionTitle")}</h2>
            <p className="mt-4 text-muted-foreground">{t("about.visionBody")}</p>
          </div>
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("about.missionEyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold">{t("about.missionTitle")}</h2>
            <p className="mt-4 text-slate-200">{t("about.missionBody")}</p>
          </div>
        </div>

        <dl className="mt-12 grid gap-4 rounded-xl border border-border bg-surface p-6 text-sm md:grid-cols-4">
          {[
            ["factFounded", "factFoundedVal"],
            ["factHq", "factHqVal"],
            ["factLegal", "factLegalVal"],
            ["factLanguages", "factLanguagesVal"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(`about.${k}`)}</dt>
              <dd className="mt-1 font-semibold text-foreground">{t(`about.${v}`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{t("about.valuesEyebrow")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("about.valuesHeading")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {valueDefs.map(({ Icon, tKey }) => (
              <div key={tKey} className="rounded-xl border border-border bg-card p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{t(`about.${tKey}T`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`about.${tKey}D`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{t("about.teamEyebrow")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("about.teamHeading")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("about.teamSub")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamDefs.map((p) => {
            const Icon = p.Icon;
            return (
              <div key={p.name} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background text-primary shadow-sm">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{t(`about.${p.roleKey}`)}</p>
                  <span className="mt-3 inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-[oklch(0.45_0.10_80)]">
                    {t(`about.${p.tagKey}`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
