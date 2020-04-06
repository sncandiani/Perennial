import React, { useState, useEffect } from "react";
import "./NavBar.css";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";
const NavBar = props => {
  
  const [backgroundColor, setBackgroundColor] = useState({
    backgroundColor: "transparent"
  });
  
  const currentLocation = props.location.pathname;
useEffect(() => {
  setBackgroundColor(
         currentLocation === "/home"
           ? { backgroundColor: "transparent" }
           : { backgroundColor: "#F4DFC6" }
       ) 
    
}, [])

  return (
    <nav className="nav">
      <ul style={backgroundColor} className="navList">
        <div className="primaryNavLinks">
          <li>
            <a className="navLinks"
            
             href="http://localhost:3000/home">
              Perennial
            </a>
          </li>
        </div>
        <div className="secondaryNavLinks">
          <li>
            <a
              className="navLinks"
              
              href="http://localhost:3000/gardens"
            >
              Gardens
            </a>
          </li>
          <li>
            <a
              className="navLinks"
              
              href="http://localhost:3000/searchplants"
            >
              Search
            </a>
          </li>
          <li>
            <a
              className="navLinks"
              
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
