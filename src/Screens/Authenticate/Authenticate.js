import "./authenticate.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Authenticate(props) {
  let navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    var payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (props.cardTitle === "LOGIN") {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            localStorage.setItem("ENCODED_TOKEN", data.encodedToken);
            navigate(-1);
          }
        });
    } else if (props.cardTitle === "SIGN UP") {
      fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            localStorage.setItem("ENCODED_TOKEN", data.encodedToken);
            navigate(-1);
          }
        });
    }
  };
  return (
    <div className="Authenticate">
      <Navbar />
      <div className="landing-card">
        <h1>{props.cardTitle}</h1>
        <div className="landing-inputs">
          <div className="label-with-input">
            <label htmlFor="email">Email Address *</label>
            <input ref={emailRef} type="email" id="email" />
          </div>
          <div className="label-with-input">
            <label id="password-label" htmlFor="password">
              Password *
            </label>
            <input ref={passwordRef} type="password" id="password" />
          </div>
        </div>
        <div className="secondary-cta-section">
          <div className="secondary-cta-checkbox">
            <input id="checked-checkbox" type="checkbox" />
            <label htmlFor="checked-checkbox">{props.checkboxLabel}</label>
          </div>
          {props.cardTitle === "Login" && (
            <div>
              <a href="/">Forgot your password?</a>
            </div>
          )}
        </div>
        <Link to={isAuthenticated ? "/books" : "/login"}>
          <button onClick={handleAuth}>Next</button>
        </Link>
        <p className="alternate-cta">
          <a href="/">
            {props.alternate} <span>{">"}</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Authenticate;
