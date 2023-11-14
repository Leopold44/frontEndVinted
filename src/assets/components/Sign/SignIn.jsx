import "./Sign.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross } from "@fortawesome/free-solid-svg-icons";

const SignIn = ({ setToken, setSignInVisible }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(false);
  const userSignIn = (elem, key) => {
    const newObject = { ...user };
    newObject[key] = elem.target.value;
    setUser(newObject);
  };
  const login = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/user/login",
        user
      );
      Cookies.set("token", `${response.data.token}`);
      setToken(response.data.token);
      setSignInVisible(false);
    } catch (error) {
      setErrorMessage(true);
    }
  };
  return (
    <main
      className="background"
      onClick={() => {
        setSignInVisible(false);
      }}
    >
      <div
        className="signup"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <FontAwesomeIcon
          icon={faCross}
          className="cross"
          onClick={() => {
            setSignInVisible(false);
          }}
        />
        <form
          onSubmit={(event) => {
            login(event);
          }}
        >
          <h1>Se connecter</h1>
          {errorMessage && (
            <p className="error">Identifiant ou mot de passe incorrect</p>
          )}
          <input
            type="email"
            name="userMail"
            value={user.email}
            placeholder="Email"
            autoComplete="email"
            onChange={(elem) => {
              userSignIn(elem, "email");
            }}
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Mot de passe"
            autoComplete="on"
            onChange={(elem) => {
              userSignIn(elem, "password");
            }}
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </main>
  );
};
export default SignIn;
