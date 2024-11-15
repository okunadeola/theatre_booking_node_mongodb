

import './style.css';

import { Link } from 'react-router-dom';

import bg from '../../assets/images/footer-bg.jpg';
// import logo from '../../assets/images/tmovie.png';
import { TbBrandCinema4D } from 'react-icons/tb';



//*** user footer page ***//
const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo text-white">
                <div className="flex items-end gap-1">
                    <TbBrandCinema4D size={40} className=" animate-spin  duration-4000"/> <span className="  font-bold animate-blink">Cinemation</span>
                </div>
                    {/* <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="#">Cinemation</Link>
                    </div> */}
                </div>
                <div className="footer__content__menus text-white">
                    <div className="footer__content__menu text-white">
                        <Link to="#">Home</Link>
                        <Link to="#">Contact us</Link>
                        <Link to="#">Term of services</Link>
                        <Link to="#">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="#">Live</Link>
                        <Link to="#">FAQ</Link>
                        <Link to="#">Premium</Link>
                        <Link to="#">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="#">You must watch</Link>
                        <Link to="#">Recent release</Link>
                        <Link to="#">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
