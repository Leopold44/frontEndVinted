import logo from "../../../Images/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
<FontAwesomeIcon icon={faMagnifyingGlass} />;

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
  setSignUpVisible,
  setSignInVisible,
  search,
  setIsSearch,
}) => {
  const navigate = useNavigate();
  const disconnect = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <header>
      <div>
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>

          <input
            type="text"
            name="search"
            value={search}
            placeholder="Rechercher des articles"
            onChange={(elem) => {
              setIsSearch(elem.target.value);
            }}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
        </div>
        <div>
          {isAuthenticated ? (
            <button onClick={disconnect}>Se déconnecter</button>
          ) : (
            <>
              <button
                onClick={() => {
                  setSignUpVisible(true);
                  setSignInVisible(false);
                }}
              >
                S'inscrire
              </button>
              <button
                onClick={() => {
                  setSignInVisible(true);
                  setSignUpVisible(false);
                }}
              >
                Se connecter
              </button>
            </>
          )}
          <button
            onClick={() => {
              isAuthenticated ? navigate("/publish") : setSignInVisible(true);
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
