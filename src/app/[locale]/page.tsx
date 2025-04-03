import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";

interface Params {
  params: {
    locale: string;
  };
}

export default async function IndexPage({ params }: Params) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  // 서버 컴포넌트에서는 getTranslations 사용
  const t = await getTranslations("HomePage");

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
    </div>
  );
}
