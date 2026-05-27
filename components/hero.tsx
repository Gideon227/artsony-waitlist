'use client'
import Image from "next/image";

export default function Hero() {
  const handleScroll = () => {
    const nextSection = document.getElementById("waitlist");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full pt-8 flex flex-col items-center overflow-hidden min-h-[700px] lg:h-screen">
      {/* Injecting a gentle custom bounce animation */}
      <style jsx global>{`
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-subtle-bounce {
          animation: subtleBounce 2s infinite ease-in-out;
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.png"
          alt="Hero Background"
          width={2000}
          height={200}
          className="object-cover fixed bg-bottom select-none pointer-events-none h-screen w-screen"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Header / Logo */}
      <div className="w-full flex justify-start fixed z-50 left-5 top-8 md:left-8 md:top-12">
        <Image
          src="/icons/logo.svg"
          width={216}
          height={56}
          alt="logo"
          className="w-32 md:w-53 h-auto"
        />
      </div>

      {/* Hero Content */}
      <div className="z-10 relative flex flex-col items-center mt-32 md:mt-45.25 px-5 w-full max-w-225 text-center">
        <h1 className="text-white font-raleway text-[28px] md:text-[48px] lg:text-[64px] leading-[36px] md:leading-[56px] lg:leading-18 font-semibold mb-4 md:mb-6">
          Share Art. Sell Art. Buy Art.
        </h1>
        <p className="text-white text-[13px] leading-[21px] md:text-[16px] md:leading-[26px] lg:text-[18px] lg:leading-[28px] max-w-[340px] md:max-w-[560px] lg:max-w-[700px]">
          A global platform built for artists, creators, and everyday enthusiasts to showcase, sell, and discover artwork without limits. Join the waitlist to get early access and be among the first notified when Artsony launches.
        </p>
      </div>

      {/* Scroll Down Pill Button */}
      <div className="z-20 relative mt-8 md:mt-[60px] mb-16 md:mb-38">
        <button
          onClick={handleScroll}
          className="w-[120px] h-[144px] lg:w-[160px] lg:h-[188px] border boder-white rounded-full flex flex-col items-center justify-center gap-3 bg-[#2B585A33] hover:bg-[#2b585a66] transition-all duration-300 cursor-pointer group"
        >
          {/* The Wrapper handles the continuous smooth bounce */}
          <div className="animate-subtle-bounce flex flex-col items-center gap-2">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="lg:w-12 lg:h-12 transform group-hover:scale-110 transition-transform duration-300"
            >
              <path 
                d="M12 4L12 20M12 20L6 14M12 20L18 14" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white text-[12px] lg:text-[16px] leading-6 font-normal tracking-wide">
              Scroll Down
            </span>
          </div>
        </button>
      </div>

      {/* Top decorative icon — hidden on mobile */}
      <div className="hidden md:block absolute top-0 left-1/4 z-10">
        <Image src="/icons/top-icon.svg" width={250} height={250} alt="icon" />
      </div>

      {/* Right decorative icon — hidden on mobile */}
      <div className="hidden md:block absolute right-0 top-1/5 z-10">
        <Image src="/icons/right-icon.svg" width={250} height={250} alt="icon" />
      </div>
    </section>
  );
}