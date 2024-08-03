"use client";
import React, { useEffect, useState } from "react";

import ProductItem from "../components/ProductItem";

interface Product {
  id: number;
  name: string;
  info: string;
  image: string;
  quantity: number;
  price: number;
  categoryId: number;
  createAt: string;
  updateAt: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) throw new Error("Lỗi mạng");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <ProductItem result={products} />;
    </div>
  );
};

export default ProductList;
