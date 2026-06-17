import FeaturedClasses from "@/components/home/FeaturedClasses";
import Hero from "@/components/home/Hero";
import LatestPosts from "@/components/home/LatestPosts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FitnessMarquee from "@/components/shared/FitnessMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <FitnessMarquee />
      <FeaturedClasses />
      <LatestPosts />
      <WhyChooseUs />
    </>
  );
}
