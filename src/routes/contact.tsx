import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, MessageCircle, Send, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact WURDKA — Lab Testing, Consulting & Partnerships" },
      {
        name: "description",
        content:
          "Get in touch with WURDKA for laboratory testing, scientific consulting or research partnerships. Based in Sulaymaniyah, Kurdistan Region, Iraq.",
      },
      { property: "og:title", content: "Contact WURDKA" },
      {
        property: "og:description",
        content: "Request lab testing, consulting or partnerships from WURDKA.",
      },
    ],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    inquiry: "lab",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    // Client-side validation
    const ee: Errors = {};
    if (!form.name.trim()) ee.name = t("contact.errName");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) ee.email = t("contact.errEmail");
    if (form.message.trim().length < 10) ee.message = t("contact.errMessage");
    setErrors(ee);
    if (Object.keys(ee).length > 0) return;

    setStatus("submitting");

    const formData = new FormData();
    formData.append("access_key", "81336d40-dcbd-4c20-a1d7-5291a3a24282");
    formData.append(
      "subject",
      `New WURDKA Inquiry: ${form.inquiry || "General"} from ${form.name}`
    );
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("organization", form.organization || "N/A");
    formData.append("inquiry_type", form.inquiry || "General");
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", organization: "", inquiry: "lab", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow={t("nav.contact")}
        title={t("contact.heroTitle")}
        subtitle={t("contact.heroSubtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-border bg-card p-6 md:p-8 lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-foreground">{t("contact.sendInquiry")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("contact.required")}</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label={t("contact.fullName")}
                value={form.name}
                onChange={(v) => update("name", v)}
                error={errors.name}
                placeholder={t("contact.fullNamePh")}
              />
              <Field
                label={t("contact.emailLabel")}
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder={t("contact.emailPh")}
              />
              <Field
                label={t("contact.organization")}
                value={form.organization}
                onChange={(v) => update("organization", v)}
                placeholder={t("contact.organizationPh")}
              />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("contact.inquiryType")}
                </span>
                <select
                  value={form.inquiry}
                  onChange={(e) => update("inquiry", e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="lab">{t("contact.inquiry.lab")}</option>
                  <option value="consulting">{t("contact.inquiry.consulting")}</option>
                  <option value="partnership">{t("contact.inquiry.partnership")}</option>
                  <option value="media">{t("contact.inquiry.media")}</option>
                </select>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("contact.message")}
              </span>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={t("contact.messagePh")}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 ${
                  errors.message
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-input focus:border-primary focus:ring-primary/20"
                }`}
              />
              {errors.message && (
                <span className="mt-1 block text-xs text-destructive">{errors.message}</span>
              )}
            </label>

            {/* Success banner */}
            {status === "success" && (
              <div className="mt-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{t("contact.queued")} — {t("contact.replyTime")}</span>
              </div>
            )}

            {/* Error banner */}
            {status === "error" && (
              <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Something went wrong. Please try again or email us directly at wurdkacompany@gmail.com.
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> {t("contact.send")}
                  </>
                )}
              </button>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">{t("contact.info")}</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <Info Icon={MapPin} label={t("contact.address")}>
                  {t("contact.addressLine")}
                </Info>
                <Info Icon={Phone} label={t("contact.phone")}>
                  <a href="tel:+9647741400101" className="hover:text-primary"><span dir="ltr" className="inline-block text-start">+964 774 140 0101</span></a>
                  <br />
                  <a href="tel:+9647501264636" className="hover:text-primary"><span dir="ltr" className="inline-block text-start">+964 750 126 4636</span></a>
                </Info>
                <Info Icon={Mail} label={t("contact.email")}>
                  <a href="mailto:wurdkacompany@gmail.com" className="hover:text-primary">
                    wurdkacompany@gmail.com
                  </a>
                </Info>
                <Info Icon={MessageCircle} label={t("contact.whatsapp")}>
                  <a
                    href="https://wa.me/9647741400101"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary"
                  >
                    {t("contact.chatWhatsapp")}
                  </a>
                </Info>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <iframe
                title="WURDKA office location"
                src="https://www.google.com/maps?q=35.5830761,45.4211753&z=15&output=embed"
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-4 py-3 text-xs text-muted-foreground">
                {t("contact.mapCaption")}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}


function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
            : "border-input focus:border-primary focus:ring-primary/20"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Info({
  Icon,
  label,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-foreground">{children}</div>
      </div>
    </li>
  );
}
