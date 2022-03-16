import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
// import Authenticate from "./Screens/Authenticate/Authenticate";
import Cart from "./Screens/Cart/Cart";
import Wishlist from "./Screens/Wishlist/Wishlist";
import Products from "./Screens/Products/Products";
import Categories from "./Screens/Categories/Categories";
import Checkout from "./Screens/Checkout/Checkout";
import Success from "./Screens/Success/Success";
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
