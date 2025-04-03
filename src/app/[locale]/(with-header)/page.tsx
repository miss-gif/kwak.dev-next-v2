import { getTranslations, setRequestLocale } from "next-intl/server";

interface Params {
  params: {
    locale: string;
  };
}

export default async function IndexPage({ params }: Params) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <div>home</div>;
}
