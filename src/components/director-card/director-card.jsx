import PropTypes from "prop-types";
import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const DirectorCard = ({ director }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Card className = "h-100">
                <Card.Body>
                    <Card.Title>{ director.name }</Card.Title>
                    <Card.Text>
                        <Link className = "text-decoration-none" variant = "link" onClick = {() => setShow(true)}>Click for More</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Modal
                show = { show }
                onHide = {() => setShow(false)}
                dialogClassName = "modal-90w"
                aria-labelledby = "example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id = "example-custom-modal-styling-title">
                        { director.name }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <span className = "fs-5">About Me</span><br></br>{ director.bio }
                    </p>
                    <p>
                        Born: { director.born }<br></br>
                        Death: { director.dead }
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
};

DirectorCard.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
};