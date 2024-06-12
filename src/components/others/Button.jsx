

import PropTypes from 'prop-types';

import './button.css';


const Button = props => {
    return (
        <button
            id={props?.id}
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
            id={props?.id}
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
    children: PropTypes.node,
    id: PropTypes.string
}

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string
}

export default Button;
