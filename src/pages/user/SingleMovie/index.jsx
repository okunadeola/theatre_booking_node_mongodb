import { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../../API/tmdbApi";
import apiConfig from "../../../API/apiConfig";

import "./detail.css";
// import CastList from './components/CastList';
// import VideoList from './VideoList';

import MovieList from "../home/components/MovieList";

import Button from "../../../components/others/Button"
import { TbCheckupList } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import ShowModal from "../.././../pages/admin/movie/components/ShowModal";
import { useDisclosure } from "@nextui-org/react";

const SingleMovie = () => {
  const { onOpen, isOpen: hasOpen, onClose: isClose } = useDisclosure();

  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  // console.log(category, id);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);





  const data = 
    {title:item?.title || "", price: 20000 , img: apiConfig.originalImage(item?.poster_path || item?.backdrop_path )}
  

  return (
    <>
      {item && (
        <div className=" font-Poppins">
          <div
            className="banner  text-white"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container text-white">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>

              <p className="overview italic">
                <CiCalendarDate size={25} />
                Comming on 18th Feb
              </p>
              <div className="cast">
                <div className="section__header">
                
                </div>
                <Button className='flex items-center justify-center gap-2 px-4 py-1 bg-[#77b940] shadow-[0px_0px_7px_5px_#3d3f3c] hover:shadow-[0px_0px_7px_8px_#3d3f3c]'>
                       
                        <TbCheckupList size={21} strokeWidth={2}  />
                        <span className='font-medium' onClick={onOpen}>Book</span>
                </Button>
                
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </div>
      )}


      <ShowModal onClose={isClose} isOpen={hasOpen} data={data} />
    </>
  );
};

export default SingleMovie;
