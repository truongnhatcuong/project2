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
    <div className="flex flex-col md:flex-row bg-base-100 shadow-xl rounded-lg overflow-hidden">
      <div className="w-full md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-64 md:h-auto"
        />
        {product.suggestedImages && (
          <div className="flex flex-wrap mt-4">
            {product.suggestedImages.map((suggestedImage, index) => (
              <img
                key={index}
                src={suggestedImage}
                alt={`Gợi ý ${index + 1}`}
                className="w-20 h-20 object-cover mr-2 mb-2"
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-lg mb-4">{product.info}</p>
        <p className="text-lg mb-4">Số lượng: {product.quantity}</p>
        <p className="text-lg mb-4">
          Giá: {product.price.toLocaleString()} VNĐ
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Chọn kích thước</h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`py-2 px-4 border rounded-lg ${
                  selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Nhập địa chỉ giao hàng</h3>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Nhập địa chỉ giao hàng"
            className="w-full border rounded-lg px-3 py-2"
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
            className="btn btn-primary w-full py-2 mt-4 text-lg"
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
