import './PageSelector.css'

import { useSelector, useDispatch } from 'react-redux';
import { utilActions } from '../../store/utilSlice';

import { getPosts } from '../../store/postsSlice';

import { useNavigate } from 'react-router-dom';

const PageSelector = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const pages = useSelector(state => state.util.pages);
    const restApis = useSelector(state => state.restApis.apis);

    const selectedPageOnChange = (e) => {
        dispatch(utilActions.setSelectedPage(e.target.value));
        
        dispatch(getPosts({navigate,restApis}));
    }

    return (
        <div data-testid='pageSelectorContainer' className='pageSelectorContainer'>
            <span data-testid='pageSelectorTitle' className='pageSelectorTitle'>Page</span>
            <select data-testid='pageSelectorSelect' className='pageSelectorSelect' onChange={selectedPageOnChange}>
                {pages.map((index) => <option key={index} value={index} >{index}</option>)}
            </select>
        </div>
    )
}

export default PageSelector;