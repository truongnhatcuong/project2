"use client";

import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    toggleSelectItem,
    toggleSelectAllItems,
  } = useCart();
  const router = useRouter();
  const [selectAll, setSelectAll] = useState(false);
  const getSelectedTotalPrice = () => {
    return cart
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBuyNow = () => {
    const selectedItems = cart.filter((item) => item.selected);

    if (selectedItems.length > 0) {
      const productsParam = encodeURIComponent(JSON.stringify(selectedItems));
      router.push(`/productpay?products=${productsParam}`);
    } else {
      MySwal.fire({
        text: "Vui lòng chọn ít nhất 1 sản phẩm để thanh toán",
        icon: "error",
        customClass: {
          popup: "transparent-bg",
        },
      });
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    toggleSelectAllItems(newSelectAll);
  };

  return (
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Giỏ hàng của bạn
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Giỏ hàng của bạn đang trống.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">
                  <input type="checkbox" onChange={handleSelectAll} />
                </th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">
                  Sản Phẩm
                </th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">
                  Đơn Giá
                </th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">
                  Số Lượng
                </th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">
                  Số Tiền
                </th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="mr-2"
                    />
                  </td>
                  <td className="py-2 px-4 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    {item.name}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {item.price.toLocaleString()} VNĐ
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-300 text-gray-800 py-1 px-2 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="mx-2 text-gray-800 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-gray-300 text-gray-800 py-1 px-2 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {(item.price * item.quantity).toLocaleString()} VNĐ
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Tổng cộng: {getSelectedTotalPrice().toLocaleString()} VNĐ
            </p>
            <button
              onClick={handleBuyNow}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Mua Ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
