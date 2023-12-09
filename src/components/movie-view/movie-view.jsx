import { useParams } from "react-router";
import { Col, Button, Row } from "react-bootstrap";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export const MovieView = ({ user, movies, addFav, removeFav }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    return (
        <Col>
            
            <Row>
                <Col>
                    <img className = "w-100" src = { movie.image } />
                </Col>
                <Col>
                    <h1>{ movie.title }</h1>
                    <p>Released { movie.released }</p>
                    <p>Genres { movie.genre }</p>
                    <h3>Description </h3>
                    <p>{ movie.description }</p>
                    <h3>Director </h3>
                    <p>{ movie.director }</p>
                    <div>
                        {user.FavoriteMovies.includes(movie.id) ? (
                            <BookmarkCheckFill size = {40} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => removeFav(movie.id)}/>
                        ) : (
                            <BookmarkPlus size = {40} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => addFav(movie.id)}/>
                        )}
                    </div>
                </Col>
            </Row>
            <Link to = { `/movies` }>
                <Button>
                    Back
                </Button>
            </Link>
        </Col>
    );
};