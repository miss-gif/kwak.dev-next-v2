import FooterContainer from "@/components/layout/footer";
import HeaderContainer from "@/components/layout/header";
import BannerTop from "@/components/layout/header/banner-top";
import Inner from "@/components/layout/Inner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <BannerTop />
      <HeaderContainer />
      <main className="flex-1">
        <Inner>{children}</Inner>
      </main>
      <FooterContainer />
    </section>
  );
}
