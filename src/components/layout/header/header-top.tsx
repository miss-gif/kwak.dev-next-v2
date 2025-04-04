import { LanguageDialog } from "@/components/language-dialog";
import Inner from "@/components/layout/Inner";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const HeaderTop = async () => {
  const t1 = await getTranslations("HeaderTop1");
  const keys1 = ["element1", "element2"] as const;

  return (
    <header>
      <Inner>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-xl font-bold">
              <Link href={"/"}>Kwak.dev</Link>
            </h1>

            <div className="flex gap-2">
              {keys1.map((key) => (
                <div key={t1(`${key}.label`)} className="font-semibold">
                  <Link href={t1(`${key}.href`)}>{t1(`${key}.title`)}</Link>
                </div>
              ))}
            </div>

            <div className="flex-1">
              <Input className="w-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageDialog />
            <LoginAlertDialog />
          </div>
        </div>
      </Inner>
    </header>
  );
};

export default HeaderTop;
