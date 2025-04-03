import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackButton = () => {
  return (
    <Button asChild size={"icon"} className="fixed top-4 right-4 z-10">
      <Link href={"/"}>
        <X />
      </Link>
    </Button>
  );
};

export default BackButton;
