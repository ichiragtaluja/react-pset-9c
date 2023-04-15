import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h2>Welcome to</h2>
      <h1>NeoG Food Ordering App</h1>
      <button>
        <Link to="/menu">Go to Menu</Link>
      </button>
    </>
  );
}
