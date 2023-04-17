import { createContext, useContext, useEffect } from "react";
import { fakeFetch } from "../data/fakeFetch";
import { useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [menu, setMenu] = useState([]);
  const [menuToBeDisplayed, setMenuToBeDisplayed] = useState([]);

  const [checkBoxData, setCheckBoxData] = useState({
    is_vegetarian: false,
    is_spicy: false,
  });

  const priceFilterHandler = (event) => {
    const userInput = event.target.value;

    if (userInput === "lowToHigh") {
      const sortedMenu = [...menuToBeDisplayed].sort(
        (a, b) => a.price - b.price
      );
      setMenuToBeDisplayed(sortedMenu);
    } else {
      const sortedMenu = [...menuToBeDisplayed].sort(
        (a, b) => b.price - a.price
      );
      setMenuToBeDisplayed(sortedMenu);
    }
  };

  const checkboxHandler = (event) => {
    const checBoxInput = event.target.value;
    const isChecked = event.target.checked;
    let tempArray = [];

    if (checBoxInput === "is_vegetarian") {
      const bool1 = isChecked;
      const bool2 = checkBoxData.is_spicy;
      tempArray = [
        ...menu.filter(
          ({ is_vegetarian: x, is_spicy: y }) => (x && bool1) || (y && bool2)
        ),
      ];
    } else {
      const bool1 = isChecked;
      const bool2 = checkBoxData.is_vegetarian;
      tempArray = [
        ...menu.filter(
          ({ is_vegetarian: x, is_spicy: y }) => (x && bool2) || (y && bool1)
        ),
      ];
    }
    setCheckBoxData({ ...checkBoxData, [checBoxInput]: isChecked });
    if (!tempArray.length) setMenuToBeDisplayed(menu);
    else setMenuToBeDisplayed(tempArray);
  };

  const changeHandler = (event) => {
    const userInput = event.target.value;
    if (userInput) {
      const selectedFood = menu.filter(({ name }) =>
        name.toUpperCase().includes(userInput.toUpperCase())
      );
      setMenuToBeDisplayed(selectedFood);
    } else {
      setMenuToBeDisplayed(menu);
    }
  };

  const getMenu = async () => {
    const response = await fakeFetch("https://example.com/api/menu");
    if (response.status === 200) {
      setMenu(response.data.menu);
      setMenuToBeDisplayed(response.data.menu);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <DataContext.Provider
      value={{
        menu,
        menuToBeDisplayed,
        changeHandler,
        priceFilterHandler,
        checkboxHandler,
        setMenuToBeDisplayed,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
