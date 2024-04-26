import React from "react";
import { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movie-mikes-7b54f5710543.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }

  return (
    <Col className="bg-light rounded-2 p-5">
      <Col className="px-5 text-center"><h2>LOGIN</h2></Col>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form.Text className="offset-1" >or</Form.Text>
        <Form.Text className="offset-1" as = { Link } to = "/signup" >signup</Form.Text>
      </Form>
    </Col>
  );
};
