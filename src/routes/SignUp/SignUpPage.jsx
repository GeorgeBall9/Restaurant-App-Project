import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

import {signUpAuthUserWithEmailAndPassword} from "../../firebase/firebase";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            setErrorMessage("Passwords do not match");
            setPasswordMismatch(true);
            return;
        } 
        
        setPasswordMismatch(false);

        try {
            await signUpAuthUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error("Error signing up with email and password: ", error);
            setErrorMessage("Error signing up. Please try again.")
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    
        // Clear the error message when confirm password input is changed
        if (errorMessage) {
            setErrorMessage("");
        }

        setPasswordMismatch(false);
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>

            <form onSubmit={handleSignUp} className="signup-form">
                <div className="signup-field">
                    <label htmlFor="email" className="signup-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="signup-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="signup-field">
                    <label htmlFor="password" className="signup-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="signup-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="signup-field">
                    <label htmlFor="confirm-password" className="signup-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        className={`signup-input ${passwordMismatch ? "error-border" : ""}`}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </div>
                {errorMessage && <div className="signup-error-message">{errorMessage}</div>}

                <button className="signup-button" onClick={handleSignUp}>
                    Sign up
                </button>
            </form>

            <div className="signup-page-signin">
                <p>Already have an account?
                    <Link to="/login" className="signin-link"> Sign in.</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;
