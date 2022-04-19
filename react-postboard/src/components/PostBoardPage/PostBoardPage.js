import Header from '../Header/Header';
import CreatePostField from '../CreatePostField/CreatePostField';
import PageSelector from '../PageSelector/PageSelector';
import PostList from '../PostList/PostList';
import TimeSelector from '../TimeSelector/TimeSelector';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRestApis } from '../../store/restApisSlice';

const PostBoardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRestApis(navigate));
    }, []);

    return (
        <div>
            <Header title='PostBoard' />
            <CreatePostField />
            <TimeSelector />
            <PageSelector />
            <PostList />
        </div>
    )
}


export default PostBoardPage;