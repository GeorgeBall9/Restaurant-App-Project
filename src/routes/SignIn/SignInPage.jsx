import "./SignInPage.css";
import React from "react";
import FormField from "../../common/components/FormField/FormField";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithFacebookPopup,
} from "../../firebase/firebase";
import {setUserDetails} from "../../features/user/userSlice";
import { useState } from "react";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SignInPage = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [signInButtonText, setSignInButtonText] = useState("Sign in");
    const [googleSignInText, setGoogleSignInText] = useState("Sign in with Google");

    const handleEmailAndPasswordSignIn = async (event) => {
        event.preventDefault();

        try {
            setSignInButtonText("Signing in...");
            const userDetails = await signInAuthUserWithEmailAndPassword(email, password);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing in with email and password", error);
        }
    };

    const handleGoogleSignInClick = async () => {
        try {
            setGoogleSignInText("Signing in...");
            const userDetails = await signInWithGooglePopup();
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    // const handleFacebookSignInClick = async () => {
    //     try {
    //         const userDetails = await signInWithFacebookPopup();
    //         dispatch(setUserDetails(userDetails));
    //     } catch (error) {
    //         console.error("Error signing up with Facebook: ", error);
    //     }
    // };

    return (
        <div className="signin-container">
            <h1>Sign In</h1>

            <form onSubmit={handleEmailAndPasswordSignIn} className="signin-form">
                <FormField 
                    label="Email"
                    type="email"
                    value={email}
                    onChangeHandler={(e) => setEmail(e.target.value)}
                />

                <FormField 
                    label="Password"
                    type="password"
                    value={password}
                    onChangeHandler={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <div className="signin-error-message">{errorMessage}</div>}

                <button className="signin-button" type="submit">
                    {signInButtonText}
                </button>
            </form>

            <div className="signin-page-signup">
                <p>Don't have an account?
                    <Link to="/sign-up" className="signup-link"> Sign up.</Link>
                </p>
            </div>

            <div className="signin-page-separator">
                <span>OR</span>
                
            </div>

            <div className="signin-google">
                <button className="auth-button-google" onClick={handleGoogleSignInClick}>
                    <FontAwesomeIcon icon={faGoogle} className="icon"/>
                    <span className="google">{googleSignInText}</span>
                </button>
            </div>

            {/*<div className="signin-facebook">*/}
            {/*    <button className="auth-button-facebook" onClick={handleFacebookSignInClick}>*/}
            {/*        <img src="/facebook.png" alt="Facebook logo"/>*/}
            {/*        <span>Sign in with Facebook</span>*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
}

export default SignInPage;
