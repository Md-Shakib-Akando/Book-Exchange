import Image from "next/image";
import Hero from "./components/hero/page";
import Marquee from "./components/marquee/page";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Marquee></Marquee>
    </div>
  );
}
