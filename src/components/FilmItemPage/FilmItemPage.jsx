import defaultPoster from '../../img/poster_none.png'
import HeartIcon from '@gravity-ui/icons/svgs/heart.svg';
import HeartFillIcon from '@gravity-ui/icons/svgs/heart-fill.svg';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../slices/movieSlice';
import { toggleFavorite } from '../../slices/favoritesSlice';
import './FilmItemPage.css';

function FilmItemPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentMovie, loading, error } = useSelector(state => state.movies);
    const [imageSrc, setImageSrc] = useState(defaultPoster);
    const [displayMovie, setDisplayMovie] = useState(null);
    const favorites = useSelector(state => state.favorites.items);
    const isFavorite = favorites.some(fav => fav.imdbID === currentMovie.imdbID);

    //Сбрасываем состояние при смене id
    useEffect(() => {
        setDisplayMovie(null);
        setImageSrc(defaultPoster);

        if (id) {
            dispatch(fetchMovieDetails(id));
        }
    }, [dispatch, id])

    //Обновляем отображаемые данные только когда загружен новый фильм
    useEffect(() => {
        if (currentMovie && currentMovie.imdbID === id) {
            setDisplayMovie(currentMovie);
            const posterSrc = currentMovie.Poster === 'N/A' ? defaultPoster : currentMovie.Poster;

            setImageSrc(posterSrc);
        }

    }, [currentMovie, id])

    //Обработчик ошибки загрузки постера
    function handleImageError() {
        setImageSrc(defaultPoster);
    }

    //Обработка нажатия кнопки назад
    function handleBackClick() {
        navigate(-1);
    }

    //Обработка добавления в избранное
    function handleFavorite(e) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(currentMovie))
    }

    // Показываем загрузку или старый контент только если это тот же фильм
    if (loading && !displayMovie) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error && !displayMovie) {
        return <div className="error">Ошибка: {error}</div>;
    }

    // Если displayMovie не установлен (переход на новый фильм), показываем загрузку
    if (!displayMovie) {
        return <div className="loading">Загрузка фильма...</div>;
    }

    return (
        <div className="film-detail-page">
            <button className="back-button" onClick={handleBackClick}>
                ← Назад
            </button>

            <div className="film-detail-container">
                <div className="film-poster-section">
                    <img
                        src={imageSrc}
                        alt={displayMovie.Title}
                        className="film-detail-poster"
                        onError={handleImageError}
                    />
                    <button className="favorite-button large" onClick={handleFavorite}>
                        <img src={isFavorite ? HeartFillIcon : HeartIcon} alt="Добавить в избранное" />
                    </button>
                </div>

                <div className="film-info-section">
                    <div className="film-header">
                        <h1 className="film-title">{displayMovie.Title}</h1>
                        <div className="film-rating">
                            <span className="rating-value">⭐ {displayMovie.imdbRating}</span>
                            <span className="rating-source">/10 IMDb</span>
                        </div>
                    </div>

                    <div className="film-meta">
                        <div className="meta-item">
                            <span className="meta-label">Год выпуска:</span>
                            <span className="meta-value">{displayMovie.Year}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Продолжительность:</span>
                            <span className="meta-value">{displayMovie.Runtime}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Жанр:</span>
                            <span className="meta-value">{displayMovie.Genre}</span>
                        </div>
                    </div>

                    <div className="film-credits">
                        <div className="credit-group">
                            <h3 className="credit-title">Режиссер</h3>
                            <p className="credit-value">{displayMovie.Director}</p>
                        </div>
                        <div className="credit-group">
                            <h3 className="credit-title">Актеры</h3>
                            <p className="credit-value">{displayMovie.Actors}</p>
                        </div>
                    </div>

                    {displayMovie.Plot && displayMovie.Plot !== 'N/A' && (
                        <div className="film-plot">
                            <h3 className="plot-title">Сюжет</h3>
                            <p className="plot-text">{displayMovie.Plot}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FilmItemPage;