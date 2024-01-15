import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, removeFav, addFav, isFavorite }) => {

    return (
        <Link to = {`/movies/${encodeURIComponent(movie.id)}`} className = "text-decoration-none">
            <Card className = "h-100">
                <Card.Img variant = "top" src = { movie.image } />
                <Card.ImgOverlay>
                    {isFavorite ? (
                        <BookmarkCheckFill size = {32} color = "orange" className = "bottom-0 end-0" onClick = {() => removeFav(movie.id)}/>
                    ) : (
                        <BookmarkPlus size = {32} color = "orange" className = "bottom-0 end-0" onClick = {() => addFav(movie.id)}/>
                    )}
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Title>{ movie.title }</Card.Title>
                    <Card.Text>{ movie.released }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
};