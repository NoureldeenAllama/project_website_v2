import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { loginApi } from "../../api";
import { StoreContext } from "../../pages/Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(StoreContext) || { setUser: () => {} };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // For now, backend only has login; you can add register later.
      const { user, token } = await loginApi(email, password);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (setUser) {
        setUser(user);
      }

      setShowLogin(false);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <form className="login-popup-inputs" onSubmit={handleSubmit}>
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit">
            {currState === "Login" ? "Login" : "Create account"}
          </button>
        </form>

        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use &amp; privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
