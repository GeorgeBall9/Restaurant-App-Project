import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import {signUpAuthUserWithEmailAndPassword} from "../../firebase/firebase";
import FormField from "../../common/components/FormField/FormField";
import {setUserDetails} from "../../features/user/userSlice";
import {useDispatch} from "react-redux";

const SignUpPage = () => {

    const dispatch = useDispatch();

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordMismatch(password !== confirmPassword);
        }
    }, [password, confirmPassword]);

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!displayName) {
            console.error("You must have a display name");
            setErrorMessage("You must have a display name");
            return;
        }
        
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            setErrorMessage("Passwords do not match");
            setPasswordMismatch(true);
            return;
        } 
        
        setPasswordMismatch(false);

        try {
            const userDetails = await signUpAuthUserWithEmailAndPassword(displayName, email, password);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing up with email and password: ", error);
            setErrorMessage("Error signing up. Please try again.")
        }
    };

    const handleDisplayNameChange = ({target}) => {
        setDisplayName(target.value);
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
                    label="Display name"
                    type="text"
                    value={displayName}
                    onChangeHandler={handleDisplayNameChange}
                />

                <FormField
                    label="Email"
                    type="email"
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
                    className={`signup-input ${
                        passwordMismatch 
                        ? "error-border" 
                        : confirmPassword && !passwordMismatch ?
                         "success-border"
                        : ""
                    }`}
                    value={confirmPassword}
                    onChangeHandler={handleConfirmPasswordChange}
                />

                {errorMessage && <div className="signup-error-message">{errorMessage}</div>}

                <button className="signup-button" type="submit">
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
