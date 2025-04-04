import FooterBottom from "@/components/layout/footer/footer-bottom";
import FooterTop from "@/components/layout/footer/footer-top";
import React from "react";

const FooterContainer = () => {
  return (
    <footer className="bg-gray-800 text-white ">
      <FooterTop />
      <FooterBottom />
    </footer>
  );
};

export default FooterContainer;
