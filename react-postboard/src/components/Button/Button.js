import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ color, text, onClick }) => {
    return (
        <button data-testid='button' onClick={onClick} style={{ backgroundColor: color }} className='button'>{text}</button>
    )
}

Button.defaultProps = {
    text: 'text',
    color: '#0071FE',
}

Button.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}


export default Button;