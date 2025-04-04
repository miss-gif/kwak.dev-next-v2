const HomeInfoData = {
  streakStats: {
    title: "streakStats",
    image:
      "https://streak-stats.demolab.com?user=miss-gif&theme=transparent&hide_border=true&border_radius=0&locale=ko&card_width=467",
  },
  statsCard: {
    title: "statsCard",
    image:
      "https://github-readme-stats.vercel.app/api?username=miss-gif&show_icons=true&locale=kr&bg_color=ffffff00&hide_border=true&title_color=000000&hide_title=true",
  },
  mostLanguages: {
    title: "mostLanguages",
    image:
      "https://github-readme-stats.vercel.app/api/top-langs/?username=miss-gif&layout=compact&locale=kr&hide=less,html,php,css&langs_count=8&bg_color=ffffff00&hide_border=true&title_color=000000&hide_title=true&card_width=467",
  },
};

interface HomeNoticeProps {
  title: string;
  image: string;
}

const HomeNotice = ({ title, image }: HomeNoticeProps) => {
  return (
    <div className="overflow-hidden rounded-md bg-white bg-opacity-90">
      <img src={image} alt={title} className="h-auto w-full" />
    </div>
  );
};

const HomeContent = () => {
  return (
    <div className="hidden lg:block">
      <div className="flex flex-col justify-center gap-2">
        {Object.entries(HomeInfoData).map(([key, { title, image }]) => (
          <HomeNotice key={key} title={title} image={image} />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
