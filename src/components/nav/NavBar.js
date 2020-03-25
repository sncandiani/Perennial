import React from "react"
import "./NavBar.css"
import firebase from 'firebase/app'
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
const NavBar = (props) => {
    
    return(
        <nav>
                <ul className="navList">
                    <li>
                        <Link className="nav-link" style={{ textDecoration: 'none', color: '#fffaf7' }} to="/">
                            Home
            </Link>
                    </li>
                    <li>
                        <Link className="nav-link" style={{ textDecoration: 'none', color: '#fffaf7' }} to="/gardens">
                            Gardens
            </Link>
                    </li>
                    <li>
                        <Link className="nav-link" style={{ textDecoration: 'none', color: '#fffaf7' }} to="/searchplants">
                            Search
            </Link>
                    </li>
                    <li>
                        <Link className="nav-link" style={{ textDecoration: 'none', color: '#fffaf7' }} to="/" onClick={() => {firebase.auth().signOut()}}>
                        Logout
            </Link>
                    </li>
                </ul>
        </nav>
    )
}

export default NavBar