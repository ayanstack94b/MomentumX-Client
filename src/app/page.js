import FeaturedClasses from "@/components/home/FeaturedClasses";
import Hero from "@/components/home/Hero";
import LatestPosts from "@/components/home/LatestPosts";



export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <FeaturedClasses></FeaturedClasses>
      <LatestPosts></LatestPosts>
    </div>
  );
}
