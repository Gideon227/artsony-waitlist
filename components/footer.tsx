import Image from "next/image";
import VideoCarousel from "./carousel";

export default function Footer() {
  const footerIcons = [
    "/icons/instagram.svg",
    "/icons/facebook.svg",
    "/icons/linkedin.svg",
    "/icons/twitter.svg",
  ];

  return (
    <footer className="w-full bg-[url(/images/footer-bg.jpg)] bg-cover bg-bottom min-h-[60vh] md:h-[140vh] -mt-20 md:-mt-80 pt-0 pb-8 md:py-12 px-5 md:px-8 relative overflow-hidden flex flex-col justify-between items-end">
      <VideoCarousel />

      <div className="w-full max-w-[2200px] pt-6 md:pt-8 mx-auto flex flex-col md:flex-row justify-between items-center md:items-end relative z-10 border-t border-white gap-4 md:gap-0">

        {/* Social Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          {footerIcons.map((social, i) => (
            <Image key={i} src={social} width={28} height={28} alt="social icon" className="md:w-8 md:h-8" />
          ))}
        </div>

        {/* Right side group */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-12">
          <button className="flex items-center gap-2 text-white font-medium text-[14px] hover:opacity-80">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Language
          </button>

          <div className="flex items-center gap-2 text-white text-[12px] md:text-[14px] leading-6">
            <span className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full text-transparent flex items-center justify-center text-[10px] font-bold flex-shrink-0">
              C
            </span>
            2025 Artsony All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}