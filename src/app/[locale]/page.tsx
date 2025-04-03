import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";

interface Params {
  params: {
    locale: string;
  };
}

export default async function IndexPage({ params }: Params) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // 서버 컴포넌트에서는 getTranslations 사용
  const t = await getTranslations("HomePage");
  const t2 = await getTranslations("HomePage2");
  const menu = await getTranslations("menu");

  const menuArr = [
    { id: "home", href: "/home" },
    { id: "products", href: "/products" },
    { id: "about", href: "/about" },
    { id: "contact", href: "/contact" },
  ];

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
      <h1>{t2("title")}</h1>
      <Link href="/about">{t2("about")}</Link>

      <nav>
        {menuArr.map((item) => (
          <Link key={item.id} href={`/${locale}/menu/${item.id}`}>
            {menu(item.id)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
