import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css'
import Perennial from "./Perennial"
import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBSi4awqUCgaLk-bptuuedwulnsd0bYfbc",
    authDomain: "perennial-5f4d8.firebaseapp.com",
    databaseURL: "https://perennial-5f4d8.firebaseio.com",
    projectId: "perennial-5f4d8",
    storageBucket: "perennial-5f4d8.appspot.com",
    messagingSenderId: "624070405563",
    appId: "1:624070405563:web:cc6430948b58199988a89e"
  };
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
        <Perennial />
    </Router>, 
    document.getElementById('root')
    
)
