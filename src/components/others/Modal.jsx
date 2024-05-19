/* eslint-disable react/prop-types */
import  { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { X } from 'lucide-react';

const Modal = props => {

    const [active, setActive] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);



    

    return (
        <div ref={contentRef}  id={props.id} className={`modal ${active ? 'active' : ''} text-white`}>
            {props.children}
        </div>
    );
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}
 
export const ModalContent = props => {

    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    }

    return (
        <div ref={contentRef} className="modal__content text-white">
       
                {props.children}    


            <div className="modal__content__close" onClick={closeModal}>
                <X className='text-white/50 hover:text-[#ff0000]'/>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}

export default Modal;
