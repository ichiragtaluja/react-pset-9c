import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Cart } from "./pages/Cart";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink> || 
        <NavLink to="/menu">Menu</NavLink> ||
        <NavLink to="/cart">Cart</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
