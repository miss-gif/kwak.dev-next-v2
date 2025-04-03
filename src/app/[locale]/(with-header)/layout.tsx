import BannerTop from "@/components/layout/header/banner-top";
import HeaderContainer from "@/components/layout/header/header-container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <BannerTop />
      <HeaderContainer />
      {children}
    </section>
  );
}
