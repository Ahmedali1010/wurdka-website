import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, FlaskConical } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/logo.png";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/research", label: t("nav.research") },
    { to: "/services", label: t("nav.services") },
    { to: "/publications", label: t("nav.publications") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logoUrl} alt="WURDKA Logo" className="h-12 w-auto object-contain" />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight text-primary">{t("brand")}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {t("brandTagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium text-foreground/75 transition hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <FlaskConical className="h-4 w-4" />
            {t("cta.requestTest")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <FlaskConical className="h-4 w-4" />
              {t("cta.requestTest")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
