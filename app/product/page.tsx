"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <div className="card bg-base-100 w-90 shadow-xl cursor-pointer">
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-[70%] object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg">{product.name}</h2>
              <p className="text-sm">{product.info}</p>
              <p className="text-sm">Số lượng: {product.quantity}</p>
              <p className="text-sm">
                Giá: {product.price.toLocaleString()} VNĐ
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Mua Ngay</button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
