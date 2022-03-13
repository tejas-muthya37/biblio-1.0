import "./App.css";
import Navbar from "./Navbar/Navbar";
// import Authenticate from "./Authenticate/Authenticate";
import Cart from "./Cart/Cart";
import Wishlist from "./Wishlist/Wishlist";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import Checkout from "./Checkout/Checkout";
import Success from "./Success/Success";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Categories />
          </Route>

          <Route exact path="/books">
            <Navbar />
            <Products productPage={true} />
          </Route>

          <Route exact path="/books/thrillers">
            <Navbar />
            <Products thrillerPage={true} />
          </Route>

          <Route exact path="/books/drama">
            <Navbar />
            <Products dramaPage={true} />
          </Route>

          <Route exact path="/books/sci-fi">
            <Navbar />
            <Products scifiPage={true} />
          </Route>

          <Route exact path="/books/romance">
            <Navbar />
            <Products romancePage={true} />
          </Route>

          <Route exact path="/cart">
            <Navbar />
            <Cart />
          </Route>

          <Route exact path="/wishlist">
            <Navbar />
            <Wishlist />
          </Route>

          <Route exact path="/checkout">
            <Navbar />
            <Checkout />
          </Route>

          <Route exact path="/success">
            <Success />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
