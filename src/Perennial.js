import React from "react"
import AppViews from "../src/AppViews"
const Perennial = () => {
  const authListener = () => {
      fire.auth().onAuthStateChanged((user) => {
          if(user) {
              this.setState({user})
          }
      })
  }  
    return (
        <>
        <AppViews />
        </>
    )
}

export default Perennial