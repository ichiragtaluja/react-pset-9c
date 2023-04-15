import { useData } from "../contexts/DataProvider";

export function Menu() {
  const { menuToBeDisplayed } = useData();

  return (
    <>
      <h1>Menu</h1>
      {menuToBeDisplayed.map(
        ({
          id,
          name,
          description,
          price,
          image,
          is_vegetarian,
          is_spicy,
          delivery_time,
        }) => (
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
