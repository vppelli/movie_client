import { Col, Row, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Col>
            <Col>
                <img className = "w-100" src = { movie.image } />
            </Col>
            <Col>
                <span>Title: </span>
                <span>{ movie.title }</span>
            </Col>
            <Col>
                <span>Released: </span>
                <span>{ movie.released }</span>
            </Col>
            <Col>
                <span>Genre: </span>
                <span>{ movie.genre }</span>
            </Col>
            <Col>
                <span>Description: </span>
                <span>{ movie.description }</span>
            </Col>
            <Col>
                <span>Director: </span>
                <span>{ movie.director }</span>
            </Col>
            <Button onClick = { onBackClick }>Back</Button>
        </Col>
    );
};