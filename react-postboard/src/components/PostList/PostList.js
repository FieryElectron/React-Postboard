import SinglePost from '../SinglePost/SinglePost';

import { useSelector } from 'react-redux';

const PostList = () => {
    const posts = useSelector(state => state.posts.posts);
    return (
        <div>
            {posts.map((post, index) => <SinglePost key={index} post={post}/>)}
        </div>
    )
}

export default PostList;