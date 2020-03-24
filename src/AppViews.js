import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom";
import Home from "../src/components/home/Home"
import Login from "../src/components/auth/Login"
import GardenForm from "../src/components/gardens/GardenForm"
import GardenEditForm from "../src/components/gardens/GardenEditForm"
import GardenDetail from "../src/components/gardens/GardenDetail"
import PlantList from "../src/components/plants/PlantList"
import PlantContributeForm from "../src/components/plants/PlantContributeForm"
import PlantEditForm from "../src/components/plants/PlantEditForm"
import firebase from 'firebase/app'
import API from "../src/modules/ApiManager"
import NavBar from "../src/components/nav/NavBar"



const AppViews = (props) => {
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [apiUser, setApiUser] = useState(null)
    
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(fireUser) {
            if (fireUser) {
            setFirebaseUser(fireUser)
            //if there is already a user
            API.findUser(fireUser.uid).then((userInfo) => {
                userInfo.forEach(fireUserInfo => {
                    sessionStorage.setItem("userId", fireUserInfo.id)
                    //setApiUser(fireUserInfo.id)
                    setApiUser(parseInt(sessionStorage.getItem("userId")))
                })
                if(userInfo.length === 0) {
                    //if there is not yet a user
                    API.postUser({uid: fireUser.uid, name: fireUser.displayName})
                    .then(resp => resp.json())
                    .then((r) => {
                        sessionStorage.setItem("userId", r.id)
                        setApiUser(r.id)
                    })
                } else {
                    console.log("")
                }
            } ) 
            } else {
              setFirebaseUser(null)
            }
          });
    }, []);

    

        return (
            <>
            {firebaseUser && apiUser != null ? <NavBar /> : null}
            
            <React.Fragment>
              
                <Route
                    exact
                    path="/"
                    render={props => 
                    firebaseUser && apiUser != null ? <Home firebaseUser={firebaseUser} apiUser={apiUser} {...props}/> : <Login />
                    }
                />
                <Route
                    exact
                    path="/addgarden"
                    render={props => 
                    firebaseUser && apiUser != null ? <GardenForm {...props}/> : <Login />
                    }
                />
                <Route
                exact path="/gardens/:gardenId(\d+)/"
                render={props => 
                firebaseUser && apiUser != null ? <GardenDetail gardenId={parseInt(props.match.params.gardenId)} apiUser={apiUser} {...props}/> : <Login />
                }
            />
                <Route
                exact path="/gardens/:gardenId(\d+)/edit"
                render={props => 
                firebaseUser && apiUser != null ? <GardenEditForm {...props}/> : <Login />
                }
            />
            <Route
                 exact path="/plants/:plantId(\d+)/edit"
                render={props => 
                firebaseUser && apiUser != null ? <PlantEditForm apiUser={apiUser} {...props}/> : <Login />
                }
            />
            <Route
                path="/searchplants"
                render={props => 
                firebaseUser && apiUser != null ? <PlantList apiUser={apiUser} {...props}/> : <Login />
                }
            />
            <Route
                path="/contributeplant"
                render={props => 
                firebaseUser && apiUser != null ? <PlantContributeForm {...props}/> : <Login />
                }
            />
    </React.Fragment>
    </>
    )
}

export default AppViews 