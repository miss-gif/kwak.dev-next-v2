import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export function LoginAlertDialog() {
  const t1 = useTranslations("HeaderTop4");
  const t3 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop3");
  const keys1 = ["element1", "element2"] as const;

  const FooterLinks = () => (
    <ul className="flex items-center justify-between">
      {keys1.map((key) => (
        <div key={t3(`${key}.label`)} className="flex gap-1 py-0">
          <AlertDialogAction asChild className="hover:bg-transparent h-4">
            <Link href={t3(`${key}.href`)} className="text-xs underline px-1">
              {t3(`${key}.title`)}
            </Link>
          </AlertDialogAction>
        </div>
      ))}
    </ul>
  );

  const SocialLoginButtons = () => (
    <div className="grid gap-2">
      {keys1.map((key) => (
        <AlertDialogAction asChild key={t4(`${key}.label`)}>
          <Link href={t4(`${key}.href`)} className="border">
            {t4(`${key}.title`)}
          </Link>
        </AlertDialogAction>
      ))}
    </div>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="text-sm">
          {t1("login")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>{t1("login")}</AlertDialogTitle>
          <AlertDialogDescription>
            This is a {t1("login")} dialog.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-2">
          <div className="text-center text-4xl font-semibold pt-5 pb-8">
            Kwak.dev
          </div>
          <Input type="email" placeholder={t1("email")} />
          <Input type="password" placeholder={t1("password")} />
          <AlertDialogAction
            asChild
            className="hover:bg-primary/90 hover:text-white"
          >
            <Button className="w-full py-5">{t1("login")}</Button>
          </AlertDialogAction>
          <FooterLinks />
        </div>

        <div className="flex items-center justify-center gap-2 py-2 relative">
          <span className="h-[1px] bg-gray-200 w-full absolute -z-10"></span>
          <p className="text-xs bg-white px-4">{t1("easyLogin")}</p>
        </div>

        <SocialLoginButtons />

        <div className="absolute top-0 right-0 p-2">
          <AlertDialogCancel>
            <XIcon />
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
