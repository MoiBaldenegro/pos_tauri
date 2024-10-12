import axios from "../configs/axios";
import { useState } from "react";
import { Product } from "../types/products";
import { PRODUCTS_PATH } from "../lib/routes.paths.lib";

export default function useProducts() {
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getProducts() {
    setIsLoading(true);
    try {
      const res = await axios(PRODUCTS_PATH);
      if (!res) {
        setIsLoading(false);
        throw new Error("No se encontro ningun producto");
      }
      setProductsArray(res.data);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }
  return { productsArray, getProducts, isLoading };
}
