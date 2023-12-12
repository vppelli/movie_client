import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreCard } from "../genre-card/genre-card";
import { DirectorCard } from "../director-card/director-card";
import { Row, Col } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);

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

    useEffect(() => {

        if (!token) {
            return;
        }

        const fetchGenres = async () => {
            const data = await fetch("https://movie-mikes-7b54f5710543.herokuapp.com/genres", { headers: { Authorization: `Bearer ${token}` } });
            return data
        }
        fetchGenres()
            .then((response) => response.json())
            .then((data) => {
                const genresFromApi = data.map((genre) => {
                    return {
                        id: genre._id,
                        name: genre.Name,
                        about: genre.About
                    };
                });

                setGenres(genresFromApi);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, [token]);

    useEffect(() => {

        if (!token) {
            return;
        }

        const fetchDirectors = async () => {
            const data = await fetch("https://movie-mikes-7b54f5710543.herokuapp.com/directors", { headers: { Authorization: `Bearer ${token}` } });
            return data
        }
        fetchDirectors()
            .then((response) => response.json())
            .then((data) => {
                const directorsFromApi = data.map((director) => {
                    return {
                        id: director._id,
                        name: director.Name,
                        bio: director.Bio,
                        born: director.Born,
                        dead: director.Dead
                    };
                });

                setDirectors(directorsFromApi);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, [token]);

    const addFavorite = (movieId) => {
        fetch(`https://movie-mikes-7b54f5710543.herokuapp.com/users/${user.Username}/movies/${movieId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            if (response.ok) {
                alert("Movie added to Favorites");
            } else {
                alert("Failed to add");
            }
        })
        .catch(error => {
            console.error('Failed: ', error);
        });
    };

    const removeFavorite = (movieId) => {
        fetch(`https://movie-mikes-7b54f5710543.herokuapp.com/users/${user.Username}/movies/${movieId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            if (response.ok) {
                alert("Movie removed from Favorites");
            } else {
                alert("Failed to add");
            }
        })
        .catch(error => {
            console.error('Failed: ', error);
        });
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user = { user }
                onLoggedOut = {() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-center my-5">
                <Routes>
                    {/* Return SignupView*/}
                    <Route
                    path = "/signup"
                    element = {
                        <>
                            {user? (
                                <Navigate to = "/login" />
                            ) : (
                                <Col md = {5}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                    />
                    {/* Return LoginView*/}
                    <Route 
                        path = "/login"
                        element = {
                            <>
                                {user ? (
                                    <Navigate to = "/movies" />
                                ) : (
                                    <Col md = {5}>
                                        <LoginView 
                                            onLoggedIn = {(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return MovieView if logged in */}
                    <Route 
                        path = "/movies/:movieId"
                        element = {
                            <>
                                {!user ? (
                                    <Navigate to = "/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There is no movie</Col>
                                ) : (
                                    <Col md = {12}>
                                        <MovieView movies = { movies } addFav = { addFavorite } removeFav = { removeFavorite } user = { user } genres = { genres }/>
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return MovieCards if logged in */}
                    <Route 
                    path = "/movies"
                    element = {
                        <>
                            {!user ? (
                                    <Navigate to = "/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There is no movie</Col>
                                ) : (
                                    <>
                                        { movies.map((movie) => (
                                            <Col md = {6} lg = {4} xl = {3} className = "mb-5" key = { movie.id }>
                                                <MovieCard movie = { movie } addFav = { addFavorite } removeFav = { removeFavorite } user = { user }/>
                                            </Col>
                                        ))}
                                    </>
                                )}
                        </>
                    }
                    />
                    {/* Return GenreView if logged in */}
                    <Route
                    path = "/genres"
                    element = {
                        <>
                            {!user ? (
                                <Navigate to = "/login" replace />
                            ) : (
                                <>
                                    {  genres.map((genre) => (
                                        <Row key = { genre.id } className = "mb-2">
                                            <GenreCard 
                                            genre = { genre }
                                            />
                                        </Row>
                                    ))}
                                </>
                            )}
                        </>
                    }
                    />
                    {/* Return DirectorView if logged in */}
                    <Route
                    path = "/directors"
                    element = {
                        <>
                            {!user ? (
                                <Navigate to = "/login" replace />
                            ) : (
                                <>
                                    { directors.map((director) => (
                                        <Col md = {4} key = { director.id } className = "mb-2">
                                            <DirectorCard 
                                            director = { director }
                                            />
                                        </Col>
                                    ))}
                                </>
                            )}
                        </>
                    }
                    />
                    {/* Return ProfileView if logged in */}
                    <Route
                    path = "/profile"
                    element = {
                        <>
                            {!user ? (
                                <Navigate to = "/login" replace />
                            ) : (
                                <Col>
                                    <ProfileView 
                                    user = { user }
                                    movies = { movies }
                                    token = { token }
                                    addFav = { addFavorite }
                                    removeFav = { removeFavorite }
                                    />
                                </Col>
                            )}
                        </>
                    }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    )
}