import { createContext, useContext, useEffect } from "react";
import { fakeFetch } from "../data/fakeFetch";
import { useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [menu, setMenu] = useState([]);
  const [menuToBeDisplayed, setMenuToBeDisplayed] = useState([]);

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
    <DataContext.Provider value={{ menu, menuToBeDisplayed }}>
      {children}
    </DataContext.Provider>
  );
}
export const useData = () => useContext(DataContext);
