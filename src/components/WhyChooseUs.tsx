import { useTranslation } from "react-i18next";
import { Globe, Users, Microscope, Scale, HeartHandshake, FileText } from "lucide-react";

const icons = [Globe, Users, Microscope, Scale, HeartHandshake, FileText];

export function WhyChooseUs() {
  const { t } = useTranslation();

  const points = [1, 2, 3, 4, 5, 6] as const;

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            WURDKA
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("why_choose_wurdka_title")}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary/40" />
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {points.map((num) => {
            const Icon = icons[num - 1];
            return (
              <div
                key={num}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t(`why_${num}_title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`why_${num}_desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
