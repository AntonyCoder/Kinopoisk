import './FavoritePage.css';
import { Link } from 'react-router-dom';
import FilmItem from '../FilmItem/FilmItem';
import { useSelector } from 'react-redux';

function FavoritePage() {
    const favorites = useSelector(state => state.favorites.items);

    if (favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <h1>Избранные фильмы</h1>
                <div className="empty-state">
                    <p>У вас пока нет избранных фильмов</p>
                    <Link to="/" className="browse-link">
                        Найти фильмы
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <h1>Избранные фильмы ({favorites.length})</h1>
            <div className="favorites-grid">
                {favorites.map(movie => (
                    <Link to={`/film/${movie.imdbID}`} key={movie.imdbID}>
                        <FilmItem data={movie} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FavoritePage;