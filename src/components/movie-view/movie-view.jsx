import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Col, Button, Row, Card, Image } from "react-bootstrap";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, user, updatedUser, token }) => {
    // Gets movie id from database and uses it as the parameters in the url
    const { movieId } = useParams();

    // Searches through the list of movies and grabs the id to be displayed in the url
    const movie = movies.find((m) => m.id === movieId);

    // Gets the names of all genres a movie can have
    const genreName = movie.genre.map((g) => {
        const name = g.Name;
        return name;
    });

    // Gets the names of Genres and returns a new string
    const setGenreName = genreName.join(", ");

    // Gets the names of all directors a movie can have
    const director = movie.director.map((d) => {
        const name = d.Name;
        return name;
    });
    // Gets the names of Directors and returns a new string
    const setDirector = director.join(", ");

    // Check if any of the genres match the genre of the current movie () --
    const similarMovies = movies.filter((m) => {
        // console.log(m.genre)
        const name = m.genre.map((g) => {
            const n = g.Name;
            return n;
        });
        // console.log(name);
        return name.some((genre) => genre === genreName) && m.id !== movieId;
    });
    // console.log(similarMovies);

    // Used to show if movie is favorited
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        if (user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
            setIsFavorite(true);
        }
    }, [user]);

    const addFavorite = () => {
        fetch(`https://movie-mikes-7b54f5710543.herokuapp.com/users/${user.Username}/movies/${movie.id}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed to add");
                }
            })
            .then((user) => {
                if (user) {
                    alert("Movie added to Favorites");
                    localStorage.setItem("user", JSON.stringify(user));
                    updatedUser(user);
                    setIsFavorite(true);
                }
            })
            .catch(error => {
                console.error("Failed: ", error);
            });
    };

    const removeFavorite = () => {
        fetch(`https://movie-mikes-7b54f5710543.herokuapp.com/users/${user.Username}/movies/${movie.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed to add");
                }
            })
            .then((user) => {
                if (user) {
                    alert("Movie removed from Favorites");
                    localStorage.setItem("user", JSON.stringify(user));
                    updatedUser(user);
                    setIsFavorite(false);
                }
            })
            .catch(error => {
                console.error("Failed: ", error);
            });
    };

    return (
        <Col>
            <Card className="bg-light">
                <Row className="g-0">
                    <Col md={4}>
                        <Image src={movie.image} fluid />
                    </Col>
                    <Card.ImgOverlay>
                    {isFavorite ? (
                        <BookmarkCheckFill size={60} color="orange" className="bottom-0 end-0 pointer" onClick={removeFavorite} />
                    ) : (
                        <BookmarkPlus size={60} color="orange" className="bottom-0 end-0 pointer" onClick={addFavorite} />
                    )}
                </Card.ImgOverlay>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Text>
                                <span className="fs-1">{movie.title}</span>
                            </Card.Text>
                            <Card.Text>
                                Released {movie.released} <br></br> Genres ( {setGenreName} )
                            </Card.Text>
                            <Card.Text>
                                <span className="fs-2">Director</span> <br></br> {setDirector}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
                <Card.Body>
                    <Card.Text>
                        <span className="fs-2">Description</span> <br></br> {movie.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Row className="mt-3 bg-light rounded-2 m-auto p-2">
                <Col>
                    <h3 className="no-margin">Similar Movies</h3>
                </Col>
                <Col xs={4} lg={2} >
                    <Link to={"/"}>
                        <Button className="size100">
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Col className="mt-3 bg-light rounded-2 m-auto p-2">
              {/* {similarMovies.map((similarMovie)=>(
                <Col key={similarMovie.id}>
                  <MovieCard movie={similarMovie} user={user} updatedUser={updatedUser} token={token} />
                </Col>
              ))} */}
                <Row>
                    {similarMovies.length === 0 ? (
                        <Col>No Similar Movies!</Col>
                    ) :
                        similarMovies.map((movie) => {
                            return (
                                <Col key={movie.id} md={2}>
                                    <MovieCard movie={movie} user={user} updatedUser={updatedUser} token={token} />
                                </Col>
                            )
                        })}
                </Row>
            </Col>
        </Col>
    );
};