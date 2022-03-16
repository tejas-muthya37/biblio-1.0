import "./cart.css";
import Card from "./../../Components/Card/Card";
import { useEffect } from "react";
import { useProducts } from "./../../Context/products-context";
import { Link } from "react-router-dom";
import Empty from "./../../Components/Empty/Empty";
import emptyImage from "./../../Media/empty-cart.png";
import { useToast } from "./../../Context/toast-context";

function Cart() {
  const { toggleToast, toastVisibility, toastColor, toastText } = useToast();

  const { cartArray, setCartArray, wishlistArray, setWishlistArray } =
    useProducts();

  const removeFromCart = (id) => {
    setCartArray(cartArray.filter((cartItem) => cartItem.id !== id));
    toggleToast("Removed From Cart ✔", "red", "whitesmoke");
  };

  const moveToWishlist = (product) => {
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
    toggleToast("Moved To Wishlist ✔", "green", "whitesmoke");
    setCartArray(cartArray.filter((cartItem) => cartItem.id !== product.id));
  };

  const incrementCartItemQuantity = (id) => {
    cartArray.map((cartItem, index) => {
      if (cartItem.id === id) {
        setCartArray([
          ...cartArray.slice(0, index),
          { ...cartArray[index], bookQuantity: cartItem.bookQuantity + 1 },
          ...cartArray.slice(index + 1),
        ]);
      }
      return true;
    });
  };

  const decrementCartItemQuantity = (id) => {
    cartArray.map((cartItem, index) => {
      if (cartItem.id === id) {
        setCartArray([
          ...cartArray.slice(0, index),
          {
            ...cartArray[index],
            bookQuantity:
              cartItem.bookQuantity > 1 ? cartItem.bookQuantity - 1 : 1,
          },
          ...cartArray.slice(index + 1),
        ]);
      }
      return true;
    });
  };

  const cartTotal = cartArray.reduce((accumulator, currentValue) => {
    accumulator += currentValue.bookPrice * currentValue.bookQuantity;
    return accumulator;
  }, 0);

  const cartQuantity = cartArray.reduce((accumulator, currentValue) => {
    accumulator += currentValue.bookQuantity;
    return accumulator;
  }, 0);

  var shippingTotal = 25 + cartQuantity * 25;

  useEffect(() => {
    localStorage.setItem("CART_ARRAY", JSON.stringify(cartArray));
    localStorage.setItem("WISHLIST_ARRAY", JSON.stringify(wishlistArray));
  }, [cartArray, wishlistArray]);

  return (
    <div className="Cart">
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
      {cartArray.length > 0 && <h1 className="cart-title">MY CART</h1>}
      {cartArray.length > 0 && (
        <div className="landing-page-container cart">
          <div className="landing-page-content cart">
            {cartArray.map((product, index) => {
              return (
                <Card
                  key={index}
                  bookCover={product.bookCover}
                  bookTitle={product.bookTitle}
                  bookAuthor={product.bookAuthor}
                  bookPrice={product.bookPrice}
                  bookQuantity={product.bookQuantity}
                  actionOne="Move To Wishlist"
                  actionTwo="Remove From Cart"
                  actionOneFunction={() => moveToWishlist(product)}
                  actionTwoFunction={() => removeFromCart(product.id)}
                  incrementCartItemQuantity={() =>
                    incrementCartItemQuantity(product.id)
                  }
                  decrementCartItemQuantity={() =>
                    decrementCartItemQuantity(product.id)
                  }
                  cartPage={true}
                />
              );
            })}
          </div>
          <div className="order-details">
            <h3>Order Details</h3>
            <div className="pricing-details">
              <div className="price-display">
                <p className="price-title">Cart Total</p>
                <p className="price-value-string">
                  <span className="price-value">₹</span>
                  {cartTotal}
                </p>
              </div>
              <div className="shipping-cost-display">
                <p className="shipping-cost-title">Shipping Cost</p>
                <p className="shipping-cost-value-string">
                  ₹<span className="shipping-cost-value">{shippingTotal}</span>
                </p>
              </div>
            </div>
            <div className="total-price">
              <p className="total-price-display">Grand Total</p>
              <p className="total-price-value-string">
                ₹
                <span className="total-price-value">
                  {cartTotal + shippingTotal}
                </span>
              </p>
            </div>
            <Link to="/checkout">
              <button className="btn-checkout">Place Order</button>
            </Link>
          </div>
        </div>
      )}
      {cartArray.length === 0 && (
        <Empty emptyImage={emptyImage} emptyTitle="cart" />
      )}
    </div>
  );
}

export default Cart;
