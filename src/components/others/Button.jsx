

import PropTypes from 'prop-types';

import './button.css';


const Button = props => {
    return (
        <button
        
            className={`btn ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    );
}

export const OutlineButton = props => {
    return (
        <Button
            
            className={`btn-outline ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </Button>
    );
}

OutlineButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
}

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
}

export default Button;
