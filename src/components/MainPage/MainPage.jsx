import SearchInput from '../SearchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import './MainPage.css';
import FilmItem from '../FilmItem/FilmItem';

function MainPage() {
    const { items, loading, error } = useSelector(state => state.movies)
    const uniqueItems = removeDuplicates(items)
    console.log(uniqueItems);

    function removeDuplicates(movies) {
        const unique = movies.filter((movie, index, self) => {
            return index === self.findIndex(m => m.imdbID === movie.imdbID)
        })

        return unique;
    }

    return (
        <div className="main-page">
            <SearchInput />
            <div className="film-container">
                {uniqueItems.map(item => (
                    <FilmItem data={item} key={item.imdbID} />
                ))}
            </div>
        </div>
    )
}

export default MainPage;