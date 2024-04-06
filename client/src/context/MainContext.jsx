import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Context = createContext();

const MainContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
  }, []);

  const addToCartHandler = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Product Addded to Your cart");
    setTimeout(() => {
      navigate("/cart");
    }, 750);
  };

  return (
    <Context.Provider
      value={{ products, setProducts, cart, setCart, addToCartHandler }}
    >
      {children}
    </Context.Provider>
  );
};

export default MainContext;
