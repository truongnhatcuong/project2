import Link from "next/link";
import React from "react";

interface IProduct {
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
interface IProductInfo {
  card: IProduct;
}

export default function Card({ card }: IProductInfo) {
  return (
    <div className="card bg-white dark:bg-gray-800 w-90 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link key={card.id} href={`/product/${card.id}`}>
        <div className="relative h-80">
          <img
            src={card.image}
            alt={card.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="card-body p-4 text-gray-800 dark:text-gray-200">
          <h2 className="card-title text-lg font-semibold">{card.name}</h2>
          <p className="text-sm">{card.info}</p>
          <p className="text-sm">Số lượng: {card.quantity}</p>
          <p className="text-sm">Giá: {card.price.toLocaleString()} VNĐ</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900">
              Mua Ngay
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
