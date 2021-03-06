import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut} from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();
const handleGoogleSignIn = () =>{
  
  signInWithPopup(auth, googleProvider)
  .then(result =>{
    const {displayName, email, photoURL} = result.user;
    const loggedInUser = {
      name:displayName,
      email:email,
      photo:photoURL 
    };
    setUser(loggedInUser);
  })
  .catch(error => {
    console.log(error.message)
  })
}

const handleGithubSignIn = ()=>{
  signInWithPopup(auth, githubProvider)
  .then(result =>{
    const {displayName, email, photoURL} = result.user;
    const loggedInUser = {
      name: displayName,
      email: email,
      photo: photoURL
    }
    setUser(loggedInUser);
  })
};

const handleSignOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({})
    })
}


  return (
    <div className="App">
      {!user.photo?
        <div>
      <button onClick={handleGoogleSignIn}>Google sign in</button>
      <button onClick={handleGithubSignIn}>Github sign in</button>
      </div>:
      <button onClick={handleSignOut}>Sign out</button>}
      <br />
      {
        user.photo && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
