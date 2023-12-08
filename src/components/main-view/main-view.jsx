import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
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
                                <Navigate to = "/" />
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
                                    <Navigate to = "/" />
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
                                        <MovieView movies = { movies }/>
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Return MovieCards if logged in */}
                    <Route 
                    path = "/"
                    element = {
                        <>
                            {!user ? (
                                    <Navigate to = "/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There is no movie</Col>
                                ) : (
                                    <>
                                        { movies.map((movie) => (
                                            <Col md = {6} lg = {4} xl = {3} className = "mb-5 col-8" key = { movie.id }>
                                                <MovieCard movie = { movie }/>
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