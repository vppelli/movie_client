import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, user, updatedUser, token }) => {
    // Used to show if movie is favorited
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
            setIsFavorite(true);
        }
    }, [user]);

    return (
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="text-decoration-none">
            <Card className="h-100 bg-primary">
                <Card.Img variant="top" src={movie.image} />
                <Card.ImgOverlay>
                    {isFavorite ? (
                        <BookmarkCheckFill size={32} color="orange" className="bottom-0 end-0" />
                    ) : (
                        <BookmarkPlus size={32} color="orange" className="bottom-0 end-0" />
                    )}
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.released}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        released: PropTypes.string,
    }).isRequired,
};