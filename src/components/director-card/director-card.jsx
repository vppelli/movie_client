import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const DirectorCard = ({ director }) => {

    return (
        <Card className = "h-100">
            <Card.Body>
                <Card.Title>{ director.name }</Card.Title>
                <Card.Text>Born: { director.born }</Card.Text>
            </Card.Body>
        </Card>
    );
};

DirectorCard.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
};