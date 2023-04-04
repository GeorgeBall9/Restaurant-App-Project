import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignUp = () => {
        // Implement sign up functionality here
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>

            <form onSubmit={(e) => e.preventDefault()} className="signup-form">
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
                        className="signup-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

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
