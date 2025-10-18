import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import FilmItemPage from './components/FilmItemPage/FilmItemPage';
import FavoritePage from './components/FavoritePage/FavoritePage';


function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/film/:id' element={<FilmItemPage />} />
                <Route path='/favorites' element={<FavoritePage />} />
            </Routes>
        </>
    )
}

export default App;