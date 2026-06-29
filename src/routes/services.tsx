import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Upload, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Laboratory & Services — WURDKA" },
      {
        name: "description",
        content:
          "Service catalog: laboratory testing, environmental monitoring, food safety analysis and scientific consulting with transparent turnaround times.",
      },
      { property: "og:title", content: "Laboratory & Services — WURDKA" },
      {
        property: "og:description",
        content: "Lab testing, monitoring and consulting from WURDKA.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const services = [
    { name: t("services.items.hmWater.name"), category: t("services.items.hmWater.category"), turnaround: t("services.items.hmWater.turnaround"), tier: t("services.items.hmWater.tier"), price: t("services.items.hmWater.price") },
    { name: t("services.items.hmSoil.name"), category: t("services.items.hmSoil.category"), turnaround: t("services.items.hmSoil.turnaround"), tier: t("services.items.hmSoil.tier"), price: t("services.items.hmSoil.price") },
    { name: t("services.items.teFood.name"), category: t("services.items.teFood.category"), turnaround: t("services.items.teFood.turnaround"), tier: t("services.items.teFood.tier"), price: t("services.items.teFood.price") },
    { name: t("services.items.prScreen.name"), category: t("services.items.prScreen.category"), turnaround: t("services.items.prScreen.turnaround"), tier: t("services.items.prScreen.tier"), price: t("services.items.prScreen.price") },
    { name: t("services.items.dwComp.name"), category: t("services.items.dwComp.category"), turnaround: t("services.items.dwComp.turnaround"), tier: t("services.items.dwComp.tier"), price: t("services.items.dwComp.price") },
    { name: t("services.items.esa.name"), category: t("services.items.esa.category"), turnaround: t("services.items.esa.turnaround"), tier: t("services.items.esa.tier"), price: t("services.items.esa.price") },
    { name: t("services.items.fsa.name"), category: t("services.items.fsa.category"), turnaround: t("services.items.fsa.turnaround"), tier: t("services.items.fsa.tier"), price: t("services.items.fsa.price") },
    { name: t("services.items.bp.name"), category: t("services.items.bp.category"), turnaround: t("services.items.bp.turnaround"), tier: t("services.items.bp.tier"), price: t("services.items.bp.price") },
  ];

  const steps = [
    { title: t("services.step1Title"), desc: t("services.step1Desc") },
    { title: t("services.step2Title"), desc: t("services.step2Desc") },
    { title: t("services.step3Title"), desc: t("services.step3Desc") },
    { title: t("services.step4Title"), desc: t("services.step4Desc") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
      />

      {/* Service catalog */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{t("services.catalogEyebrow")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("services.catalogTitle")}
          </h2>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-surface text-start">
                <tr>
                  <th className="px-4 py-3 font-semibold text-foreground">{t("services.catalogThService")}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{t("services.catalogThCategory")}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{t("services.catalogThTurnaround")}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{t("services.catalogThTier")}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{t("services.catalogThPrice")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map((s) => (
                  <tr key={s.name} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.turnaround}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary">
                        {s.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">{s.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {t("services.catalogNote")}
        </p>
      </section>

      {/* Submission portal */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              {t("services.portalEyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("services.portalTitle")}
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <ol className="mb-8 grid gap-3 sm:grid-cols-4">
              {steps.map((s, i) => {
                const active = i === step;
                const done = i < step;
                return (
                  <li
                    key={s.title}
                    className={`rounded-lg border p-3 text-start transition ${
                      active
                        ? "border-primary bg-primary/5"
                        : done
                          ? "border-secondary/30 bg-secondary/5"
                          : "border-border bg-background"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          done
                            ? "bg-secondary text-secondary-foreground"
                            : active
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{s.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                  </li>
                );
              })}
            </ol>

            <div className="min-h-[220px] rounded-lg border border-dashed border-border bg-background p-6">
              {step === 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label={t("services.formSampleType")} placeholder={t("services.formSampleTypePh")} />
                  <Field label={t("services.formMatrix")} placeholder={t("services.formMatrixPh")} />
                  <Field label={t("services.formQuantity")} placeholder={t("services.formQuantityPh")} />
                  <Field label={t("services.formCollectionDate")} type="date" />
                </div>
              )}
              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label={t("services.formPanel")} placeholder={t("services.formPanelPh")} />
                  <Field label={t("services.formAnalytes")} placeholder={t("services.formAnalytesPh")} />
                  <Field label={t("services.formUrgency")} placeholder={t("services.formUrgencyPh")} />
                  <Field label={t("services.formNotes")} placeholder={t("services.formNotesPh")} />
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label={t("services.formOrg")} placeholder={t("services.formOrgPh")} />
                  <Field label={t("services.formContact")} placeholder={t("services.formContactPh")} />
                  <Field label={t("services.formEmail")} type="email" placeholder={t("services.formEmailPh")} />
                  <Field label={t("services.formPhone")} placeholder={t("services.formPhonePh")} />
                </div>
              )}
              {step === 3 && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t("services.submitReady")}</p>
                  <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    {t("services.submitDesc")}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> {t("services.btnBack")}
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  {t("services.btnContinue")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              ) : (
                <button className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:opacity-90">
                  <FileText className="h-4 w-4" /> {t("services.btnSubmit")}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
