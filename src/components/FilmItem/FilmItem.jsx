import { useState } from 'react';
import './FilmItem.css';

const defaultPoster = 'src/img/poster_none.png';

function FilmItem({ data }) {
    const { Poster, Title, Year } = data;
    const posterSrc = Poster === 'N/A' ? defaultPoster : Poster;

    const [imageSrc, setImageSrc] = useState(posterSrc);


    function handleImageError() {
        setImageSrc(defaultPoster);
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
        </div>
    )
}

export default FilmItem;