"use client";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  // Giả sử bạn có một cách nào đó để kiểm tra trạng thái đăng nhập
  // Ví dụ: sử dụng useState để quản lý trạng thái đăng nhập
  const [IsClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <div>
        {IsClient ? (
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 text-white">
              <FaUser /> <span>Profile</span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={`block px-4 py-2 ${active ? "bg-gray-200" : ""}`}
                  >
                    My Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/settings"
                    className={`block px-4 py-2 ${active ? "bg-gray-200" : ""}`}
                  >
                    Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/logout"
                    className={`block px-4 py-2 ${active ? "bg-gray-200" : ""}`}
                  >
                    Logout
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link href="/login" className="text-white hover:text-gray-300">
            Đăng Nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
