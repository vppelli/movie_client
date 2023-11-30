import { useState, useEffect } from "react";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movie-mikes-7b54f5710543.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        released: movie.Released,
                        genre: movie.Genre,
                        director: movie.Director,
                        image: movie.ImagePath,
                        description: movie.Description
                    };
                });

                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie = { selectedMovie } onBackClick = { () => setSelectedMovie(null) } />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            { movies.map((movie) => (
                <MovieCard
                    key = { movie.id }
                    movie = { movie }
                    onMovieClick = { (newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};