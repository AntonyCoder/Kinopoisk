const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

async function getMovies(request){

    try {
        const response = await fetch(`${apiUrl}?apikey=${apiKey}&t=${request}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default getMovies;