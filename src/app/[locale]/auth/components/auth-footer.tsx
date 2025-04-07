import { Link } from "@/i18n/navigation";
import React from "react";

type AuthFooterProps = {
  text: string;
  el: readonly string[];
  link: (key: string) => string;
};

const AuthFooter = ({ text, el, link }: AuthFooterProps) => {
  return (
    <div className="text-center text-sm mt-4">
      {text}
      <span className="ml-1 font-medium">
        {el.map((key) => (
          <Link
            key={link(`${key}.label`)}
            href={link(`${key}.href`)}
            className="font-semibold hover:underline text-xs"
          >
            {link(`${key}.title`)}
          </Link>
        ))}
      </span>
    </div>
  );
};

export default AuthFooter;
