import React from "react";
import "./NavBar.css";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
const NavBar = props => {
  return (
    <nav>
      <ul className="navList">
        <li>
          <a className="navLinks" href="http://localhost:3000/home">Home</a>
        </li>
        <li>
          <a className="navLinks" href="http://localhost:3000/gardens">Gardens</a>
        </li>
        <li>
          <a className="navLinks"  href="http://localhost:3000/searchplants">Search</a>
        </li>
        <li>
          <a className="navLinks"
            href="http://localhost:3000/"
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
