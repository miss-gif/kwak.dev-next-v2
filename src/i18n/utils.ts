import { getTranslations } from "next-intl/server";

// 타입 정의
interface LocaleParams {
  locale: string;
}

// generateMetadata 함수
export async function generateMetadata({ params }: { params: LocaleParams }) {
  // 번역 데이터 가져오기
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/thumbnail.png",
          width: 800,
          height: 600,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@your_twitter_handle",
      title: t("title"),
      description: t("description"),
      image: "/thumbnail.png",
    },
  };
}
