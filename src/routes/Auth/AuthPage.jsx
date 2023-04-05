import "./AuthPage.css";
import React from "react";
import { useDispatch } from "react-redux";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithFacebookPopup,
} from "../../firebase/firebase";
import {setUserDetails} from "../../features/user/userSlice";

function App() {

    const dispatch = useDispatch();

    const handleGoogleSignInClick = async () => {
        try {
            const userDetails = await signInWithGooglePopup();
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    const handleFacebookSignInClick = async () => {
        try {
            const userDetails = await signInWithFacebookPopup();
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing up with Facebook: ", error);
        }
    };

    return (
        <div className="App">
            <h1 className="Heading">Sign in</h1>
            <div className="grey">Email</div>
            <input type="text" className="textBar"/>
            <div className="grey">Password</div>
            <input type="password" className="textBar"/>
            <div className="Heading">
                <span>Do not have an account?</span>
                <span className="link">Sign up now!</span>
            </div>
            <p className="grey">OR</p>
            <div>
                <button className="auth-button" onClick={handleGoogleSignInClick}>
                    <img src="/google.png"/>
                    <span className="Google">Sign in with Google</span>
                </button>
            </div>
            <div>
                <button className="auth-button" onClick={handleFacebookSignInClick}>
                    <img src="/facebook.png"/>
                    <span className="Facebook">Sign in with Facebook</span>
                </button>
            </div>
        </div>
    );
}

export default App;
