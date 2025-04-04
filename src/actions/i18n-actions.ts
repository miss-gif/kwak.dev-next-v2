"use server";

import { getTranslations } from "next-intl/server";

const fetchTranslations = async (namespace: string, keys: string[]) => {
  const t = await getTranslations(namespace);
  return Object.fromEntries(keys.map((key) => [key, t(key)]));
};

export const fetch_i18n = async () =>
  await fetchTranslations("Header-Bottom-light", [
    "main",
    "todos",
    "note",
    "notice",
  ]);

export const fetch_i18n_1 = async () =>
  await fetchTranslations("Header-Top-light-login", [
    "login",
    "easyLogin",
    "email",
    "password",
  ]);
