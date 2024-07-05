/* eslint-disable react/prop-types */


import './style.css';

import {  useNavigate } from 'react-router-dom';

import Button from '../../../../components/others/Button';
import { Play } from 'lucide-react';
import { Fragment } from 'react';
import useCurrentBg from '../../../../hooks/useCurrentBg';

const MovieCard = props => {
    const {setCurrentBg} = useCurrentBg()
    const navigate = useNavigate()

    const item  = props.item;

    const link = '/user/' + item.id;

    const bg = item?.img;



    const moveToDetailPage = ()=>{
        navigate(link, {state: item})
    }


    

    return (

        <Fragment>
            {
                props.withVariant ? (
                    <div className="movie-card top" style={{backgroundImage: `url(${bg})`}} onClick={()=>setCurrentBg(item)}>
                    </div>
                ) :(

                    <div>
                        <div className="movie-card relative" style={{backgroundImage: `url(${bg})`}}>
                            <Button onClick={moveToDetailPage}>
                                <Play/>
                            </Button>
    
                            {/* <div className='absolute bottom-0 right-5'>
                                <span className='text-xs text-stone-300'>18th Feb</span>
                            </div> */}
                        </div>
                        
                        <h3 className='font-bold text-white'>{item?.title}</h3>

                    </div>

                )
            }

        </Fragment>
    );
}

export default MovieCard;
