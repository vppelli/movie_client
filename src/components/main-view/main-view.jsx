import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Button, Col } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        if (!token) {
            return;
        }

        const fetchMyApi = async () => {
            const data = await fetch("https://movie-mikes-7b54f5710543.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } });
            return data
        }
        fetchMyApi()
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
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center"> 
            {!user ? (
                <Col md = {5}>
                    <LoginView
                        onLoggedIn = {(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView 
                    />
                </Col>
            ) : selectedMovie ? (
                <Row className="justify-content-md-center">
                    <MovieView style = {{ border: "1px solid white" }} movie = { selectedMovie } onBackClick = {() => setSelectedMovie(null)} />
                </Row>
            ) : movies.length === 0 ? (
                    <Row>The list is empty!</Row>
            ) : (
                <Row>
                    <Button
                        onClick = {() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </Button>
                    {movies.map((movie) => (
                        <Col className = "mb-5" key = { movie.id } md = {3}>
                            <MovieCard
                                movie = { movie }
                                onMovieClick = {(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Row>
    );
};
