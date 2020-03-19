import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom";
import Home from "../src/components/home/Home"
import Login from "../src/components/auth/Login"
import GardenForm from "../src/components/gardens/GardenForm"
import GardenEditForm from "../src/components/gardens/GardenEditForm"
import firebase from 'firebase/app'
import API from "../src/modules/ApiManager"


const AppViews = (props) => {
    const [user, setUser] = useState(null)
    const [apiUser, setApiUser] = useState(parseInt(sessionStorage.getItem("user")))
    
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            setUser(user)
            API.findUser(user.uid).then((userInfo) => {
                userInfo.forEach(user => {
                    sessionStorage.setItem("user", user.id)
                })
                if(userInfo.length === 0) {
                    API.postUser({uid: user.uid, name: user.displayName}).then(setApiUser)
                } else {
                    console.log("user already exists")
                }
            } ) 
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
                    user ? <Home firebaseUser={user} apiUser={apiUser} {...props}/> : <Login />
                    }
                />
                <Route
                    exact
                    path="/addgarden"
                    render={props => 
                    user ? <GardenForm {...props}/> : <Login />
                    }
                />
                <Route
                path="/gardens/:gardenId(\d+)/edit"
                render={props => 
                user ? <GardenEditForm {...props}/> : <Login />
                }
            />
    </React.Fragment>
    )
}

export default AppViews 