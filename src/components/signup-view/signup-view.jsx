import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        fetch("https://movie-mikes-7b54f5710543.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        .then((response) => {
            console.log(data)
            if (response.ok) {
                alert("Signup successful, Login to start");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    };

    return (
        <Form onSubmit = { handleSubmit }>
            <Form.Group controlId = "formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
                type = "text"
                value = { username }
                onChange = {(e) => setUsername(e.target.value)}
                required
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
                required
            />
            </Form.Group>
            <Form.Group controlId = "formBirthday">
            <Form.Label>Password:</Form.Label>
            <Form.Control
                type = "date"
                value = { birthday }
                onChange = {(e) => setBirthday(e.target.value)}
                required
            />
            </Form.Group>
            <Button variant = "primary" type = "submit">
                Submit
            </Button>
        </Form>
    );
};