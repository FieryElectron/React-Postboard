import Button from '../Button/Button';
import './TimeSelector.css'
import moment from 'moment';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { utilActions } from '../../store/utilSlice';
import { getPosts } from '../../store/postsSlice';

import { useNavigate } from 'react-router-dom';

const TimeSelector = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fromDate = useSelector(state => state.util.fromDate);
    const toDate = useSelector(state => state.util.toDate);
    const restApis = useSelector((state) => state.restApis.apis);

    useEffect(() => {
        const dateString = moment(new Date()).format('YYYY-MM-DD');
        dispatch(utilActions.setFromDate(dateString));
        dispatch(utilActions.setToDate(dateString));
    }, []);

    const dateFromOnchange = (e) => {
        dispatch(utilActions.setFromDate(e.target.value));
    }

    const dateToOnchange = (e) => {
        dispatch(utilActions.setToDate(e.target.value));
    }

    const RefreshPosts = () => {
        dispatch(getPosts({navigate,restApis}));
    }

    return (
        <div className='timeSelectorContainer'>
            <h3 className='timeSelectorTitle'>From</h3>
            <input id='dateFrom' type='date' className='timeSelectorDate' onChange={dateFromOnchange} value={fromDate}></input>
            <h3 className='timeSelectorTitle'>To</h3>
            <input id='dateTo' type='date' className='timeSelectorDate' onChange={dateToOnchange}  value={toDate}></input>
            <Button text='Refresh Posts' onClick={RefreshPosts} />
        </div>
    )
}

export default TimeSelector;