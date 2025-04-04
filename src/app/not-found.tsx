import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t1 = await getTranslations("notFound");

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          {t1("text1")}
        </p>
        <p className="mt-2 text-gray-500">{t1("text2")}</p>
        <Button asChild variant="default" className="mt-6">
          <Link href="/">{t1("text3")}</Link>
        </Button>
      </div>
    </div>
  );
}
