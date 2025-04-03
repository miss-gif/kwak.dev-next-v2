import { LanguageDialog } from "@/components/language-dialog";
import Inner from "@/components/layout/Inner";
import { LoginAlertDialog } from "@/components/login-alert-dialog";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const HeaderTop = async () => {
    // 서버 컴포넌트에서는 getTranslations 사용
    const t1 = await getTranslations("Header-Top-left");

    const t1Arr = [
      { id: "introduction", href: "/introduction" },
      { id: "community", href: "/community" },
    ];

  return (
    <header>
      <Inner>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-xl font-bold">
              <Link href={"/"}>Kwak.dev</Link>
            </h1>
             
          
            <ul className="flex gap-2">
            {
              t1Arr.map((item) => (
               <li key={item.id} className="font-semibold">
                  <Link key={item.id} href={item.href}>
                    {t1(item.id)}
                  </Link>
               </li >
              ))}
            </ul>

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
