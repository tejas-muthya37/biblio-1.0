import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1>Works fine</h1>
          </Route>

          <Route exact path="/better">
            <h1>Works better</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
