import Page from "@/app/[locale]/auth/login/page";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function LoginAlertDialog() {
  const t1 = useTranslations("HeaderTop4");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">{t1("login")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md p-6 rounded-xl">
        <AlertDialogHeader className="mb-6 sr-only">
          <AlertDialogTitle className="text-center text-5xl font-semibold">
            Kwak.dev
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            로그인하여 더 많은 기능을 이용하세요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Page />

        <AlertDialogCancel className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100">
          <XIcon className="h-5 w-5" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
