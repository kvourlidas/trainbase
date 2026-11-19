"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Arrow } from "@/components/ui/Button";

export type AuthTab = "login" | "signup";

type Props = {
  open: boolean;
  tab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
  onClose: () => void;
};

/**
 * Two-column auth modal from the reference. Phase 3 swaps the form side for
 * Clerk's sign-in / sign-up, restyled to this exact look.
 */
export function AuthModal({ open, tab, onTabChange, onClose }: Props) {
  const t = useTranslations("auth");
  const ta = useTranslations("a11y");
  const id = useId();
  const [notice, setNotice] = useState(false);

  return (
    <Modal open={open} onClose={onClose} label={t("dialogLabel")} closeLabel={ta("close")}>
      <div className="mside" aria-hidden="true">
        <div>
          <span className="mono acc">{t("membersArea")}</span>
        </div>
        <h2>
          {t("sideTitle")
            .split(" ")
            .map((w, i, all) =>
              i < all.length - 1 ? (
                <span key={i}>
                  {w}
                  <br />
                </span>
              ) : (
                <span key={i}>
                  {w}
                  <span className="acc">.</span>
                </span>
              ),
            )}
        </h2>
        <svg className="rings" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#FF4F1F" strokeWidth="8" strokeDasharray="400 600" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(239,237,231,.3)" strokeDasharray="2 5" />
        </svg>
      </div>
      <form
        className="mform"
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(true);
        }}
      >
        <div className="tabs" role="tablist">
          {(["login", "signup"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => {
                onTabChange(k);
                setNotice(false);
              }}
            >
              {t(k)}
            </button>
          ))}
        </div>
        {tab === "signup" && (
          <div className="f">
            <label className="mono" htmlFor={`${id}-name`}>
              {t("name")}
            </label>
            <input id={`${id}-name`} name="name" autoComplete="name" />
          </div>
        )}
        <div className="f">
          <label className="mono" htmlFor={`${id}-email`}>
            {t("email")}
          </label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required />
        </div>
        <div className="f">
          <label className="mono" htmlFor={`${id}-pass`}>
            {t("password")}
          </label>
          <input
            id={`${id}-pass`}
            name="password"
            type="password"
            autoComplete={tab === "signup" ? "new-password" : "current-password"}
            required
          />
        </div>
        <button type="submit" className="btn btn-ink">
          <span>{tab === "signup" ? t("submitSignup") : t("submitLogin")}</span> <Arrow />
        </button>
        <p className="mono muted" role="status" style={{ marginTop: 14, minHeight: 16 }}>
          {notice ? t("unavailable") : ""}
        </p>
      </form>
    </Modal>
  );
}
