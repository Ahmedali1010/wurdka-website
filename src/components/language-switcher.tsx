import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { setLanguage } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = i18n.language === "ku" ? "ku" : "en";
  const next = current === "en" ? "ku" : "en";
  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      aria-label={`Switch language to ${next === "ku" ? "Kurdish" : "English"}`}
      className={`inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted ${className}`}
    >
      <Languages className="h-3.5 w-3.5" />
      <span className={current === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
      <span className="text-muted-foreground">/</span>
      <span className={current === "ku" ? "text-primary" : "text-muted-foreground"}>KU</span>
    </button>
  );
}
