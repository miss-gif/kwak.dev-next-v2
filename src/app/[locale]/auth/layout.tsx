import { Link } from "@/i18n/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full justify-center ">
      <div className="hidden h-screen w-1/2 bg-gray-950 text-white md:block">
        <div className="flex h-screen flex-col justify-between p-6">
          <h1>
            <Link href="/">Kwak.dev</Link>
          </h1>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-6 h-screen">
        <div className="flex-1 max-w-xs">{children}</div>
      </div>
    </section>
  );
}
