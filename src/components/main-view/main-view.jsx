import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreCard } from "../genre-card/genre-card";
import { DirectorCard } from "../director-card/director-card";
import { Row, Col, Form } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [filter, setFilter] = useState("");
    const updatedUser = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchGenres = async () => {
            const response = await fetch("https://movie-mikes-7b54f5710543.herokuapp.com/genres", { headers: { Authorization: `Bearer ${token}` } });
            const data = await response.json();
            return data.map((genre) => ({
                id: genre._id,
                name: genre.Name,
                about: genre.About
            }));
        };

        const fetchDirectors = async () => {
            const response = await fetch("https://movie-mikes-7b54f5710543.herokuapp.com/directors", { headers: { Authorization: `Bearer ${token}` } });
            const data = await response.json();
            return data.map((director) => ({
                id: director._id,
                name: director.Name,
                bio: director.Bio,
                born: director.Born,
                dead: director.Dead
            }));
        };

        Promise.all([fetchGenres(), fetchDirectors()])
            .then(([genresFromApi, directorsFromApi]) => {
                setGenres(genresFromApi);
                setDirectors(directorsFromApi);

                return fetch("https://movie-mikes-7b54f5710543.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } });
            })
            .then(response => response.json())
            .then(data => {
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
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-center my-5">
                <Routes>
                    {/* Return SignupView*/}
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/login" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return LoginView*/}
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/movies" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
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
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There is no movie</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView movies={movies} user={user} updatedUser={updatedUser} token={token} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return MovieCards if logged in */}
                    <Route
                        path="/movies"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There is no movie</Col>
                                ) : (
                                    <>
                                        <Form className="form-inline m-5 d-flex justify-content-center">
                                            <Form.Select className="ms-1 ms-md-3 w-25" aria-label="Default filter genre" onChange={(e) => setFilter(e.target.value)}>
                                                <option value=""> Filter by genre </option>
                                                <option value="Action">Action</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Fantasy">Fantasy</option>
                                                <option value="Horror">Horror</option>
                                                <option value="Sci-fi">Sci-fi</option>
                                                <option value="War">War</option>
                                                <option value="Thriller">Thriller</option>
                                                <option value="Drama">Drama</option>
                                                <option value="Comedy">Comedy</option>
                                            </Form.Select>
                                        </Form>
                                        { movies.filter((movie) => {
                                            const genres = movie.genre.map((genre) => {
                                                const n = genre.Name;
                                                return n;
                                            })
                                            genres.filter((g) => {
                                                return g;
                                            })
                                            return filter === "" ? genres : genres === filter;
                                        })
                                        .map((movie) => (
                                            <Col md={6} lg={4} xl={3} className="mb-5" key={movie.id}>
                                                <MovieCard movie={movie} user={user} updatedUser={updatedUser} token={token} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    {/* Return GenreView if logged in */}
                    <Route
                        path="/genres"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <>
                                        {genres.map((genre) => (
                                            <Row key={genre.id} className="mb-2">
                                                <GenreCard
                                                    genre={genre}
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
                        path="/directors"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <>
                                        {directors.map((director) => (
                                            <Col md={4} key={director.id} className="mb-2">
                                                <DirectorCard
                                                    director={director}
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
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            token={token}
                                            updatedUser={updatedUser}
                                            logOut={() => {
                                                setUser(null);
                                                setMovies(null);
                                                localStorage.clear();
                                            }}
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