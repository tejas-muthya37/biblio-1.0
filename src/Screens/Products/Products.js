import "./products.css";
import Card from "./../../Components/Card/Card";
import { useEffect, useRef } from "react";
import { useProducts } from "./../../Context/products-context";
import { useToast } from "./../../Context/toast-context";
import { useFilter } from "./../../Context/filter-context";
import Navbar from "./../../Components/Navbar/Navbar";
import { useParams } from "react-router";

function Products(props) {
  let { categoryName } = useParams();
  const inputRef = useRef(null);

  const inputs = document.querySelectorAll('input:not([type="text"])');

  const clearFilters = () => {
    dispatch({ type: "Clear filter" });
    inputs.forEach((input) => {
      if (input.type === "range") {
        input.value = "150";
      } else {
        input.checked = false;
      }
    });
  };

  const { state, dispatch } = useFilter();

  useEffect(() => {
    fetch("/api/products", { method: "GET" })
      .then((res) => res.json())
      .then((json) => dispatch({ type: "Setup", payload: json.products }));
  }, []);

  const { toggleToast, toastVisibility, toastColor, toastText } = useToast();

  const { cartArray, setCartArray, wishlistArray, setWishlistArray } =
    useProducts();

  const encodedToken = localStorage.getItem("ENCODED_TOKEN");

  const addToCart = (product) => {
    var productFlag = false;
    cartArray.map((cartItem, index) => {
      if (cartItem.id === product.id) {
        productFlag = true;
        setCartArray([
          ...cartArray.slice(0, index),
          { ...cartArray[index], bookQuantity: cartItem.bookQuantity + 1 },
          ...cartArray.slice(index + 1),
        ]);
      }
      return true;
    });
    if (productFlag === false) setCartArray([...cartArray, product]);
    toggleToast("Added To Cart ✔", "green", "whitesmoke");

    fetch("/api/user/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: encodedToken,
      },
      body: JSON.stringify({ product }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const addToWishlist = (product) => {
    var wishlistFlag = false;
    wishlistArray.map((wishlistItem) => {
      if (wishlistItem.id === product.id) {
        wishlistFlag = true;
        return true;
      }
      return true;
    });
    if (wishlistFlag === false) {
      setWishlistArray([...wishlistArray, product]);
    }
    toggleToast("Added To Wishlist ✔", "green", "whitesmoke");

    fetch("/api/user/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: encodedToken,
      },
      body: JSON.stringify({ product }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    localStorage.setItem("CART_ARRAY", JSON.stringify(cartArray));
    localStorage.setItem("WISHLIST_ARRAY", JSON.stringify(wishlistArray));
  }, [cartArray, wishlistArray]);

  return (
    <div className="Products">
      <Navbar />
      <p
        style={{
          visibility: toastVisibility,
          backgroundColor: toastColor.backgroundColor,
          color: toastColor.color,
        }}
        className="message-toast"
      >
        {toastText}
      </p>
      <div className="landing-page-container">
        <div className="filter-section">
          <div className="filter-section-title">
            <h3> Filters </h3> <p onClick={clearFilters}> Clear </p>{" "}
          </div>{" "}
          <div className="price-filter">
            <h3 className="filter-header"> Price </h3>{" "}
            <input
              ref={inputRef}
              onChange={(event) =>
                dispatch({ type: "Price filter", payload: event.target.value })
              }
              type="range"
              min="150"
              max="450"
              step="100"
            />
            <p>
              <span> 150 </span> <span> 250 </span> <span> 350 </span>{" "}
              <span> 450 </span>{" "}
            </p>{" "}
          </div>{" "}
          {props.productPage && (
            <div className="category-filter input-filter">
              <h3 className="filter-header"> Category </h3>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Thriller"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) =>
                    dispatch({ type: "Category filter", payload: event.target })
                  }
                />
                <label htmlFor="thriller-category"> Thrillers </label>{" "}
              </div>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Drama"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) =>
                    dispatch({ type: "Category filter", payload: event.target })
                  }
                />{" "}
                <label htmlFor="drama-category"> Drama </label>{" "}
              </div>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Scifi"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) =>
                    dispatch({ type: "Category filter", payload: event.target })
                  }
                />{" "}
                <label htmlFor="scifi-category"> Sci - Fi </label>{" "}
              </div>{" "}
              <div>
                <input
                  ref={inputRef}
                  id="Romance"
                  className="category-checkbox"
                  type="checkbox"
                  onChange={(event) =>
                    dispatch({ type: "Category filter", payload: event.target })
                  }
                />{" "}
                <label htmlFor="romance-category"> Romance </label>{" "}
              </div>{" "}
            </div>
          )}
          <div className="rating-filter input-filter">
            <h3 className="filter-header"> Rating </h3>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                value={4}
                id="rating-4-stars-and-above"
                name="rating-input"
                onClick={(event) =>
                  dispatch({
                    type: "Rating filter",
                    payload: event.target.value,
                  })
                }
              />{" "}
              <label htmlFor="radio-1"> 4 Stars & above </label>{" "}
            </div>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                value={3}
                id="rating-3-stars-and-above"
                name="rating-input"
                onClick={(event) =>
                  dispatch({
                    type: "Rating filter",
                    payload: event.target.value,
                  })
                }
              />{" "}
              <label htmlFor="radio-2"> 3 Stars & above </label>{" "}
            </div>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                value={2}
                id="rating-2-stars-and-above"
                name="rating-input"
                onClick={(event) =>
                  dispatch({
                    type: "Rating filter",
                    payload: event.target.value,
                  })
                }
              />{" "}
              <label htmlFor="radio-3"> 2 Stars & above </label>{" "}
            </div>{" "}
          </div>{" "}
          <div className="sort-filter input-filter">
            <h3 className="filter-header"> Sort by </h3>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                id="radio-5"
                name="sort-input"
                onClick={() => dispatch({ type: "Low to High" })}
              />
              <label htmlFor="radio-5"> Low to High </label>{" "}
            </div>{" "}
            <div>
              <input
                ref={inputRef}
                type="radio"
                id="radio-6"
                name="sort-input"
                onClick={() => dispatch({ type: "High to Low" })}
              />
              <label htmlFor="radio-6"> High to Low </label>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="landing-page-content">
          {props.productPage &&
            state.items.map((product) => {
              return (
                product.show && (
                  <Card
                    key={product.id}
                    bookCover={product.bookCover}
                    bookTitle={product.bookTitle}
                    bookAuthor={product.bookAuthor}
                    bookPrice={product.bookPrice}
                    actionOne={product.actionOne}
                    actionTwo={product.actionTwo}
                    actionOneFunction={() => addToCart(product)}
                    actionTwoFunction={() => addToWishlist(product)}
                    bookQuantity={1}
                  />
                )
              );
            })}

          {state.items
            .filter((item) => item.categoryName === categoryName)
            .map((product) => {
              return (
                product.show && (
                  <Card
                    key={product._id}
                    bookCover={product.bookCover}
                    bookTitle={product.bookTitle}
                    bookAuthor={product.bookAuthor}
                    bookPrice={product.bookPrice}
                    actionOne={product.actionOne}
                    actionTwo={product.actionTwo}
                    actionOneFunction={() => addToCart(product)}
                    actionTwoFunction={() => addToWishlist(product)}
                    bookQuantity={1}
                  />
                )
              );
            })}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Products;
