import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    // Update User Information Currently not working
    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        fetch(`https://movie-mikes-7b54f5710543.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(async (response) => {
            console.log(response)
            if (response.ok) {
                await response.json();
                alert("Updated Informatio");
                window.location.reload();
            } else {
                alert("Update failed");
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    };

    // Get Favorite Movie list
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))
    
    return (
        <Col>
            <Col>
                <h1>Welcome { user.Username }</h1>
            </Col>
            <Row>
                {/* Form for to UpdateUser Information */}
                <Col>
                    <h3>Update User Info ( Currently Not working )</h3>
                    <Form onSubmit = { handleUpdate }>
                    <Form.Group controlId = "formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type = "text"
                        value = { username }
                        onChange = {(e) => setUsername(e.target.value)}
                        minLength = "4" 
                    />
                    </Form.Group>
                    <Form.Group controlId = "formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                        type = "password"
                        value = { password }
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group controlId = "formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                        type = "email"
                        value = { email }
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group controlId = "formBirthday">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type = "date"
                        value = { birthday }
                        onChange = {(e) => setBirthday(e.target.value)}
                    />
                    </Form.Group>
                    <Button variant = "primary" type = "submit">
                        Update
                    </Button>
                    </Form>
                </Col>
                {/* Delete Account */}
                <Col>
                    <Button className = "btn-danger">
                        Delete Account
                    </Button>
                </Col>
                {/* Favorite Movie List */}
                <h2>Favorite Movies</h2>
                <Col>
                    {/* { favoriteMovies.map((movie) => {
                        return (
                            <Col key = { movie.id }>
                                <MovieCard movie = { movie }/>
                            </Col>
                        )
                    })} */}
                    No Favortie Movies Added!
                </Col>
            </Row>
        </Col>
    )
}