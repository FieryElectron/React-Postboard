import './Header.css';
import { FaUserAlt } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header = ({ title }) => {
    const location = useLocation();

    const username = useSelector((state) => state.user.user.username);
    return (
        <div data-testid='headerContainer' className='headerContainer'>
            <h1 data-testid='header' className="header">{title}</h1>
            {location.pathname === "/postboard" && <span className='profile'><FaUserAlt color='blue' size={30} /> {username}</span>}
        </div>
    )
}

Header.defaultProps = {
    title: 'title',
}

export default Header