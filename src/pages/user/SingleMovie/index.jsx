import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import "./detail.css";
import Button from "../../../components/others/Button"
import { TbCheckupList } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { motion } from "framer-motion";
import { getMovieShowDateTimesAction } from "../../../API/movies";
import { convertToAmPm, formatDateString } from "../../../utils";
import useDrawer from "../../../hooks/useDrawer";
import { getAllReservedAction } from "../../../API/booking";

const SingleMovie = () => {
  const location = useLocation(); 
  const { id } = useParams(); 

  const [item, setItem] = useState(null);
  const [movieDateTime, setMovieDateTime] = useState([])
  const [selectedmovieDate, setSelectedMovieDate] = useState(null)
  const [selectedmovieDateTime, setSelectedMovieDateTime] = useState(null)
  const {openDrawer} = useDrawer()

  



  useEffect(() => {
    const getDetail = async () => {
      if(id && location.state){

        location.state?.showDates?.map(dd => {
          dd.formattedDate = formatDateString(dd?.date)
          dd.minimal =`${dd.formattedDate?.dayOfWeek} ${dd.formattedDate?.dayOfMonth} ${dd.formattedDate?.month}`
          return dd
        })
        setItem(location.state)

          window.scrollTo(0, 0);
      }
    };
    getDetail();
  }, [id, location]);




  const getDateTimes = async (dateObject) => {
    if(dateObject){
      const res = await getMovieShowDateTimesAction({dateId:dateObject?.id})
      if(res){
        const formatted = res?.map(dd => {
          dd.formattedDateTime = convertToAmPm(dd?.time)
          return dd
        })
        setMovieDateTime([...formatted])
      }
    }
}


  const onSelectDate = (dateObject)=>{
    setSelectedMovieDate(dateObject)
    getDateTimes(dateObject)
  }



  const getReserved = async () => {
    if (id && selectedmovieDate?.id && selectedmovieDateTime?.id) {
      const json = {
        movieId: id,
        showDateId: selectedmovieDate?.id,
        showTimeId: selectedmovieDateTime?.id,
      };
      const res = await getAllReservedAction(json);
      if (res) {
        const reserve = res?.map((each) => each.seat);
        // open reservation drawer
        openDrawer("DRAWER_VIEW", {...item, selectedDate: selectedmovieDate, selectedDateTime: selectedmovieDateTime, reserve:reserve})

      }
    }
  };





  return (
    <>
      {item && (
        <div className=" font-Poppins">
          <div
            className="banner  text-white"
            style={{
              backgroundImage: `url(${item?.img})`,
            }}
          ></div>
          <div className="mb-3 movie-content container text-white">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item?.img})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title}</h1>
              <div className="genres">
                {item.genre &&
                  item.genre?.split(',')?.slice(0, 5)?.map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.description}</p>

              <p className="overview italic flex gap-2">
                <CiCalendarDate size={25} />
                Comming on
              </p>



              <div className="flex gap-3 flex-wrap w-full scrollbar-hide p-2 py-0 transition-all duration-700">
              { item?.showDates?.length > 0 ? item?.showDates?.map((mv) => (
                 <motion.div  key={mv.id}  initial={{x: 0}} animate={{ y: 0}} transition={{duration: 0.5}} onClick={()=>onSelectDate(mv)} className="cursor-pointer">
                  <div
                    className="rounded-3xl min-w-[4.8rem] h-26 bg-gray-700/50 p-1 items-center text-xl flex flex-col gap-4 transition-all duration-500 border-white "
                  >
                    <div className={`w-2 h-4 rounded-full ${selectedmovieDate?.id === mv?.id ? 'bg-green-400' : 'bg-gray-700'} `}></div>
                    <div className="text-white">
                      {mv?.formattedDate?.dayOfWeek}
                    </div>
                    <div className="text-white text-2xl">{mv?.formattedDate?.dayOfMonth}</div>
                  </div>
                 </motion.div>
              )) : <div className="text-center w-full text-stone-400/50"> <span>Oops!. Date of cinema is not available yet. Kindly retry later</span></div>
            }
            </div>



              {
                selectedmovieDate &&
                <div className="flex gap-3 flex-wrap w-full scrollbar-hide p-2 py-0">
                    { selectedmovieDate && movieDateTime?.length > 0 ? movieDateTime?.map((mv) => (
                      <div
                        key={mv.id}
                        onClick={()=>setSelectedMovieDateTime(mv)}
                        className="rounded-xl min-w-36 h-12 bg-gray-700/50 p-2 px-4 items-center text-lg flex flex-col gap-4 cursor-pointer"
                      >
                        <div className={` ${ selectedmovieDateTime?.id === mv?.id ? 'text-green-300' : "text-white" }    `}>
                          {mv?.formattedDateTime}
                        </div>
                      </div>
                    )) : <div className="text-center w-full text-stone-400/50"> <span>Oops!. Time is not available yet. Kindly check other date or retry later</span></div>
                    }
                </div>
              }

              <div className="cast">
               {
                selectedmovieDateTime ?
                  <Button onClick={getReserved} className='flex items-center justify-center gap-2 px-4 py-1 bg-[#77b940] shadow-[0px_0px_7px_5px_#3d3f3c] hover:shadow-[0px_0px_7px_8px_#3d3f3c]'>
                        
                          <TbCheckupList size={21} strokeWidth={2}  />
                          <span className='font-medium' >Book</span>
                  </Button>
                  : null
               }
                
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      
    
    </>
  );
};

export default SingleMovie;
