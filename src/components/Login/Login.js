import { useContext, useState } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  firebaseConfigFile,
  handelFbSignIn,
  handelGoogleSignIn,
  handelSignOut,
  signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSign: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  firebaseConfigFile();

  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);

    let isValid = true;
    if (event.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isValidPassword = event.target.value.length > 6;
      const isWithNumValidPass = /\d{1}/.test(event.target.value);
      isValid = isValidPassword && isWithNumValidPass;
    }
    if (isValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const googleSignIn = () => {
    handelGoogleSignIn()
    .then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const fbSignIn = () => {
    handelFbSignIn()
    .then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const signOut = () => {
    handelSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }

    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSign ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign in Facebook</button>
      {user.isSign && (
        <div>
          <p>
            Welcome, <h2>{user.name}</h2>
          </p>
          <p>Email: {user.email}</p>
          <br />
          <img src={user.photo} alt="" />
        </div>
      )}

      <h2>Our Own Authentication</h2>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            name="name"
            type="text"
            onBlur={handleBlur}
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="write your email address"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success === true && (
        <p style={{ color: "green" }}>
          User {newUser ? "Create" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
