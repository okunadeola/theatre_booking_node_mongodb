/* eslint-disable react/prop-types */
import  { useState, useEffect, useRef } from 'react';

// import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import {Autoplay} from 'swiper/modules'
import 'swiper/css';
// EffectCoverflow

import Button, { OutlineButton } from '../../../../components/others/Button';
import Modal, { ModalContent } from '../../../../components/others/Modal';

// import tmdbApi, { category, movieType } from '../../../../API/tmdbApi';
// import apiConfig from '';

import './style.css';
import { useNavigate } from 'react-router';
// import apiConfig from '../../../../API/apiConfig';
import useCurrentBg from '../../../../hooks/useCurrentBg';
import toast from 'react-hot-toast';
import { getFrontMovieAction } from '../../../../API/users';
import { shuffle } from '../../../../utils';


const HeroSlide = () => {
    const {currentBg} = useCurrentBg()

    // const [movieItems, setMovieItems] = useState([]);
    const [movieItems, setMovieItems] = useState([]);


    useEffect(() => {
        if(currentBg){
            setMovieItems([currentBg, ...movieItems])
        }
    }, [currentBg])
    

    useEffect(() => {
        const getMovies = async () => {
            // const params = {page: 1}
            // const response = await tmdbApi.getMoviesList(movieType.popular, {params});
            // setMovieItems(response.results.slice(1, 4));
            try {
                const res = await  getFrontMovieAction()
                if(res){
                    // console.log(res, 'front image')
                    setMovieItems(shuffle(res));
                }
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

    // const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    const background = item?.img;

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        // const videos = await tmdbApi.getVideos(category.movie, item.id);
        const videSrc = item?.trailer
   
        if (videSrc) {
            // const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
            modal.classList.toggle('active');
        } else {
            toast.error('No Trailer')
        }

    }

    const moveToDetailPage = ()=>{
        const link = '/user/' + item?.id
        hisrory(link, {state: item})
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content   text-white">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item?.title}</h2>
                    <div className="overview sm:line-clamp-none md:line-clamp-3 xl:line-clamp-none ">{item?.description}</div>
                    <div className="flex items-start justify-start flex-wrap gap-2 md:gap-5">
                        <Button className='text-sm md:text-medium' onClick={ moveToDetailPage}>
                            Book Now
                        </Button>
                        <OutlineButton onClick={setModalActive} className='cursor-pointer  sm:mx-0  text-sm md:text-medium'>
                            Watch trailers
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={background} alt="" />
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
        <Modal  active={false} id={`modal_${item.id}`} >
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
