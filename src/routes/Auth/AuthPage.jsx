import './AuthPage.css';
import('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200&display=swap');

function App() {
  return (
    <div className="App">
      <h1>Sign in</h1>
      <h5 className='grey'>Email</h5>
      <input type="text" className='textBar' />
      <h5 className='grey'>Password</h5>
      <input type="password" className='textBar' />
      <h5>Do not have an account?</h5>
      <a href="#" className='link'>Sign up now!</a>
      <div>
        <span className='grey'>OR</span>
      </div>
      <div>
        <button className='button'><span className='Google'>Sign in with Google</span></button>
      </div>
      <div><button className='button'><span className='Facebook'>Sign in with Facebook</span></button></div>
    </div>
  );
}

export default App;
