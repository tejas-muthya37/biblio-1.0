import "./authenticate.css";
import { useRef } from "react";

function Authenticate(props) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleAuth = () => {
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (props.cardTitle === "LOGIN") {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else if (props.cardTitle === "SIGN UP") {
      fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div className="Authenticate">
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
        <button onClick={handleAuth}>Next</button>
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
