import "./authenticate.css";

function Authenticate(props) {
  return (
    <div className="Authenticate">
      <div className="landing-card">
        <h1>{props.cardTitle}</h1>
        <div className="landing-inputs">
          <div className="label-with-input">
            <label for="email">Email Address *</label>
            <input type="email" id="email" />
          </div>
          <div className="label-with-input">
            <label id="password-label" for="password">
              Password *
            </label>
            <input type="password" id="password" />
          </div>
        </div>
        <div className="secondary-cta-section">
          <div className="secondary-cta-checkbox">
            <input checked id="checked-checkbox" type="checkbox" />
            <label for="checked-checkbox">{props.checkboxLabel}</label>
          </div>
          {props.cardTitle === "Login" && (
            <div>
              <a href="/">Forgot your password?</a>
            </div>
          )}
        </div>
        <button>Next</button>
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
