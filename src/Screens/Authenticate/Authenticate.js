import "./authenticate.css";
import { useRef } from "react";
import Navbar from "./../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useNavbar } from "./../../Context/navbar-context";

function Authenticate(props) {
  const { setNavbarButtonText } = useNavbar();
  let navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
            setNavbarButtonText("Logout");
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
            setNavbarButtonText("Logout");
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

        {/* Implementing this functionality later. */}

        {/* <div className="secondary-cta-section">
          <div className="secondary-cta-checkbox">
            <input id="checked-checkbox" type="checkbox" />
            <label htmlFor="checked-checkbox">{props.checkboxLabel}</label>
          </div>
          {props.cardTitle === "LOGIN" && (
            <div>
              <a href="/">Forgot your password?</a>
            </div>
          )}
        </div> */}
        <button onClick={handleAuth}>Next</button>
        <p className="alternate-cta">
          <Link to={props.cardTitle === "LOGIN" ? "/signup" : "/login"}>
            {props.alternate} <span>{">"}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Authenticate;
