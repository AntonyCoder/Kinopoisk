import SearchInput from '../SearchInput/SearchInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FilmItem from '../FilmItem/FilmItem';
import './MainPage.css';

function MainPage() {
    const { items, loading, error } = useSelector(state => state.movies);
    const uniqueItems = removeDuplicates(items);

    function removeDuplicates(movies) {
        const unique = movies.filter((movie, index, self) => {
            return index === self.findIndex(m => m.imdbID === movie.imdbID);
        })

        return unique;
    }

    return (
        <div className="main-page">
            <SearchInput />
            <div className="film-container">
                {loading && (<div>Загрузка данных...</div>)}
                {error && (<div>{error}</div>)}
                {uniqueItems.map(item => (
                    <Link
                        to={`film/${item.imdbID}`}
                        key={item.imdbID}>
                        <FilmItem data={item} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MainPage;