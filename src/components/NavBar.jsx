import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from "react-router-dom";
import history from '../history';
import './NavBar.css';

export function NavBar() {
    return (
      <Navbar className="color-nav" variant="light">
        <Link to="/MainMenu">
          <img src="/images/KrustyKrabHat.png" alt="Krusty Krab Hat" width="43" height="43"/>
          <b>The Krusty Krab</b>
        </Link>
        <Nav className="mr-auto">
        </Nav>
        <Link to="/ShoppingCart">
          <div style={{color: 'white'}}>
            <AiOutlineShoppingCart size={32} />
          </div>
        </Link>
      </Navbar>
    );
}