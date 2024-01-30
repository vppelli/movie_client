import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkPlus, BookmarkCheckFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, user, updatedUser, token }) => {
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
        <Link to = {`/movies/${encodeURIComponent(movie.id)}`} className = "text-decoration-none">
            <Card className = "h-100">
                <Card.Img variant = "top" src = { movie.image } />
                <Card.ImgOverlay>
                    {isFavorite ? (
                        <BookmarkCheckFill size = {32} color = "orange" className = "bottom-0 end-0" onClick = {removeFavorite}/>
                    ) : (
                        <BookmarkPlus size = {32} color = "orange" className = "bottom-0 end-0" onClick = {addFavorite}/>
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