import React, { useEffect, useState } from "react"
import firebase from "firebase"
import API from "../../modules/ApiManager"
const Home = (props) => {

    return ( 
        <>
            <h1>Hi! Welcome home {props.user.displayName}!</h1>
            <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </>
    )

}

export default Home