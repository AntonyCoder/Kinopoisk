import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';


function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </>
    )
}

export default App;