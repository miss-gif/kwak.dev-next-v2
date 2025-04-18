import Inner from "@/components/layout/Inner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function Page() {
  return (
    <Inner className="flex gap-2">
      <Button asChild>
        <Link href="/admin/test/auth">Auth 테스트</Link>
      </Button>
      <Button asChild>
        <Link href="/admin/test/NotFound">NotFound 테스트</Link>
      </Button>
      <Button asChild>
        <Link href="/admin/test/private">PrivatePage 테스트</Link>
      </Button>
    </Inner>
  );
}
