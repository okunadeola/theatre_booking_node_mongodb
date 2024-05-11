import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import Button from '../../../../components/others/Button';

import tmdbApi, { category } from '../../../../API/tmdbApi';
// import apiConfig from '../../../../API/apiConfig';

import MovieCard from './MovieCard';
import { Navigation, EffectCoverflow, Autoplay, } from 'swiper/modules';

const MovieList = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, [props]);

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
                            items.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <MovieCard item={item} category={props.category} withVariant={true} />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        grabCursor={true}
                        spaceBetween={20}
                        slidesPerView={'auto'}
                        className="mySwiper"
                        navigation={true}
                    >
                        {
                            items.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <MovieCard item={item} category={props.category}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                
                )
            }
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.any,
    variant: PropTypes.any,
}

export default MovieList;
