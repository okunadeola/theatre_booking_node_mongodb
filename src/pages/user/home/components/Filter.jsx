// import { OutlineButton } from "../../../../components/others/Button";
import { DatePicker } from "antd";
import {  useState } from "react";

import "./style.css";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";
import { getMovieByCategoryAction, getMovieByDatesAction } from "../../../../API/movies";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const category = [
  "action",
  "love",
  "adventure",
  "tech",
  "lifestyle",
  "survival",
  "peace",
];

const Filter = () => {
  const { RangePicker } = DatePicker;
  const [movieItemsPage, setMovieItemsPage] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const { userData } = useCurrentUser();


  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(false);
  // const [filters, setFilters]= useState(null)

  // useEffect(() => {
  //     const getMovies = async () => {
  //         try {
  //             const res = await  getPaginatedMoviesAction({page: page, limit: 10})
  //             if(res){
  //                 console.log(res, 'search/filter movie')
  //                 setMovieItemsPage(res?.movies);
  //                 setHasMore(res?.nextPage)
  //             }
  //         } catch {
  //             console.log('error');
  //         }
  //     }
  //     getMovies();
  // }, [page]);

  const onDateChange = (dates) => {
    if (dates?.length) {
      const date = new Date(dates[0]?.$d);
      const date2 = new Date(dates[1]?.$d);

      const isoString = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
      ).toISOString();

      const isoString2 = new Date(
        Date.UTC(
          date2.getFullYear(),
          date2.getMonth(),
          date2.getDate(),
          0,
          0,
          0
        )
      ).toISOString();

    //   console.log(isoString, isoString2);
      ondateSelect({isoString, isoString2})
    }
  };



  const ondateSelect = async (date) => {
    try {
      const res = await getMovieByDatesAction({ start:date?.isoString, end:date?.isoString2 });
      if (res) {

        const dt = res?.map(d => d.movie)
        setMovieItemsPage([...dt]);
        setSelectedCat(null)
      }
    } catch (error) {
      console.log(error);
    }
  };



  const oncategorySelect = async (cat) => {
    try {
      const res = await getMovieByCategoryAction({category: cat});
      if (res) {
        setMovieItemsPage(res);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const selectCat = (cat)=>{
    setSelectedCat(cat)
    oncategorySelect(cat)
  }





  
  return (
    <div>

      {
        userData?.data?.id &&
        <div className="flex  gap-2  md:gap-10 flex-wrap mb-5">
          <div className="flex flex-col">
            <h2 className=" text-lg  md:text-2xl font-bold mb-1">
            Filter By Genre
            </h2>
            <div className="h-[0.15rem] w-[50%] bg-gradient-to-r from-[#ce4809]  to-[#0e1012]"></div>

            <div className="flex gap-3 py-4 mb-4 flex-wrap">

              {
                  category?.map(cat=> (
                      <div key={cat} className={`flex items-center justify-center px-4 py-2  rounded-sm cursor-pointer hover:opacity-90 ${selectedCat === cat ? 'bg-[#ce4809]': 'bg-[#272727]'}  `}  onClick={()=>selectCat(cat)}   >
                      <span className="text-white/80 text-xs  md:text-medium font-medium">
                          {cat?.toUpperCase()}
                      </span>
                      </div>
                  ))
              }
            
            </div>
          </div>

          <div className="flex flex-col ">
            <h2 className="text-lg  md:text-2xl font-bold mb-1">
              Filter By Show Date
            </h2>
            <div className="h-[0.15rem] w-[50%] bg-gradient-to-r from-[#ce4809]  to-[#0e1012] "></div>
            <RangePicker
              disabledTime={true}
              onChange={onDateChange}
              className="h-fit py-[0.45rem] mt-4 bg-stone-400 text-white/80 border-stone-700 hover:bg-black active:bg-black visited:bg-black placeholder:text-white/80"
            />
          </div>
        </div>
      }

      {movieItemsPage?.length ? (
        <div className="section mb-3">
          <div className="section__header mb-2 flex text-white justify-between items-center py-4">
            <h2 className="text-2xl font-bold">Sesrch Result {selectedCat && 'for'}  {selectedCat}</h2> 

            {/* <OutlineButton  className="small" onClick={hasMore ? ()=>setPage(p=> p+ 1) : ()=>setPage(p=> p > 1 ? p- 1 : p)}  >{ hasMore ? 'View more' : 'view previous'}</OutlineButton> */}
          </div>

          <div className={`movie-list`}>
                        <Swiper
                            modules={[Navigation]}
                            grabCursor={true}
                            spaceBetween={20}
                            slidesPerView={'auto'}
                            className="mySwiper"
                            navigation={true}
                        >
                            {
                                movieItemsPage.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <MovieCard item={item} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                </div>
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
