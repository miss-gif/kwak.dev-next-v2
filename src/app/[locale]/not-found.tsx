import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          페이지를 찾을 수 없습니다.
        </p>
        <p className="mt-2 text-gray-500">
          찾고 있는 페이지가 존재하지 않거나 이동된 것 같아요.
        </p>
        <Button asChild variant="default" className="mt-6">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
