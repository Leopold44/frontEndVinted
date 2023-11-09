import "./Sign.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross } from "@fortawesome/free-solid-svg-icons";

const SignUp = ({ setIsAuthenticated, setSignUpVisible }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const userUpdate = (elem, key) => {
    const objectNew = { ...user };
    if (!key) {
      objectNew.newsletter
        ? (objectNew.newsletter = false)
        : (objectNew.newsletter = true);
    } else {
      objectNew[key] = elem.target.value;
    }
    setUser(objectNew);
  };

  const setSignUp = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        user
      );
      Cookies.set("token", `${response.data.token}`);
      setIsAuthenticated(response.data.token);
      setSignUpVisible(false);
    } catch (error) {
      error.message;
    }
  };

  return (
    <main
      className="background"
      onClick={() => {
        setSignUpVisible(false);
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
            setSignUpVisible(false);
          }}
        />
        <form
          onSubmit={(event) => {
            setSignUp(event);
          }}
        >
          <h1>S'inscrire</h1>
          <input
            type="text"
            name="userName"
            value={user.username}
            placeholder="Nom d'utilisateur"
            autoComplete="off"
            onChange={(elem) => {
              userUpdate(elem, "username");
            }}
          />
          <input
            type="email"
            name="userMail"
            value={user.email}
            placeholder="Email"
            autoComplete="email"
            onChange={(elem) => {
              userUpdate(elem, "email");
            }}
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Mot de passe"
            autoComplete="on"
            onChange={(elem) => {
              userUpdate(elem, "password");
            }}
          />
          <div className="checkbox">
            <input
              type="checkbox"
              name="newsletter"
              value={user.newsletter}
              id="newsletter"
              className="checkbox"
              onChange={(elem) => {
                userUpdate(elem);
              }}
            />
            <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
          </div>

          <p>
            En m'inscrivant, je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </main>
  );
};
export default SignUp;
