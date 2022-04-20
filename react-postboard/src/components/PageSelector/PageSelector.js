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
        console.log("selectedPageOnChange");
        const page = parseInt(e.target.value);

        dispatch(utilActions.setSelectedPage(page));
        dispatch(getPosts({navigate,restApis}));
    }

    return (
        <div data-testid='pageSelectorContainer' className='pageSelectorContainer'>
            <span data-testid='pageSelectorTitle' className='pageSelectorTitle'>Page</span>
            <select id='pageSelectorId' data-testid='pageSelectorSelect' className='pageSelectorSelect' onChange={selectedPageOnChange}>
                {pages.map((value ,index,list) => <option key={value} value={value} >{value}</option>)}
            </select>
        </div>
    )
}

export default PageSelector;