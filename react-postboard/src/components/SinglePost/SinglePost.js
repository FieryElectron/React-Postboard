import './SinglePost.css';

import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { getPosts } from '../../store/postsSlice';
import { toast } from 'react-toastify';

const refreshAccessToken = async (tokenUrl) => {
    const res = await axios.get(tokenUrl, {withCredentials: true});
    return res.data.flag;
}

const SinglePost = ( post ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUsername = useSelector(state => state.user.user.username);
    const tokenUrl = useSelector((state) => state.restApis.apis.token);
    const postUrl = useSelector((state) => state.restApis.apis.post);
    const restApis = useSelector((state) => state.restApis.apis);

    const tryDeletePost = async (reTry = true) => {
        console.log("tryDeletePost");
        const url = postUrl+`${post.post.id}`;
        const res = await axios.delete(url, {withCredentials: true});


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
                await tryDeletePost(reTry);
            }else{
                navigate('/');
            }
        }
    }

    return (
        <div className='singlePostContainer'>
            <div  className='ownerName'>{post.post.username}</div>
            <div className='postContent'>{post.post.content}</div>
            <hr></hr>

            <div className='timeStampContainer'>
                <span className='timeStamp'>{new Date(post.post.timestamp).toLocaleDateString("en-US")}</span>
                {currentUsername === post.post.username && <Button text='Delete' color='#E62E2E' onClick={tryDeletePost}></Button>}
                
            </div>
        </div>
    )
}

SinglePost.defaultProps = {
    ownerName: 'ownerName',
    Content: 'Content',
    timestamp: 'timestamp',
}

export default SinglePost;