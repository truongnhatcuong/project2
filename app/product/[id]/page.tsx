// `app/product/[id]/page.tsx`

import { FC } from "react";
import ProductDetail from "./ProductDetail";

// Định nghĩa giao diện cho sản phẩm
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

// Fetch dữ liệu sản phẩm trong Server Component
const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
    next: { revalidate: 60 }, // Tùy chọn revalidation
  });

  if (!res.ok) {
    throw new Error("Lỗi khi lấy dữ liệu");
  }

  const data = await res.json();
  return data.product;
};

// Server Component
const ProductDetailPage: FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div className="container mx-auto p-4">
      {/* Truyền dữ liệu sản phẩm vào Client Component */}
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
