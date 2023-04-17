import { useCart } from "../contexts/CartProvider";
import { useData } from "../contexts/DataProvider";
import { useState } from "react";

export function Cart() {
  const { menuToBeDisplayed } = useData();

  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const addCouponHandler = () => setAppliedCoupon(!appliedCoupon);

  const discountedPrice = (
    menuToBeDisplayed.reduce(
      (acc, curr) => (curr.addToCart ? acc + curr.price : acc),
      0
    ) * 0.9
  ).toFixed(2);

  const totalPrice = menuToBeDisplayed
    .reduce((acc, curr) => (curr.addToCart ? acc + curr.price : acc), 0)
    .toFixed(2);
  const totalDeliveryTime = menuToBeDisplayed.reduce(
    (acc, curr) => (curr.addToCart ? acc + curr.delivery_time : acc),
    0
  );

  return (
    <>
      <h1>Cart</h1>
      <div>
        <button onClick={addCouponHandler}>
          {!appliedCoupon ? "Apply Coupon" : "Remove Coupon"}
        </button>
      </div>
      <p>
        <strong>Total Delivery Time: {totalDeliveryTime} mins</strong>
      </p>
      <p>
        <strong>
          Total Price: ${!appliedCoupon ? totalPrice : discountedPrice}{" "}
        </strong>
      </p>

      {menuToBeDisplayed.map(
        ({ id, name, description, price, image, delivery_time, addToCart }) =>
          addToCart && (
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
              </p>
            </div>
          )
      )}
    </>
  );
}
