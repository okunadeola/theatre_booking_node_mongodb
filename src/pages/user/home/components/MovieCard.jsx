/* eslint-disable react/prop-types */


import './style.css';

import { Link } from 'react-router-dom';

import Button from '../../../../components/others/Button';

import { category } from '../../../../API/tmdbApi';
import apiConfig from '../../../../API/apiConfig';
import { Play } from 'lucide-react';
import { Fragment } from 'react';
import useCurrentBg from '../../../../hooks/useCurrentBg';

const MovieCard = props => {
    const {setCurrentBg} = useCurrentBg()

    const item  = props.item;

    const link = '/user/' + category[props.category] + '/' + item.id;
   // console.log(link) //    const link = '/user/movie' +'/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);


    

    return (

        <Fragment>
            {
                props.withVariant ? (
                    <div className="movie-card top" style={{backgroundImage: `url(${bg})`}} onClick={()=>setCurrentBg(item)}>
                    </div>
                ) :(
                <Link to={link} >
                    <div className="movie-card relative" style={{backgroundImage: `url(${bg})`}}>
                        <Button>
                            <Play/>
                        </Button>

                        <div className='absolute bottom-0 right-5'>
                            <span className='text-xs text-stone-300'>18th Feb</span>
                        </div>
                    </div>
                    
                    <h3 className='font-bold text-white'>{item.title || item.name}</h3>
                </Link>

                )
            }

        </Fragment>
    );
}

export default MovieCard;
