import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

function useSearch() {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
        }

        if (search === 'No se puede buscar una pelicula vacia') {
            setError(null)
            return
        }

        if (search.length < 3) {
            setError('La busqueda debe tener al menos 3 caracteres')
            return
        }

        setError(null)
    }, [search])

    return { search, updateSearch, error }
}

function App() {

    const [sort, setSort] = useState(false)
    const { search, updateSearch, error } = useSearch()
    const { movies, getMovies, loading } = useMovies({ search, sort });

    const debonceGetMovies = useCallback(
        debounce(search => {
            console.log({ search })
            getMovies({ search })
        }, 500)
        , [getMovies]
    )

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getMovies({ search })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value
        updateSearch(newSearch)
        //getMovies({ search: newSearch })

        debonceGetMovies(newSearch)
    }

    const handleSort = () => {
        setSort(!sort)
    }

    return (
        <div className="app">
            <h1>react-buscador-peliculas</h1>
            <header>
                <form className="form" onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={search} name="query" type="text" placeholder="Scarface, Matrix ..." />
                    <input type="checkbox" onChange={handleSort} checked={sort} />
                    <button type="submit">Buscar</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </header>

            <main>
                {loading ? <p>Cargando ...</p> : <Movies movies={movies} />}
            </main>
        </div>
    );
}

export default App;
