import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import {signUpAuthUserWithEmailAndPassword} from "../../firebase/firebase";
import FormField from "../../common/components/FormField/FormField";
import {setUserDetails} from "../../features/user/userSlice";
import {useDispatch} from "react-redux";
import PrimaryButton from "../../common/components/ButtonViews/PrimaryButton/PrimaryButton";

const SignUpPage = () => {

    const dispatch = useDispatch();

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [signUpButtonText, setSignUpButtonText] = useState("Sign up");

    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordMismatch(password !== confirmPassword);
        }
    }, [password, confirmPassword]);

    const handleSignUp = async () => {
        if (!displayName) {
            setErrorMessage("You must have a display name");
            return;
        }

        if (!email) {
            setErrorMessage("You must have an email");
            return;
        }

        if (!password) {
            setErrorMessage("You must have a password");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Passwords must contain at least 6 characters");
            return;
        }
        
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setPasswordMismatch(true);
            return;
        } 
        
        setPasswordMismatch(false);

        try {
            setSignUpButtonText("Signing up...");
            const userDetails = await signUpAuthUserWithEmailAndPassword(displayName, email, password);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error("Error signing up with email and password: ", error);
            setErrorMessage("Error signing up. Please try again.");
        } finally {
            setSignUpButtonText("Sign up");
        }
    };

    const handleDisplayNameChange = ({target}) => {
        setErrorMessage("");
        setDisplayName(target.value);
    };

    const handleEmailChange = ({target}) => {
        setErrorMessage("");
        setEmail(target.value);
    };

    const handlePasswordChange = ({target}) => {
        setErrorMessage("");
        setPassword(target.value);
    };

    const handleConfirmPasswordChange = ({target}) => {
        const {value} = target;

        setErrorMessage("");
        setConfirmPassword(value);
    
        // Clear the error message when confirm password input is changed
        if (errorMessage) {
            setErrorMessage("");
        }

        console.log(value !== password)
        setPasswordMismatch(value !== password);
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>

            <form className="signup-form">
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
                        : (confirmPassword && !passwordMismatch ?
                         "success-border"
                        : "")
                    }`}
                    value={confirmPassword}
                    onChangeHandler={handleConfirmPasswordChange}
                />

                {errorMessage && <div className="signup-error-message">{errorMessage}</div>}

                <PrimaryButton
                    text={signUpButtonText}
                    type="button"
                    handleClick={handleSignUp}
                />
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
