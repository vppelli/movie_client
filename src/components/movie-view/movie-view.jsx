import { useParams } from "react-router";
import { useState } from "react";
import { Col, Button, Row, Card, Image } from "react-bootstrap";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, user, updatedUser, token }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const genreName = movie.genre.map((g) => {
        const name = g.Name;
        return name;
    });
    const setGenreName = genreName.join(", ");

    const director = movie.director.map((d) => {
        const name = d.Name;
        return name;
    });
    const setDirector = director.join(", ");

    const similarMovies = movies.filter((m) => {
        const name = m.genre.map((g) => {
            const n = g.Name;
            return n;
        });
        return name === genreName;
    });

    return (
        <Col>
            <Card className="bg-light">
                <Row className="g-0">
                    <Col md={4}>
                        <Image src={movie.image} fluid />
                    </Col>
                    {/* <Card.ImgOverlay className = "img-fluid rounded-start">
                        {isFavorite ? (
                            <BookmarkCheckFill size = {40} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => removeFav(movie.id)}/>
                        ) : (
                            <BookmarkPlus size = {40} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => addFav(movie.id)}/>
                        )}
                    </Card.ImgOverlay> */}
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
                <Col xs={2} lg={2} >
                    <Link to={`/movies`}>
                        <Button className="size100">
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Col className="mt-3 bg-light rounded-2 m-auto p-2">
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