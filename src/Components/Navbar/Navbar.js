import "./navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useProducts } from "./../../Context/products-context";
import { useNavbar } from "./../../Context/navbar-context";
import { useEffect } from "react";

function Navbar() {
  const encodedToken = localStorage.getItem("ENCODED_TOKEN");

  const { isAuthenticated, setIsAuthenticated } = useNavbar();

  useEffect(() => {
    fetch("/api/user/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: encodedToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) {
          setIsAuthenticated(true);
          setNavbarButtonText("Logout");
        }
      });
  }, []);

  const { cartArray, setCartArray, setWishlistArray, wishlistArray } =
    useProducts();

  const { navbarButtonText, setNavbarButtonText } = useNavbar();

  const handleNavbar = () => {
    const items = document.querySelectorAll(".nav-items li");

    items.forEach((item) => {
      item.style.animation = "";
    });
  };

  const handleLogout = () => {
    if (navbarButtonText === "Logout") {
      localStorage.removeItem("ENCODED_TOKEN");
      localStorage.removeItem("SAVED_ADDRESSES");
      localStorage.removeItem("CART_ARRAY");
      localStorage.removeItem("WISHLIST_ARRAY");
      setNavbarButtonText("Login");
      setCartArray([]);
      setWishlistArray([]);
    }
  };

  function handleClick() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-items");
    const items = document.querySelectorAll(".nav-items li");
    nav.classList.toggle("navSlide");

    items.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `navLinkFade 0.3s ease forwards ${index / 7}s`;
      }
    });

    burger.classList.toggle("toggle");
  }

  return (
    <div className="Navbar">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">biblio</Link>
        </div>

        <div className="nav-items">
          <li onClick={handleLogout}>
            <Link to={navbarButtonText === "Login" ? "/login" : "/books"}>
              <button>{navbarButtonText}</button>
            </Link>
          </li>
          <li>
            <div onClick={handleNavbar} className="nav-wishlist-mobile">
              <div>
                <Link to={isAuthenticated === true ? "/wishlist" : "/login"}>
                  My Wishlist
                </Link>
              </div>
              <span>
                (<span className="nav-count">{wishlistArray.length}</span>)
              </span>
            </div>
            <div className="nav-wishlist">
              <div>
                <Link to={isAuthenticated === true ? "/wishlist" : "/login"}>
                  <FavoriteIcon />
                </Link>
              </div>
              <span className="nav-count">{wishlistArray.length}</span>
            </div>
          </li>
          <li>
            <div onClick={handleNavbar} className="nav-cart-mobile">
              <Link to={isAuthenticated === true ? "/cart" : "/login"}>
                My Cart
              </Link>
              <span>
                (<span className="nav-count">{cartArray.length}</span>)
              </span>
            </div>
            <div className="nav-cart">
              <div>
                <Link to={isAuthenticated === true ? "/cart" : "/login"}>
                  <ShoppingCartIcon />
                </Link>
              </div>
              <span className="nav-count">{cartArray.length}</span>
            </div>
          </li>
          <li>
            <input type="text" placeholder="Search" />
          </li>
        </div>

        <div onClick={() => handleClick()} id="burger" className="burger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
