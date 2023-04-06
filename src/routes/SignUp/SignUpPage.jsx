import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

import {signUpAuthUserWithEmailAndPassword} from "../../firebase/firebase";
import FormField from "../../common/components/FormField/FormField";
import {setUserDetails} from "../../features/user/userSlice";
import {useDispatch} from "react-redux";

function SignUpPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleSignUp = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            setErrorMessage("Passwords do not match");
            setPasswordMismatch(true);
            return;
        } 
        
        setPasswordMismatch(false);

        try {
            const userDetails = await signUpAuthUserWithEmailAndPassword(email, password);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing up with email and password: ", error);
            setErrorMessage("Error signing up. Please try again.")
        }
    };

    const handleEmailChange = ({target}) => {
        setEmail(target.value);
    };

    const handlePasswordChange = ({target}) => {
        setPassword(target.value);
    };

    const handleConfirmPasswordChange = ({target}) => {
        setConfirmPassword(target.value);
    
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
                <FormField
                    label="Email"
                    type={email}
                    value={email}
                    onChangeHandler={handleEmailChange}
                />

                <FormField
                    label="Password"
                    type="password"
                    value={password}
                    onChangeHandler={handlePasswordChange}
                />

                <FormField
                    label="Confirm password"
                    type="password"
                    className={`signup-input ${passwordMismatch ? "error-border" : ""}`}
                    value={confirmPassword}
                    onChangeHandler={handleConfirmPasswordChange}
                />

                {errorMessage && <div className="signup-error-message">{errorMessage}</div>}

                <button className="signup-button" onClick={handleSignUp}>
                    Sign up
                </button>
            </form>

            <div className="signup-page-signin">
                <p>Already have an account?
                    <Link to="/sign-in" className="signin-link"> Sign in.</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;
