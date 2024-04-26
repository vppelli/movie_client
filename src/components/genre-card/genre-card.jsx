import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const GenreCard = ({ genre }) => {

    return (
        <Card className="h-100 bg-light">
            <Card.Body>
                <Card.Title>{genre.name}</Card.Title>
                <Card.Text>{genre.about}</Card.Text>
            </Card.Body>
        </Card>
    );
};

GenreCard.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
};