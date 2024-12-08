import Hero from "../../Components/HomeComponents/Hero/Hero";
import Feature from "../../Components/HomeComponents/Feature/Feature";
import Packages from "../../Components/HomeComponents/Packages/Packages";
import FounderSpeech from "../../Components/HomeComponents/FounderSpeech/FounderSpeech";
import Campaign from "../../Components/HomeComponents/Campaign/Campaign";
import BlogsHome from "../../Components/HomeComponents/BlogsHome/BlogsHome";

export default function Home() {
  return (
    <main className="bg-base-100">
      <Hero />
      <Feature />
      <Packages />
      <Campaign />
      <FounderSpeech />
      <BlogsHome />
    </main>
  );
}
