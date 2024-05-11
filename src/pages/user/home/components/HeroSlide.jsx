/* eslint-disable react/prop-types */
import  { useState, useEffect, useRef } from 'react';

// import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import {Autoplay} from 'swiper/modules'
import 'swiper/css';
// EffectCoverflow

import Button, { OutlineButton } from '../../../../components/others/Button';
import Modal, { ModalContent } from '../../../../components/others/Modal';

import tmdbApi, { category, movieType } from '../../../../API/tmdbApi';
// import apiConfig from '';

import './style.css';
import { useNavigate } from 'react-router';
import apiConfig from '../../../../API/apiConfig';
import useCurrentBg from '../../../../hooks/useCurrentBg';

const HeroSlide = () => {
    const {currentBg} = useCurrentBg()

    const [movieItems, setMovieItems] = useState([]);


    useEffect(() => {
        if(currentBg){
            setMovieItems([currentBg, ...movieItems])
        }
    }, [currentBg])
    

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(1, 4));
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide font-Montserrat">
            <Swiper
                modules={[]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoHeight
                speed={5500}
                autoplay={{delay: 3000}}
                scrollbar={{ draggable: true }}
                
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);
        console.log(videos)

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content   text-white">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="flex items-start justify-start flex-wrap gap-5">
                        <Button onClick={() => hisrory('/user/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive} className='cursor-pointer  sm:mx-0 '>
                            Watch trailers
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
