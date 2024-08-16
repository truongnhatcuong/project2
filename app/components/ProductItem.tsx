import React from "react";
import Card from "./Card";

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
  result: IProduct[];
}

export default function ProductItem({ result }: IProductInfo) {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   mx-auto py-3 gap-3 ">
      {result.map((item) => (
        <Card card={item} key={item.id} />
      ))}
    </div>
  );
}
