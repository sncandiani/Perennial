import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom";
import Home from "../src/components/home/Home"
import Login from "../src/components/auth/Login"
import firebase from 'firebase/app'
import API from "../src/modules/ApiManager"

const AppViews = (props) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            setUser(user)
            console.log(user)
            //API.postUser({uid: user.uid, name: user.displayName})
               
            } else {
              setUser(null)
            }
          });
    
    }, []);

    
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