import React, {useState, useEffect} from "react"

const Login = () => {
    const firebase = require('firebase');
    const firebaseui = require('firebaseui');
    const [ui, setUi] = useState(firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth()));
    useEffect(() => {
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
      ui.start('#firebaseui-auth-container', uiConfig);
    }, []);
    
    
    return (
        <>
        <div className="loginSect">
          <div className="siteOpener">
            <a className="loginName" href="http://localhost:3000/">Perennial</a>
          </div>
          <div id="firebaseui-auth-container"></div>
        </div>
        <div id="loader">Loading...</div>
        </>
    )
}

export default Login