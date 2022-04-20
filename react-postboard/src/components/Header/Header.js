import './Header.css';
import { FaUserAlt } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ title }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const username = useSelector((state) => state.user.user.username);
    const logoutUrl = useSelector((state) => state.authApis.apis.logout);

    const logoutOnClick = async () => {
        await axios.delete(logoutUrl, {withCredentials: true});
        navigate('/');
    }

    return (
        <div data-testid='headerContainer' className='headerContainer'>
            <h1 data-testid='header' className="header">{title}</h1>
            {location.pathname === "/postboard" && <span className='profile'><FaUserAlt color='blue' size={30} /> {username}
            <Button color='red' text='Log out' onClick={logoutOnClick}/>
            </span>}
        </div>
    )
}

Header.defaultProps = {
    title: 'title',
}

export default Header