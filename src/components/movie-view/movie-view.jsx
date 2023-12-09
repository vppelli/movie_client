import { useParams } from "react-router";
import { Col, Button, Row, Card } from "react-bootstrap";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export const MovieView = ({ user, movies, addFav, removeFav }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

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
                                <h1>{ movie.title }</h1>
                                <p>Released { movie.released }</p>
                                <p>Genres { movie.genre }</p>
                                <h3>Description </h3>
                                <p>{ movie.description }</p>
                                <h3>Director </h3>
                                <p>{ movie.director }</p>
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
        </Col>
    );
};