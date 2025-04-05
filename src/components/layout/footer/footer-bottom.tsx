import Inner from "@/components/layout/Inner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const FooterBottom = async () => {
  const t1 = await getTranslations("FooterButtom1");
  const t2 = await getTranslations("FooterButtom2");

  const keys1 = ["element1"] as const;
  const keys2 = ["element1", "element2", "element3"] as const;

  return (
    <Inner>
      <div className="flex flex-col md:flex-row justify-between items-end py-2">
        <div className="grid gap-4">
          <h1 className="text-lg font-bold">{t1("logo")}</h1>
          <div className="space-y-1">
            <p className="text-sm">{t1("text1")}</p>
            <p className="text-sm">{t1("text2")}</p>
            <p className="text-sm">{t1("text3")}</p>
          </div>
          <div>
            {keys1.map((key) => (
              <Button key={t1(`${key}.label`)}>
                <Link
                  href={t1(`${key}.href`)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  {t1(`${key}.title`)}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {keys2.map((key) => (
            <div key={t2(`${key}.label`)}>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={t2(`${key}.href`)}
                className="text-sm text-blue-400 hover:underline p-2 bg-gray-500 block rounded-full"
              >
                <Image
                  src={t2(`${key}.iconUrl`)}
                  alt={t2(`${key}.label`)}
                  width={28}
                  height={28}
                  style={{ width: 28, height: 28 }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Inner>
  );
};

export default FooterBottom;
