import Image from "next/image";
import Hero from "./components/hero/page";
import Marquee from "./components/marquee/page";
import OfferCard from "./components/OfferCard/page";
import HowIsItWork from "./components/HowIsItWork/page";
import ReviewSection from "./components/Review/page";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Marquee></Marquee>
      <OfferCard></OfferCard>
      <HowIsItWork></HowIsItWork>
      <ReviewSection></ReviewSection>
    </div>
  );
}
