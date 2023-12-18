import { useParams } from "react-router";
import { Col, Button, Row, Card } from "react-bootstrap";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { GenreCard } from "../genre-card/genre-card";

export const MovieView = ({ user, movies, addFav, removeFav }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const getGenre = movie.genre;
    const setGenre = getGenre.join(", ");
    const getDirector = movie.director;
    const setDirector = getDirector.join(", ");

    const similarMovies = movies.filter((m) => {
        return m.genre === movie.genre;
    });

    return (
        <Col>
            <Card>
                <Row className = "g-0">
                    <Col md = {4}>
                        <img src = { movie.image } className = "img-fluid rounded-start"/>
                    </Col>
                    <Card.ImgOverlay>
                        {user.FavoriteMovies.includes(movie.id) ? (
                            <BookmarkCheckFill size = {40} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => removeFav(movie.id)}/>
                        ) : (
                            <BookmarkPlus size = {40} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => addFav(movie.id)}/>
                        )}
                    </Card.ImgOverlay>
                    <Col md = {8}>
                        <Card.Body>
                            <Card.Text>
                                <span className="fs-1">{ movie.title }</span>
                            </Card.Text>
                            <Card.Text>
                                Released { movie.released } <br></br> Genres ( { setGenre } )
                            </Card.Text>
                            <Card.Text>
                                    <span className="fs-2">Description</span> <br></br> { movie.description } <br></br>
                                    <span className="fs-2">Director</span> <br></br> { setDirector }
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <Row className = "mt-3 bg-light rounded-2 m-auto p-2">
                <Col className = "col-8">
                    <h3>Similar Movies</h3>
                </Col>
                <Col>
                    <Link to = { `/movies` } className = "offset-10">
                        <Button>
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Col className = "mt-3 bg-light rounded-2 m-auto p-2">
                    <Row>
                        { similarMovies.length === 0 ? (
                            <Col>No Similar Movies!</Col>
                        ) :
                        similarMovies.map((movie) => {
                            return (
                                <Col key = { movie.id } md = {2}>
                                    <MovieCard movie = { movie } addFav = { addFav } removeFav = { removeFav } user = { user }/>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
        </Col>
    );
};