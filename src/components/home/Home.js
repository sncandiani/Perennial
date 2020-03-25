import React from "react"
import firebase from "firebase"
const Home = (props) => {
    
    return ( 
    <>
            <h1 className="welcomeHeader">Welcome {props.firebaseUser.displayName}!</h1>
    </>
    )

}

export default Home