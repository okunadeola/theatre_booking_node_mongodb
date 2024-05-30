/* eslint-disable react/prop-types */


import HeroSlide from "./components/HeroSlide";
import MovieList from "./components/MovieList";
import AllMovieList from "./components/AllMovieList";


const HomePage = () => {


  return (
    <div className="bg-[#0e1012]">
      <HeroSlide />

      <div className="section container relative  sm:-top-60 md:-top-60 lg:-top-30 ">
        <div className="container md:px-40">
          <MovieList
            variant={"top"}
          />
        </div>
      </div>
      <div className="container font-Montserrat relative sm:-top-10 z-10">
        <div className="text-white mb-40">
          <AllMovieList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
