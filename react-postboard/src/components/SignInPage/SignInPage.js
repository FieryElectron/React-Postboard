import Header from '../Header/Header';
import Button from '../Button/Button';

import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';


const SignInPage = () => {
    const navigate = useNavigate();


    const signUp = () => {

    }

    const signIn = () => {

    }

    return (
        <div>
            <Header title='Sign In' />
            <Input placeholder='Username' />
            <Input placeholder='Password' type='Password'/>

            <br />
            <Button text='Sign Up' onClick={signUp} />
            <Button text='Sign In' onClick={signIn} />
            <br />
            <Button text='Google' onClick={() => {navigate("/postboard")}} />

        </div>
    )
}

export default SignInPage;