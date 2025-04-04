import Inner from "@/components/layout/Inner";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";

const FooterTop = async () => {
  const translationKeys = [
    "FooterTop1",
    "FooterTop2",
    "FooterTop3",
    "FooterTop4",
    "FooterTop5",
  ];

  const keys = [
    ["element1", "element2", "element3"],
    ["element1"],
    ["element1", "element2"],
    ["element1"],
    ["element1"],
  ] as const;

  const translations = await Promise.all(
    translationKeys.map((key) => getTranslations(key))
  );

  return (
    <Inner>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 text-sm py-10 border-b border-gray-600">
        {keys.map((keyGroup, index) => {
          const translation = translations[index];
          return (
            <li key={index} className="flex flex-col gap-2">
              {keyGroup.map((key) => (
                <Link
                  href={translation(`${key}.href`)}
                  key={translation(`${key}.label`)}
                >
                  {translation(`${key}.title`)}
                </Link>
              ))}
            </li>
          );
        })}
      </ul>
    </Inner>
  );
};

export default FooterTop;
