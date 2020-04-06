import React, { useState, useEffect } from "react";
import "./NavBar.css";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";
const NavBar = props => {
  
  const [backgroundColor, setBackgroundColor] = useState({
    backgroundColor: "transparent"
  });
  const [color, setColor] = useState({
    color: "white"
  })
  
  const currentLocation = props.location.pathname;
useEffect(() => {
  setBackgroundColor(
         currentLocation === "/home"
           ? { backgroundColor: "transparent" }
           : { backgroundColor: "#fffaf7" }
       );
setColor(
  currentLocation === "/home"
           ? { color: "#white" }
           : { color: "#184b3b" }
)
}, [])

  return (
    <nav className="nav">
      <ul style={backgroundColor} className="navList">
        <div className="primaryNavLinks">
          <li>
            <img
              className="icon"
              src={require("../../css/white-leaf-icon.svg")}
            ></img>
          </li>
          <li>
            <a className="navLinks"
            style={color}
             href="http://localhost:3000/home">
              Perennial
            </a>
          </li>
        </div>
        <div className="secondaryNavLinks">
          <li>
            <a
              className="navLinks"
              style={color}
              href="http://localhost:3000/gardens"
            >
              Gardens
            </a>
          </li>
          <li>
            <a
              className="navLinks"
              style={color}
              href="http://localhost:3000/searchplants"
            >
              Search
            </a>
          </li>
          <li>
            <a
              className="navLinks"
              style={color}
              href="http://localhost:3000/"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Logout
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
