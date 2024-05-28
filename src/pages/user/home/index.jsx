/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import HeroSlide from "./components/HeroSlide";
import { OutlineButton } from "../../../components/others/Button";
import MovieList from "./components/MovieList";
import { DatePicker } from 'antd';
import { category, movieType, tvType } from "../../../API/tmdbApi";


const { RangePicker } = DatePicker;



const HomePage = () => {



const onDateChange = (dates)=>{
  if(dates?.length){
    const date = new Date(dates[0]?.$d)
    const date2 = new Date(dates[1]?.$d)
  
    const isoString = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)).toISOString();
  
    const isoString2 = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate(), 0, 0, 0)).toISOString();
  
    console.log(isoString, isoString2 )
  }
}













  return (
    <div className="bg-[#0e1012]">
      <HeroSlide />

      <div className="section container relative  sm:-top-60 md:-top-60 lg:-top-30 ">
        <div className="container md:px-40">
          <MovieList
            variant={"top"}
            category={category.movie}
            type={movieType.popular}
          />
        </div>
      </div>

      <div className="container font-Montserrat relative sm:-top-10 z-10">
        <div className="text-white mb-40">

          <div className="flex  gap-2  md:gap-10 flex-wrap mb-5">
            <div className="flex flex-col">
                <h2 className=" text-lg  md:text-2xl font-bold mb-1">OPENING THIS WEEK</h2>
                <div className="h-[0.15rem] w-[50%] bg-gradient-to-r from-[#ce4809]  to-[#0e1012]"></div>

                <div className="flex gap-3 py-4 mb-4 flex-wrap">
                  <div className="flex items-center justify-center px-4 py-2 bg-[#ce4809] rounded-sm cursor-pointer hover:opacity-90">
                    <span className="text-white/80 text-xs  md:text-medium font-medium">ALL</span>
                  </div>
                  <div className="flex items-center justify-center px-4 py-2 bg-[#272727] rounded-sm cursor-pointer hover:opacity-90">
                    <span className="text-white/80 font-medium text-xs  md:text-medium ">ACTION</span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-2 bg-[#272727] rounded-sm cursor-pointer hover:opacity-90">
                    <span className="text-white/80 font-medium text-xs  md:text-medium ">LOVE</span>
                  </div>
                  <div className="flex items-center justify-center px-4 py-2 bg-[#272727] rounded-sm cursor-pointer hover:opacity-90">
                    <span className="text-white/80 font-medium text-xs  md:text-medium ">AI</span>
                  </div>
                  <div className="flex items-center justify-center px-4 py-2 bg-[#272727] rounded-sm cursor-pointer hover:opacity-90">
                    <span className="text-white/80 font-medium text-xs  md:text-medium ">SPORT</span>
                  </div>
                </div>
            </div> 


            <div className="flex flex-col ">
                <h2 className="text-lg  md:text-2xl font-bold mb-1">Filter By Date</h2>
                <div className="h-[0.15rem] w-[50%] bg-gradient-to-r from-[#ce4809]  to-[#0e1012] "></div>
                <RangePicker disabledTime={true} onChange={onDateChange} className="h-fit py-[0.45rem] mt-4 bg-stone-400 text-white/80 border-stone-700 hover:bg-black active:bg-black visited:bg-black placeholder:text-white/80" />
            </div>

          </div>

          <div className="section mb-3 flex flex-col gap-10">
            <MovieList category={category.movie} type={movieType.popular} />
            <MovieList category={category.movie} type={movieType.top_rated} />
          </div>

        </div>

        {/* <div className="section mb-3">
          <div className="section__header mb-2 flex text-white justify-between items-center py-6">
            <h2 className="text-2xl font-bold">Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
         
        </div> */}

        {/* <div className="section mb-3">
          <div className="section__header mb-2 flex text-white justify-between items-center py-4">
            <h2 className="text-2xl font-bold">Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div> */}

        <div className="section mb-3">
          <div className="section__header mb-2 flex text-white justify-between items-center py-4">
            <h2 className="text-lg  md:text-2xl  font-bold">Trending TV</h2>
            <Link to="#">
              <OutlineButton className="text-small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2 flex text-white justify-between items-center py-4">
            <h2 className="text-lg  md:text-2xl  font-bold">Top Rated TV</h2>
            <Link to="#">
              <OutlineButton className="text-small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
