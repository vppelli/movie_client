import { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
            headers: { "Content-Type": "application/json" }
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
        <Col className="bg-light rounded-2 p-5">
            <Col className="px-5 text-center"><h2>Create an Account</h2></Col>
            <Form onSubmit={handleSubmit} className="p-5">
                <Form.Group controlId="formUsername" className="mb-5">
                    <Form.Control
                        className="bg-light"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="4"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-5">
                    <Form.Control
                        className="bg-light"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-5">
                    <Form.Control
                        className="bg-light"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-5">
                    <Form.Control
                        className="bg-light"
                        placeholder="Birthday"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Text className="offset-1" >or</Form.Text>
                <Form.Text className="offset-1" as = { Link } to = "/login" >login</Form.Text>
            </Form>
        </Col>
    );
};