"use client";

import Link from "next/link";
import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

import CartPopover from "./CartPopover";
import { useCart } from "./CartContext";

const Header = () => {
  const { getTotalQuantity } = useCart();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  let timer: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setIsPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setIsPopoverVisible(false);
    }, 300); // Thời gian chờ trước khi ẩn popover
  };

  return (
    <div className="container mx-auto flex justify-between items-center bg-black text-white p-4">
      <Link href="/" className="text-2xl font-bold flex items-center">
        <FaHome className="mr-2" /> Trang Chủ
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/about" className="hover:text-gray-300">
              Giới Thiệu
            </Link>
          </li>
          <li>
            <Link href="/product" className="hover:text-gray-300">
              Sản Phẩm
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">
              Chính Sách Ưu Đãi
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="/cart" className="flex items-center space-x-2 text-white">
            <FaShoppingCart />
            <span className="ml-1">{getTotalQuantity()}</span>
          </Link>
          {isPopoverVisible && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CartPopover />
            </div>
          )}
        </div>
        <div>
          <Link href="/login" className="text-white hover:text-gray-300">
            Đăng Nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
