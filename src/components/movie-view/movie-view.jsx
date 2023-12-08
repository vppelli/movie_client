import { useParams } from "react-router";
import { Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
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
                </Col>
            </Row>
            <Link to = { `/` }>
                <Button>
                    Back
                </Button>
            </Link>
        </Col>
    );
};