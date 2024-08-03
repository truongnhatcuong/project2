"use client";
import React, { useState } from "react";
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
  suggestedImages?: string[]; // Thêm thuộc tính mới cho hình ảnh gợi ý
}

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover  h-64 md:h-auto w-full md:w-1/2"
      />

      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {product.name}
        </h2>
        <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
          {product.info}
        </p>
        <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
          Số lượng: {product.quantity}
        </p>
        <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
          Giá: {product.price.toLocaleString()} VNĐ
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Chọn kích thước
          </h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`py-2 px-4 border rounded-lg ${
                  selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Nhập địa chỉ giao hàng
          </h3>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Nhập địa chỉ giao hàng"
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-300"
          />
        </div>

        <Link
          href={{
            pathname: "/productpay",
            query: {
              id: product.id,
              size: selectedSize,
              name: product.name,
              price: product.price,
              address: address,
              image: product.image,
            },
          }}
        >
          <button
            className={`w-full py-2 mt-4 text-lg rounded-lg ${
              selectedSize && address
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedSize || !address}
          >
            {selectedSize ? "Mua Ngay" : "Chọn kích thước"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
