import React from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './sign-in.css';

type Props = {};

const SignIn = (props: Props) => {
  return (
    <div className="wrapper">
      <Container className="container pt-4" fluid="sm">
        <Row>
          <h1>Sign in</h1>
          <Col>
            <Stack as="form" gap={2}>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control type="text" id="username" />
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" />

              <Button type="submit" className="mt-5">
                Submit
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
