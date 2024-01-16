import { TMovie } from '../types/movies'
import default_img from '../assets/default.webp'

export function ListOfMovies({ movies }: { movies: TMovie[] }) {
    return (
        <ul className='movies'>
            {movies.map((movie) => (
                <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    {
                        movie.poster === "N/A" ? 
                        <img src={default_img} alt="" /> : <img src={movie.poster} alt={movie.title} />
                    }
                </li>
            ))}
        </ul>
    );
}

export function NoResults() {
    return <p>No se encontraron peliculas para esta busqueda</p>;
}

export function Movies({ movies }: { movies: TMovie[] }) {
    const hasMovies = movies && movies.length > 0;
    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <NoResults />
    );
}
