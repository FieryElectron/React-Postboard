import './Header.css';

const Header = ({ title }) => {
    return (
        <div data-testid='headerContainer' className='headerContainer'>
            <h1 data-testid='header' className="header">{title}</h1>
        </div>

    )
}

Header.defaultProps = {
    title: 'title',
}

export default Header