import Inner from "@/components/layout/Inner";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const BannerTop = async () => {
  const t1 = await getTranslations("BannerTop1");
  const t2 = await getTranslations("BannerTop2");
  const keys1 = ["element1", "element2"] as const;
  const keys2 = ["element1", "element2"] as const;

  return (
    <div className="border-b border-b-slate-200 bg-white">
      <Inner>
        <div className="flex items-center justify-between">
          <div className="flex">
            <div className="flex items-center gap-4 text-xs">
              {keys1.map((key) => (
                <div key={t1(`${key}.label`)}>
                  <Link href={t1(`${key}.href`)}>{t1(`${key}.title`)}</Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 text-xs">
              {keys2.map((key) => (
                <div key={t2(`${key}.label`)}>
                  <Link href={t2(`${key}.href`)}>{t2(`${key}.title`)}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Inner>
    </div>
  );
};

export default BannerTop;
