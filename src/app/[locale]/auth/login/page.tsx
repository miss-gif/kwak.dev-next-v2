import LoginForm from "@/components/login-form";
import { Link } from "@/i18n/navigation";

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <div className="hidden h-screen w-1/2 bg-gray-950 text-white md:block">
        <div className="flex h-screen flex-col justify-between p-6">
          <h1>
            <Link href="/">Kwak.dev</Link>
          </h1>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="flex-1 max-w-xs">
          <div className="mb-10 space-y-2">
            <div className="text-center text-5xl font-semibold">Kwak.dev</div>
            <div className="text-center text-xs text-gray-500">
              로그인하여 더 많은 기능을 이용하세요.
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
