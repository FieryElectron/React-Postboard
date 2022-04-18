import './SinglePost.css';

import Button from '../Button/Button';

const SinglePost = () => {

    const clickTest = () => {
        console.log('clickTest');
    }

    return (
        <div data-testid='singlePostContainer' className='singlePostContainer'>
            <div data-testid='ownerName' className='ownerName'>ownerName</div>
            <div data-testid='postContent' className='postContent'>Content</div>
            <hr></hr>
            <div data-testid='timeStampContainer' className='timeStampContainer'>
                <span data-testid='timeStamp' className='timeStamp'>timestamp</span>
                <Button text='Delete' color='#E62E2E' onClick={clickTest}></Button>
            </div>
        </div>
    )
}


export default SinglePost;