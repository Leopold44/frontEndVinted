import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import Home from "./assets/components/Home/Home";
import Offer from "./assets/components/Offer/Offer";
import SignUp from "./assets/components/Sign/SignUp";
import SignIn from "./assets/components/Sign/SignIn";
import Publish from "./assets/components/Publish/Publish";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);
  const [search, setIsSearch] = useState("");

  return (
    <div className="app">
      <Router>
        <Header
          token={token}
          setToken={setToken}
          setSignUpVisible={setSignUpVisible}
          setSignInVisible={setSignInVisible}
          search={search}
          setIsSearch={setIsSearch}
        />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
        {signUpVisible && (
          <SignUp setSignUpVisible={setSignUpVisible} setToken={setToken} />
        )}
        {signInVisible && (
          <SignIn setSignInVisible={setSignInVisible} setToken={setToken} />
        )}
      </Router>
    </div>
  );
}

export default App;
