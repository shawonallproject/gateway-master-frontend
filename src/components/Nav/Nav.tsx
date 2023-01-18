import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          Home
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Nav;
