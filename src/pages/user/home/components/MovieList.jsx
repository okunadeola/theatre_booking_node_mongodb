import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import MovieCard from './MovieCard';
import {EffectCoverflow, Autoplay, } from 'swiper/modules';
import { getFrontMovieAction } from '../../../../API/users';


const MovieList = props => {
    const [movieItems, setMovieItems] = useState([]);


    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await  getFrontMovieAction()
                if(res){
                    setMovieItems(res);
                }
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);


    return (
        <div className={`movie-list ${props.variant}`}>
                {
                    props.variant ? (
                        <Swiper
                            modules={[Autoplay,EffectCoverflow,]}
                            rewind={true}
                            grabCursor={true}
                            spaceBetween={2}
                            slidesPerView={'auto'}
                            className="mySwiper"
                            effect='coverflow'
                            autoplay={{delay:3000}}
                        >
                            {
                                movieItems?.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <MovieCard item={item}  withVariant={true} />
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    ) : null

                }
            
        </div>
    );
}

MovieList.propTypes = {
    id: PropTypes.any,
    variant: PropTypes.any,
}

export default MovieList;
