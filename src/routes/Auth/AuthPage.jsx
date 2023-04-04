import "./AuthPage.css";
import React from "react";
import { useDispatch } from "react-redux";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithFacebookPopup, userDocExists, createUserDoc
} from "../../firebase/firebase";
import {setDisplayName, setIconColour, setUserId} from "../../features/user/userSlice";

const getRandomColour = () => {
    const colours = [
        "#FF2E63",
        "#B3E5BE",
        "#AA77FF",
        "#19A7CE",
        "#FE6244",
        "#FCFFA6",
        "#E6A4B4",
        "#5D9C59",
        "#E21818",
    ];

    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
};

function App() {

    const dispatch = useDispatch();

    const createNewUserInDatabase = async (user) => {
        const {uid, displayName, email} = user;

        if (await userDocExists(uid)) return;

        const iconColour = getRandomColour();

        const data = {displayName, email, iconColour};
        await createUserDoc(data, uid);

        dispatch(setDisplayName(displayName));
        dispatch(setIconColour(iconColour));
    };

    // both the sign in with popup functions should return a user object - use these functions in the functions below
    // create a redux reducer called userSlice.js to store the user ID returned when the user signs in
    // useful site: https://redux.js.org/tutorials/quick-start
    const handleGoogleSignInClick = async () => {
        try {
            const user = await signInWithGooglePopup();
            dispatch(setUserId({ userId: user.uid }));
            await createNewUserInDatabase(user);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    const handleFacebookSignInClick = async () => {
        try {
            const user = await signInWithFacebookPopup();
            dispatch(setUserId({ userId: user.uid }));
            await createNewUserInDatabase(user);
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
