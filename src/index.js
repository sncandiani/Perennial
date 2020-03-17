import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css'
import Perennial from "../src/Perennial"
import firebaseConfig from "../src/config/fire"
import firebase from "firebase"

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
    <Router>
        <Perennial />
    </Router>, 
    document.getElementById('root')
    
)
