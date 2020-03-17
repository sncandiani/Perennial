import React from "react"
import firebase from "firebase"
const Home = (props) => {
    return ( 
        <>
            <h1>Hi! Welcome home {props.user.displayName}!</h1>
            <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </>
    )

}

export default Home