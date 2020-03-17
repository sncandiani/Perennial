import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom";
import Home from "../src/components/home/Home"
import Login from "../src/Login"
import firebase from 'firebase/app'
import fire from "../src/config/fire"

const AppViews = (props) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            setUser(user)
            } else {
              setUser(null)
            }
          });
    
    }, [])
    return (
            <React.Fragment>
                <Route
                    exact
                    path="/"
                    render={props => 
                    user ? <Home user={user}/> : <Login />
                    }
                />
    </React.Fragment>
    )
}

export default AppViews 