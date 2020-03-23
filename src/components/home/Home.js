import React, { useEffect, useState } from "react"
import firebase from "firebase"
import API from "../../modules/ApiManager"
import GardenList from "../gardens/GardenList"
const Home = (props) => {
    
    return ( 
        <>
            <h1>Hi! Welcome home {props.firebaseUser.displayName}!</h1>
            <button onClick={() => props.history.push("/addgarden")}>Add Garden</button>
            <GardenList apiUser={props.apiUser} {...props} />
        </>
    )

}

export default Home