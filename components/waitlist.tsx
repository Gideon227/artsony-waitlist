"use client";

import { useState } from "react";
import { waitlistSchema, type WaitlistData } from "@/lib/validation";
import Image from "next/image";

export default function Waitlist() {
  const [type, setType] = useState<"Regular" | "Creator">("Regular");
  const [formData, setFormData] = useState({ fullName: "", email: "", artFocus: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const validData = waitlistSchema.parse({ ...formData, type });

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setFormData({ fullName: "", email: "", artFocus: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.errors?.[0]?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="w-full bg-[url(/images/waitlist-bg.png)] bg-cover shadow-[#00000040] relative flex flex-col justify-center items-center bg-transparent max-lg:pt-40 h-[1512px] lg:h-[1700px] xl:h-[1850px] 2xl:h-[2000px] z-20">

      <div className="w-full px-5 md:px-37 gap-8 md:gap-12 flex flex-col justify-center items-center relative z-10">

        {/* Heading + Toggle */}
        <div className="flex flex-col gap-6 md:gap-12 w-full items-center">
          <div className="flex flex-col gap-5 md:gap-8 items-center justify-center w-full">
            <h2 className="font-raleway font-medium text-[28px] leading-9 md:text-[64px] md:leading-18 tracking-wide text-center">
              Join the Waitlist
            </h2>

            <div className="flex bg-white gap-2 w-full max-w-[340px] md:max-w-112 h-12 md:h-14 p-1 rounded-full border border-[#E6E8EB]">
              <button
                onClick={() => setType("Regular")}
                className={`flex-1 cursor-pointer rounded-full text-[14px] md:text-[16px] font-medium transition-all ${
                  type === "Regular"
                    ? "bg-[#FEEFEC] text-[#F25B38] border border-[#F25B38]"
                    : "text-[#525965]"
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setType("Creator")}
                className={`flex-1 cursor-pointer rounded-full text-[14px] md:text-[16px] font-medium transition-all ${
                  type === "Creator"
                    ? "bg-[#FEEFEC] text-[#F25B38] border border-[#F25B38]"
                    : "text-[#525965]"
                }`}
              >
                Creator
              </button>
            </div>
          </div>

          {/* Subtext */}
          <p className="max-w-[320px] md:max-w-125 text-[13px] md:text-[16px] leading-5 md:leading-6 tracking-wide text-[#525965] text-center">
            {type === "Creator"
              ? "Get early access to showcase your work and reach a global audience from day one."
              : "Be among the first to discover original artwork from creators around the world."}
          </p>
        </div>

        {/* Form area */}
        <div className="flex max-lg:flex-col items-center justify-center w-full">

          {/* Artist image — desktop only */}
          <div className="flex-shrink-0 z-20">
            <Image src="/images/artist.svg" width={343} height={460} alt="Artist" />
          </div>

          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            className="
              w-full
              md:w-[878px]
              md:-ml-12
              max-lg:-mt-6
              lg:-ml-16
              rounded-3xl
              max-lg:rounded-t-none
              lg:rounded-l-none
              md:rounded-4xl
              border-r-2
              max-lg:border-l-2
              lg:border-t-2
              border-b-2
              border-[#F25B38]
              py-10
              px-5
              md:py-20
              md:pr-20
              md:pl-16
              gap-y-4
              md:gap-y-6
              flex flex-col
              bg-white
              
            "
          >
            {/* Artist image — mobile only, inside form */}
            {/* <div className="flex md:hidden justify-center mb-2">
              <Image src="/images/artist.svg" width={180} height={240} alt="Artist" />
            </div> */}

            <input
              type="text"
              placeholder="Full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="flex rounded-full h-12 md:h-13 w-full text-[14px] px-5 md:px-6 py-3 bg-white border border-[#E6E8EB] text-[#525965] placeholder:text-[#525965] font-poppins transition-all duration-200 outline-none focus:ring-1 focus:ring-[#F25B38] focus:ring-offset-2 focus:ring-offset-white"
            />

            {/* Creator-only art focus dropdown */}
            {type === "Creator" && (
              <select
                value={formData.artFocus}
                onChange={(e) => setFormData({ ...formData, artFocus: e.target.value })}
                className="flex appearance-none rounded-full h-12 md:h-13 w-full text-[14px] px-5 md:px-6 py-3 bg-white border border-[#E6E8EB] text-[#525965] font-poppins transition-all duration-200 outline-none focus:ring-1 focus:ring-[#F25B38] focus:ring-offset-2 focus:ring-offset-white cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23525965' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1.5rem center",
                }}
              >
                <option value="" disabled className="text-[#525965]">Art Focus</option>
                <option value="painting" className="text-[#525965]">Painting</option>
                <option value="digital" className="text-[#525965]">Digital Art</option>
                <option value="sculpture" className="text-[#525965]">Sculpture</option>
                <option value="photography" className="text-[#525965]">Photography</option>
              </select>
            )}

            <input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex rounded-full h-12 md:h-13 w-full text-[14px] px-5 md:px-6 py-3 bg-white border border-[#E6E8EB] text-[#525965] placeholder:text-[#525965] font-poppins transition-all duration-200 outline-none focus:ring-1 focus:ring-[#F25B38] focus:ring-offset-2 focus:ring-offset-white"
            />

            {/* Error message */}
            {status === "error" && (
              <p className="text-red-500 text-[12px] px-2">{errorMessage}</p>
            )}

            {/* Success message */}
            {status === "success" && (
              <p className="text-green-600 text-[12px] px-2">You're on the waitlist! We'll be in touch.</p>
            )}

            <div className="mt-4 md:mt-6 w-full flex justify-center md:justify-end">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center py-3 px-6 rounded-[32px] border gap-3 bg-[#F25B38] border-[#F25B38] hover:ring-1 hover:ring-[#F25B38] hover:ring-offset-1 cursor-pointer text-white text-[14px] font-medium w-full md:w-48 leading-6 disabled:opacity-70"
              >
                {status === "loading" ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}