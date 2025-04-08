import HomeContent from "@/app/[locale]/(with-header)/home/HomeContent";
import HomeTitle from "@/app/[locale]/(with-header)/home/HomeTitle";
import FooterContainer from "@/components/layout/footer";
import HeaderContainer from "@/components/layout/header";
import BannerTop from "@/components/layout/header/banner-top";

const HeroVideo = () => {
  return (
    <video
      autoPlay
      muted
      loop
      className="absolute left-0 top-0 -z-20 h-screen w-full object-cover opacity-30"
    >
      <source src={"/assets/video/main_video.mp4"} type="video/mp4" />
      브라우저에서 비디오 태그를 지원하지 않습니다.
    </video>
  );
};

export default function Page() {
  return (
    <section className="flex flex-col min-h-screen">
      <BannerTop />
      <HeaderContainer />
      <main className="flex-1">
        <div>
          <div className="flex w-full flex-col items-center justify-around lg:flex-row min-h-[calc(100vh-156px)] relative">
            <HeroVideo />
            <HomeTitle />
            <HomeContent />
          </div>
        </div>
      </main>
      <FooterContainer />
    </section>
  );
}
