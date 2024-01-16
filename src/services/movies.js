const API_KEY = '39328cd9'

export const searchMovies = async ({ search }) => {

    if (search === '') return null

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search;

        return movies?.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            poster: movie.Poster
        }));
    } catch (e) {
        throw new Error('Error fetching movies')
    }
}
