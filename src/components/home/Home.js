import React, { useEffect, useState } from "react"
import firebase from "firebase"
import API from "../../modules/ApiManager"
import GardenList from "../gardens/GardenList"
const Home = (props) => {
    
    const clearUser = () => {
        sessionStorage.clear()
    }
    console.log(props.firebaseUser)
    return ( 
        <>
            <h1>Hi! Welcome home {props.firebaseUser.displayName}!</h1>
            <button onClick={() => {firebase.auth().signOut() && clearUser()}}>Logout</button>
            <button onClick={() => props.history.push("/addgarden")}>Add Garden</button>
            <GardenList apiUser={props.apiUser} {...props} />
        </>
    )

}

export default Home