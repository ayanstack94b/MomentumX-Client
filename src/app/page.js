import FeaturedClasses from "@/components/home/FeaturedClasses";
import Hero from "@/components/home/Hero";
import LatestPosts from "@/components/home/LatestPosts";
import Newsletter from "@/components/home/Newsletter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FitnessMarquee from "@/components/shared/FitnessMarquee";
import SuccessStories from "@/components/shared/SuccessStories";
import TrainerCTA from "@/components/shared/TrainerCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FitnessMarquee />
      <FeaturedClasses />
      <LatestPosts />
      <TrainerCTA />
      <WhyChooseUs />
      <Newsletter />
      <SuccessStories />
    </>
  );
}
