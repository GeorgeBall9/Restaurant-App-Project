import "./SignInPage.css";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithFacebookPopup,
} from "../../firebase/firebase";
import {setUserDetails} from "../../features/user/userSlice";
import { useState } from "react";

const SignInPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailAndPasswordSignIn = async () => {
        try {
            const userDetails = await signInAuthUserWithEmailAndPassword(email, password);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing in with email and password", error);
        }
    };

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
        <div className="signin-container">
            <h1>Sign In</h1>

            <form onSubmit={handleEmailAndPasswordSignIn} className="signin-form">
                <div className="signin-field">
                    <label htmlFor="email" className="signin-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="signin-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="signin-field">
                    <label htmlFor="password" className="signin-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="signin-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <div className="signin-error-message">{errorMessage}</div>}

                <button className="signin-button" onClick={handleEmailAndPasswordSignIn}>
                    Sign in
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
                    <img src="/google.png" alt="Google logo"/>
                    <span className="google">Sign in with Google</span>
                </button>
            </div>

            <div className="signin-facebook">
                <button className="auth-button-facebook" onClick={handleFacebookSignInClick}>
                    <img src="/facebook.png" alt="Facebook logo"/>
                    <span>Sign in with Facebook</span>
                </button>
            </div>
        </div>
    );
}

export default SignInPage;
