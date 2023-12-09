import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, user, removeFav, addFav }) => {
    return (
        <Card className = "h-100">
            <Card.Img variant = "top" src = { movie.image } />
            <Card.Body>
                <Card.Title>{ movie.title }</Card.Title>
                <Card.Text>{ movie.released }</Card.Text>
                <Link to = {`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant = "link">
                        Open
                    </Button>
                </Link>
                <div>
                    {user.FavoriteMovies.includes(movie.id) ? (
                        <BookmarkCheckFill size = {32} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => removeFav(movie.id)}/>
                    ) : (
                        <BookmarkPlus size = {32} color = "orange" className = "fav-button mt-2 me-2 top-0 end-0" onClick = {() => addFav(movie.id)}/>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
};