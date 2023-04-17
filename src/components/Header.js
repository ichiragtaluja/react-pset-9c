import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

export function Header() {
  const { totalItemsInCart } = useCart();
  return (
    <nav>
      <NavLink className="navlink" to="/">
        Home
      </NavLink>{" "}
      <NavLink className="navlink" to="/menu">
        Menu
      </NavLink>{" "}
      <NavLink className="navlink" to="/cart">
        Cart ({totalItemsInCart})
      </NavLink>
    </nav>
  );
}
