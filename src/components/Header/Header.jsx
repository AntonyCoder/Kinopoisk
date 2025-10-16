import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {

    return (
        <header className="header">
            <nav className="nav">
                <NavLink to={'/'} className={({isActive}) => isActive ? 'active-link' : 'link'}>Поиск фильмов</NavLink>
                <NavLink to={'/favorites'} className={({isActive}) => isActive ? 'active-link' : 'link'}>Избранное</NavLink>
            </nav>
        </header>
    )

}

export default Header;