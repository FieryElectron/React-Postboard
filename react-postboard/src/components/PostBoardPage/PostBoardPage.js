import Header from '../Header/Header';
import CreatePostField from '../CreatePostField/CreatePostField';
import PageSelector from '../PageSelector/PageSelector';
import PostList from '../PostList/PostList';
import TimeSelector from '../TimeSelector/TimeSelector';

import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const PostBoardPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title='PostBoard' />
            <CreatePostField />
            <TimeSelector/>
            <PageSelector />
            <PostList />
            <Button text='Back' onClick={()=>{navigate("/")}}/>
        </div>
    )
}


export default PostBoardPage;