import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import Button from '../../../../components/others/Button';


import MovieCard from './MovieCard';
import {EffectCoverflow, Autoplay, } from 'swiper/modules';
import { getFrontMovieAction } from '../../../../API/users';


const MovieList = props => {

    // const [items, setItems] = useState([]);
    const [movieItems, setMovieItems] = useState([]);


    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await  getFrontMovieAction()
                if(res){
                    console.log(res, 'front image')
                    setMovieItems(res);
                }
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);






    // useEffect(() => {
    //     const getList = async () => {
    //         let response = null;
    //         const params = {};

    //         if (props.type !== 'similar') {
    //             switch(props.category) {
    //                 case category.movie:
    //                     response = await tmdbApi.getMoviesList(props.type, {params});
    //                     break;
    //                 default:
    //                     response = await tmdbApi.getTvList(props.type, {params});
    //             }
    //         } else {
    //             response = await tmdbApi.similar(props.category, props.id);
    //         }
    //         setItems(response.results);
    //     }
    //     getList();
    // }, [props]);

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
