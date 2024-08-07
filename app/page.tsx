import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";


export default function Home() {
  return (
    <>
      <section className="px-6 md:px-20 py-24 ">
        <div className="flex flex-col justify-center text-center">
          <p className="head-text">
            GO GET YOUR BEST DEAL  <span className="text-primary-orange">
              HERE
            </span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row w-full mt-10 gap-5">
          <div className="w-full lg:w-6/12">
            {/* Search bar */}
            <SearchBar/>
          </div>
          <div className="w-full lg:w-6/12">
            {/* HeroCarousel */}
            <HeroCarousel/>
          </div>

        </div>
        
      </section>
    
    </>
  );
}
