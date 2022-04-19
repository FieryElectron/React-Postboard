import './Input.css';

const Input = ({ placeholder, type , onChange}) => {
    return (
        <div className='inputContainer'>
            <input className="input" placeholder={placeholder} type={type} onChange={onChange} spellCheck="false"/>
        </div>
    )
}

Input.defaultProps = {
    text: '',
    placeholder: 'placeholder',
    type: 'text'
}

export default Input;