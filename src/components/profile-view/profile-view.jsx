import { Col, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, addFav, removeFav }) => {
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
                alert("Update failed Username, Password, and Email required");
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    };

    const deleteUser = () => {
        fetch(`https://movie-mikes-7b54f5710543.herokuapp.com/users/${user.Username}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            if (response.ok) {
                window.location.reload();
                alert("Account has been Deleted");
            } else {
                alert("Failed to Delete Account")
            }
        })
        .catch(error => {
            console.error("Failed: ", error);
        })
    };

    // Get Favorite Movie list
    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))
    
    return (
        <Col>
            <Col>
                <h1>Welcome { user.Username }</h1>
            </Col>
            <Row>
                {/* Form for to UpdateUser Information */}
                <Col>
                    <h3>Update User Info</h3>
                    <Form onSubmit = { handleUpdate }>
                    <Form.Group controlId = "formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type = "text"
                        value = { username }
                        onChange = {(e) => setUsername(e.target.value)}
                        minLength = "4" 
                        required
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
                        required
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
                    <Button className = "btn-danger" onClick = { deleteUser }>
                        Delete Account
                    </Button>
                </Col>
                {/* Favorite Movie List */}
                <h2>Favorite Movies</h2>
                <Row>
                    { favoriteMovies.length === 0 ? (
                        <Col>No Favortie Movies Added!</Col>
                    ) :
                    favoriteMovies.map((movie) => {
                        return (
                            <Col key = { movie.id } md = {2}>
                                <MovieCard movie = { movie } addFav = { addFav } removeFav = { removeFav } user = { user }/>
                            </Col>
                        )
                    })}
                </Row>
            </Row>
        </Col>
    )
}