import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLocale } from "./config";
import en from "@/messages/en/en";
import ar from "@/messages/ar/ar";

const resources = { en, ar } as const;

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  defaultNS: "common",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
