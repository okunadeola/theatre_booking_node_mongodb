/* eslint-disable react/prop-types */
import { cn } from '../../../../lib/utils';
import { Fragment } from 'react';
import { GiCarSeat } from 'react-icons/gi';


const MovieCardList = ({data, getBook}) => {


    
const getBooking = (movieId)=>{
    getBook(movieId)
}

    

    return (

        <Fragment>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6">
                {
                    data?.map(bb =>(
                    <div   key={bb.id}>
                        <div className={cn("movie-card relative", bb?.bookings?.length && 'cursor-pointer'  )} style={{backgroundImage: `url(${bb?.img})`}} onClick={()=> bb?.bookings?.length ? getBooking(bb.id) :  {}}>
                           
                            <div className='absolute bottom-0 right-0 left-0 bg-gray-400/30 rounded-b-3xl px-3 py-2'>
                                <div className='flex gap-1 text-stone-300'>
                                    <GiCarSeat  size={20}/>
                                    <span className='text-md text-stone-300'>{bb?.bookings?.length}</span>
                                </div>
                            </div>
                        </div>
                        
                        <h3 className='font-bold'>{bb?.title}</h3>

                    </div>
                    ))
                }
            </div>




        </Fragment>
    );
}

export default MovieCardList;
