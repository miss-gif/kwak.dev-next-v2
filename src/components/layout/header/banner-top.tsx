import Inner from "@/components/layout/Inner";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const BannerTop = async () => {
  // 서버 컴포넌트에서는 getTranslations 사용
  const t1 = await getTranslations("Bnner-Top-left");
  const t2 = await getTranslations("Bnner-Top-light");

  const t1Arr = [
    { id: "website", href: "/website" },
    { id: "blog", href: "/blog" },
  ];

  const t2Arr = [
    { id: "contact", href: "/contact" },
    { id: "admin", href: "/admin" },
  ];

  return (
    <div className="border-b border-b-slate-200 bg-white">
      <Inner>
        <div className="flex items-center justify-between">
          <div className="flex">
            <div className="flex items-center gap-4 text-xs">
              {t1Arr.map((item) => (
                <Link key={item.id} href={item.href}>
                  {t1(item.id)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 text-xs">
              {t2Arr.map((item) => (
                <Link key={item.id} href={item.href}>
                  {t2(item.id)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Inner>
    </div>
  );
};

export default BannerTop;
