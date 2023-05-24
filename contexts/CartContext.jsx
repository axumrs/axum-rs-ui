import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ value, children }) {
  const [items, setItems] = useState(value || []);

  const addItem = (item) => {
    // 查找重复
    const existsItem = items.find((i) => i.id === item.id);
    // 去除重复
    const filtedItems = items.filter((i) => i.id !== item.id);
    if (existsItem) {
      const tmpItem = {
        ...existsItem,
        number: item.number + existsItem.number,
      };
      setItems([...filtedItems, tmpItem]);
    } else {
      setItems([...filtedItems, item]);
    }
  };

  const removeItem = (item) => {
    const others = items.filter((i) => i.id !== item.id);
    setItems([...others]);
  };

  const newItem = (type, service, serviceID, price, number) => {
    const idx = items.length + 1;
    const id = `${type}${service}${serviceID}`;
    return { type, service, serviceID, price, number, idx, id };
  };

  const updateItem = (item) => {
    const filtedItems = items.filter((i) => i.id !== item.id);
    setItems([...filtedItems, { ...item }]);
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        addItem,
        removeItem,
        newItem,
        updateItem,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContent = () => useContext(CartContext);
