import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/logo.png";
import { Linkedin, Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 bg-[oklch(0.22_0.04_250)] text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logoUrl} alt="WURDKA Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-semibold">{t("brand")}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {t("brandTagline")}
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {[
              { to: "/about", label: t("nav.about") },
              { to: "/research", label: t("nav.research") },
              { to: "/services", label: t("nav.services") },
              { to: "/publications", label: t("nav.publications") },
              { to: "/contact", label: t("nav.contact") },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.researchDomains")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>{t("domains.items.natural.title")}</li>
            <li>{t("domains.items.environment.title")}</li>
            <li>{t("domains.items.food.title")}</li>
            <li>{t("domains.items.health.title")}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.contact")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{t("footer.locale")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="mailto:wurdkacompany@gmail.com" className="hover:text-accent">
                wurdkacompany@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span dir="ltr" className="inline-block text-start">+964 774 140 0101</span>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Linkedin, href: "https://linkedin.com/company/wurdka", label: "LinkedIn" },
              { Icon: Facebook, href: "https://facebook.com/wurdka", label: "Facebook" },
              { Icon: Instagram, href: "https://instagram.com/wurdka_research", label: "Instagram" },
              { Icon: Youtube, href: "https://youtube.com/@wurdka", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/10 p-2 text-slate-300 transition hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-400 sm:px-6 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} {t("brand")} — {t("brandTagline")}. {t("footer.rights")}</p>
          <p>{t("footer.locale")}</p>
        </div>
      </div>
    </footer>
  );
}
