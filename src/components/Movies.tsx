import { TMovie } from '../types/movies'

export function ListOfMovies({ movies }: { movies: TMovie[] }) {
    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.year}</p>
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
