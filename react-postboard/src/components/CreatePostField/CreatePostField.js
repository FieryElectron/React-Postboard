import './CreatePostField.css';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { utilActions } from '../../store/utilSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getPosts } from '../../store/postsSlice';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const refreshAccessToken = async (tokenUrl) => {
    const res = await axios.get(tokenUrl, {withCredentials: true});
    return res.data.flag;
}

const CreatePostField = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postContent = useSelector((state) => state.util.postContent);
    const postUrl = useSelector((state) => state.restApis.apis.post);
    const restApis = useSelector((state) => state.restApis.apis);
    const tokenUrl = useSelector((state) => state.restApis.apis.token);


    const tryCreatePost = async (reTry = true) => {
        console.log("tryCreatePost");
        

        const res = await axios.post(postUrl, {content:postContent}, {withCredentials: true});

        if(res.data.flag){
            
            toast.info(res.data.info, {
                position: "top-center",
                autoClose: 2000,
                pauseOnFocusLoss:false,
            });

            dispatch(getPosts({navigate,restApis}));
            
            return;
        }

        if(res.data.info){
            toast.info(res.data.info, {
                position: "top-center",
                autoClose: 2000,
                pauseOnFocusLoss:false,
            });
        }

        if(reTry){
            reTry = false;
            if(await refreshAccessToken(tokenUrl)){
                console.log("Access Token Refreshed!");
                await tryCreatePost(reTry);
            }else{
                navigate('/');
            }
        }
    }

    const contentOnChange = (e) => {
        dispatch(utilActions.setPostContent(e.target.value));
    }

    return (
        <div data-testid='createPostFieldContainer'  className='createPostFieldContainer'>
            <Input placeholder='Post Content' onChange={contentOnChange}/>
            <Button text='Create' color='#38DD38' onClick={tryCreatePost} />
        </div>
    )
}

CreatePostField.defaultProps = {
    text: 'text',
}

export default CreatePostField;