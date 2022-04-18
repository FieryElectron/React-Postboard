import './CreatePostField.css';

import Button from '../Button/Button';
import Input from '../Input/Input';

const CreatePostField = () => {

    const clickTest = () => {
        console.log('clickTest');
    }

    return (
        <div data-testid='createPostFieldContainer' className='createPostFieldContainer'>
            <Input placeholder='Post Content' />
            <Button text='Create' color='#38DD38' onClick={clickTest} />
        </div>
    )
}

CreatePostField.defaultProps = {
    text: 'text',
}

export default CreatePostField;