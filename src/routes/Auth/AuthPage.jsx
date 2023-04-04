import "./AuthPage.css";

import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithFacebookPopup
} from "../../firebase/firebase";

function App() {

    // both the sign in with popup functions should return a user object - use these functions in the functions below
    // create a redux reducer called userSlice.js to store the user ID returned when the user signs in
    // useful site: https://redux.js.org/tutorials/quick-start
    const handleGoogleSignInClick = async () => {};

    const handleFacebookSignInClick = async () => {};

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
                <button className="auth-button">
                    <img src="/google.png"/>
                    <span className="Google">Sign in with Google</span>
                </button>
            </div>
            <div>
                <button className="auth-button">
                    <img src="/facebook.png"/>
                    <span className="Facebook">Sign in with Facebook</span>
                </button>
            </div>
        </div>
    );
}

export default App;
