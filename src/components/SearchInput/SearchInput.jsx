import './SearchInput.css';
import MagnifierIcon from '@gravity-ui/icons/svgs/magnifier.svg';
import { useDispatch } from 'react-redux';
import { clearMovies, fetchMovies } from '../../slices/movieSlice';

function SearchInput() {
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(clearMovies());

        const searchText = getFormData(e);
        dispatch(fetchMovies(searchText.search))
    }

    function getFormData(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        let data = Object.fromEntries(formData);
        form.reset();

        return data;
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" className="search-input" name='search' placeholder='Search movie...' />
            <button className="search-button">
                <img src={MagnifierIcon} alt="search" className="search-icon" />
            </button>
        </form>
    )
}

export default SearchInput;