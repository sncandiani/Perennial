import React, {useState, useEffect} from "react"
import { Route, Redirect } from "react-router-dom";
import Home from "../src/components/home/Home"
import Login from "../src/components/auth/Login"
import GardenDashboard from "../src/components/gardens/GardenDashboard"
import GardenForm from "../src/components/gardens/GardenForm"
import GardenEditForm from "../src/components/gardens/GardenEditForm"
import GardenDetail from "../src/components/gardens/GardenDetail"
import PlantList from "../src/components/plants/PlantList"
import PlantContributeForm from "../src/components/plants/PlantContributeForm"
import PlantEditForm from "../src/components/plants/PlantEditForm"
import firebase from 'firebase/app'
import API from "../src/modules/ApiManager"
import NavBar from "../src/components/nav/NavBar"
import Loading from "../src/components/loading/Loading"



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
            {firebaseUser && apiUser != null ? <NavBar {...props}/> : null}
            
            <React.Fragment>

            <Route
                    exact
                    path="/"
                    render={props => 
                     <Login />
                    }
                />
              
                <Route
                    exact
                    path="/home"
                    render={props => 
                    firebaseUser && apiUser != null ? <Home firebaseUser={firebaseUser} apiUser={apiUser} {...props}/> : <Loading />
                    }
                />
                <Route
                    exact
                    path="/gardens"
                    render={props => 
                    firebaseUser && apiUser != null ? <GardenDashboard firebaseUser={firebaseUser} apiUser={apiUser} {...props}/> : <Loading />
                    }
                />
                <Route
                    exact
                    path="/addgarden"
                    render={props => 
                    firebaseUser && apiUser != null ? <GardenForm {...props}/> : <Loading />
                    }
                />
                <Route
                exact path="/gardens/:gardenId(\d+)/"
                render={props => 
                firebaseUser && apiUser != null ? <GardenDetail gardenId={parseInt(props.match.params.gardenId)} apiUser={apiUser} {...props}/> : <Loading />
                }
            />
                <Route
                exact path="/gardens/:gardenId(\d+)/edit"
                render={props => 
                firebaseUser && apiUser != null ? <GardenEditForm {...props}/> : <Loading />
                }
            />
            <Route
                 exact path="/plants/:plantId(\d+)/edit"
                render={props => 
                firebaseUser && apiUser != null ? <PlantEditForm apiUser={apiUser} {...props}/> : <Loading />
                }
            />
            <Route
                path="/searchplants"
                render={props => 
                firebaseUser && apiUser != null ? <PlantList apiUser={apiUser} {...props}/> : <Loading />
                }
            />
            <Route
                path="/contributeplant"
                render={props => 
                firebaseUser && apiUser != null ? <PlantContributeForm {...props}/> : <Loading />
                }
            />

    </React.Fragment>
    </>
    )
}

export default AppViews 