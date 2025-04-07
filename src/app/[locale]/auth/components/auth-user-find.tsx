import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const AuthUserFind = () => {
  const t2 = useTranslations("HeaderTop2");
  const keys2 = ["element2"] as const;

  return (
    <div className="flex justify-center space-x-2 text-xs text-gray-400 mt-4">
      {keys2.map((key) => (
        <Link
          key={t2(`${key}.label`)}
          href={t2(`${key}.href`)}
          className="hover:underline"
        >
          {t2(`${key}.title`)}
        </Link>
      ))}
    </div>
  );
};

export default AuthUserFind;
