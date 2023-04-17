import { useCart } from "../contexts/CartProvider";
import { useData } from "../contexts/DataProvider";
import { NavLink } from "react-router-dom";

export function Menu() {
  const {
    menuToBeDisplayed,
    priceFilterHandler,
    changeHandler,
    checkboxHandler,
  } = useData();

  const { addToCartHandler } = useCart();

  return (
    <>
      <h1>Menu</h1>
      <div>
        <input placeholder="Search food here" onChange={changeHandler} />
        <label>
          <input
            onChange={checkboxHandler}
            type="checkbox"
            value="is_vegetarian"
          />
          veg
        </label>
        <label>
          <input onChange={checkboxHandler} type="checkbox" value="is_spicy" />
          spicy
        </label>
        <label>
          <input
            onChange={priceFilterHandler}
            name="priceSorting"
            type="radio"
            value="lowToHigh"
          />
          sort price low to high
        </label>
        <label>
          <input
            onChange={priceFilterHandler}
            name="priceSorting"
            type="radio"
            value="highToLow"
          />
          sort price high to low
        </label>
      </div>
      {menuToBeDisplayed.map((product) => {
        const {
          id,
          name,
          description,
          price,
          image,
          addToCart,
          delivery_time,
        } = product;
        return (
          <div className="product-card" key={id}>
            <img src={image} />
            <p>
              <h3>{name}</h3>
            </p>
            <small>{description}</small>
            <p>
              <small>
                <b>Price: ${price}</b>
              </small>
            </p>
            <p>
              <small>{delivery_time} min</small>
              <div>
                {!addToCart ? (
                  <button onClick={() => addToCartHandler(product)}>
                    Add to Cart
                  </button>
                ) : (
                  <button>
                    <NavLink to="/cart">Go to Cart</NavLink>
                  </button>
                )}
              </div>
            </p>
          </div>
        );
      })}
    </>
  );
}
