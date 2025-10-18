import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { toggleFavorite } from '../../slices/favoritesSlice';
import HeartIcon from '@gravity-ui/icons/svgs/heart.svg';
import HeartFillIcon from '@gravity-ui/icons/svgs/heart-fill.svg';
import defaultPoster from '../../img/poster_none.png';
import './FilmItem.css';

function FilmItem({ data }) {
    const favorites = useSelector(state => state.favorites.items);
    const dispatch = useDispatch();

    const { Poster, Title, Year, imdbID } = data;
    const posterSrc = Poster === 'N/A' ? defaultPoster : Poster;

    const [imageSrc, setImageSrc] = useState(posterSrc);

    const isFavorite = favorites.some(fav => fav.imdbID === imdbID);

    //Обработка ошибки загрузки изображения
    function handleImageError() {
        setImageSrc(defaultPoster);
    }

    //Обработка добавления в избранное
    function handleFavorite(e){
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(data))
    }

    return (
        <div className="film-item">
                <img
                    src={imageSrc}
                    alt="poster"
                    className="film-poster"
                    onError={handleImageError} />
                <div className="decription">
                    <p className="film-title">{Title}</p>
                    <p className="film-year">{Year}</p>
                </div>
                <button className="film-favorite-button" onClick={handleFavorite}>
                    <img
                        src={isFavorite ? HeartFillIcon : HeartIcon}
                        alt="favorite"
                        className="favorite-icon" />
                </button>
        </div>
    )
}

export default FilmItem;