import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function App() {

    const { movies } = useMovies();

    const handleSubmit = (event) => { 
        event.preventDefault();  
        const filds = new FormData(event.target);  
        const query = filds.get("query");   
        console.log(query)
        
    }

    return (
        <div className="app">
            <h1>react-buscador-peliculas</h1>
            <header>
                <form className="form" onSubmit={handleSubmit}>
                    <input name="query" type="text" placeholder="Scarface, Matrix ..." />
                    <button type="submit">Buscar</button>
                </form>
            </header>

            <main>
                <Movies movies={movies} />
            </main>
        </div>
    );
}

export default App;

//39328cd9
