import Header from '../Header/Header';
import Button from '../Button/Button';

import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { utilActions } from '../../store/utilSlice';

import { toast } from 'react-toastify';

import axios from 'axios';
import { useEffect } from 'react';
import { getAuthApis } from '../../store/authApisSlice';

const SignInPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAuthApis());
    }, [dispatch]); 

    const navigate = useNavigate();

    const username = useSelector((state) => state.util.username);
    const password = useSelector((state) => state.util.password);

    const registerUrl = useSelector((state) => state.authApis.apis.register);
    const loginUrl = useSelector((state) => state.authApis.apis.login);
   

    const usernameOnChange = (e) => {
        dispatch(utilActions.setUsername(e.target.value));
    }

    const passwordOnChange = (e) => {
        dispatch(utilActions.setPassword(e.target.value));
    }

    const signUp = async () => {
        const url = registerUrl+`?username=${username}&password=${password}`;
        const res = await axios.post(url);

        toast.info(res.data.info, {
            position: "top-center",
            autoClose: 2000,
            pauseOnFocusLoss:false,
        });
    }

    const signIn = async () => {
        const url = loginUrl+`?username=${username}&password=${password}`;
        const res = await axios.post(url, {}, {withCredentials: true});

        toast.info(res.data.info, {
            position: "top-center",
            autoClose: 2000,
            pauseOnFocusLoss:false,
        });
        
        if(res.data.flag){
            navigate("/postboard");
            dispatch(utilActions.setUsername(""));
            dispatch(utilActions.setPassword(""));
        }
    }

    const loginGoogle = async () => {

    }

    return (
        <div>
            <Header title='Sign In' />
            <Input placeholder='Username' onChange={usernameOnChange}/>
            <Input placeholder='Password' type='password' onChange={passwordOnChange}/>
            <br />
            <Button text='Sign Up' onClick={signUp} />
            <Button text='Sign In' onClick={signIn} />
            <br />
            <Button text='Google' onClick={loginGoogle} />

        </div>
    )
}

export default SignInPage;