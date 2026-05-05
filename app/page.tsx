import Hero from "@/components/hero";
import Waitlist from "@/components/waitlist";
import Carousel from "@/components/carousel";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative flex flex-col">
      <Hero />
      <Waitlist />
      <Footer />
    </main>
  );
}