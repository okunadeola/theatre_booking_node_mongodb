/* eslint-disable react/prop-types */


import './style.css';

import {  useNavigate } from 'react-router-dom';

import Button from '../../../../components/others/Button';
import { Play } from 'lucide-react';
import { Fragment } from 'react';
import useCurrentBg from '../../../../hooks/useCurrentBg';
import Currency from "react-currency-formatter"

const MovieCard = props => {
    const {setCurrentBg} = useCurrentBg()
    const navigate = useNavigate()

    const item  = props.item;

    const link = '/user/' + item._id;

    const bg = item?.img;



    const moveToDetailPage = ()=>{
        navigate(link, {state: item})
    }


    

    return (

        <Fragment>
            {
                props.withVariant ? (
                    <div className="movie-card top cursor-pointer" style={{backgroundImage: `url(${bg})`}} onClick={()=>setCurrentBg(item)}>
                    </div>
                ) :(

                    <div>
                        <div className="movie-card relative" style={{backgroundImage: `url(${bg})`}}>
                            <Button onClick={moveToDetailPage}>
                                <Play/>
                            </Button>
    
                        </div>
                        
                        <h3 className='font-bold text-white'>{item?.title}</h3>
                        <div className='font-bold text-green-400 flex  justify-between'>
                        <Currency
                            quantity={item?.price || 0}
                            currency="NGN"
                            />
                            <div className='text-gray-400 text-xs'>50% OFF</div>
                        </div>

                    </div>

                )
            }

        </Fragment>
    );
}

export default MovieCard;
