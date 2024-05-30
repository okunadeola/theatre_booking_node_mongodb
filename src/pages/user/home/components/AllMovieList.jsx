import { useEffect, useState } from "react";
import { getPaginatedMoviesAction } from '../../../../API/movies';

import './style.css';

import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import MovieCard from "./MovieCard";
import { OutlineButton } from "../../../../components/others/Button";
import Filter from "./Filter";

const AllMovieList = () => {
    const [movieItemsPage, setMovieItemsPage] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);


    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await  getPaginatedMoviesAction({page: page, limit: 10})
                if(res){
                    console.log(res, 'page movie')
                    setMovieItemsPage(res?.movies);
                    setHasMore(res?.nextPage)
                }
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, [page]);







  return (

    <div>
        <Filter/>
        <div className="section mb-3">
          <div className="section__header mb-2 flex text-white justify-between items-center py-4">
            <h2 className="text-2xl font-bold">Top Rated Movies</h2>
              
              <OutlineButton  className="small" onClick={hasMore ? ()=>setPage(p=> p+ 1) : ()=>setPage(p=> p > 1 ? p- 1 : p)}  >{ hasMore ? 'View more' : 'view previous'}</OutlineButton>
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
       
    </div>
  )
}




export default AllMovieList
