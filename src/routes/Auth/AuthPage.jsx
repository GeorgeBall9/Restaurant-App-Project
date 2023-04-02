import "./AuthPage.css";
import(
  "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200&display=swap"
);

function App() {
  return (
    <div className="App">
      <h1 className="Heading">Sign in</h1>
      <div className="grey">Email</div>
      <input type="text" className="textBar" />
      <div className="grey">Password</div>
      <input type="password" className="textBar" />
      <div className="Heading">
        <span>Do not have an account?</span>
        <span className="link">Sign up now!</span>
      </div>
      <p className="grey">OR</p>
      <div>
        <button className="auth-button">
          <img src="/google.png" />
          <span className="Google">Sign in with Google</span>
        </button>
      </div>
      <div>
        <button className="auth-button">
          <img src="/facebook.png" />
          <span className="Facebook">Sign in with Facebook</span>
        </button>
      </div>
    </div>
  );
}

export default App;
