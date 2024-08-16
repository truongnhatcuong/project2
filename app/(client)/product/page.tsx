"use client";
import ProductItem from "@/app/components/ProductItem";
import SearchProduct from "@/app/components/searchProduct";
import React, { useEffect, useState } from "react";

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
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState<number>(10);
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product?keyword=${
            keyword || ""
          }&limit=${limit}&pageCurrent=${pageCurrent}`
        );
        if (!response.ok) throw new Error("Lỗi mạng");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, limit, pageCurrent]);

  const handleSearch = (
    keyword: string,
    limit: number,
    pageCurrent: number
  ) => {
    setKeyword(keyword);
    setLimit(limit);
    setPageCurrent(pageCurrent);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <SearchProduct onSearch={handleSearch} />
      {products && products.length === 0 && (
        <h1 className="mt-6 text-2xl  ">không có dữ liệu...................</h1>
      )}
      <div>
        <ProductItem result={products} />
      </div>
    </div>
  );
};

export default ProductList;
