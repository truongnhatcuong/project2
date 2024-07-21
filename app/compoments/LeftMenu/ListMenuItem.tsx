"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { RiHome4Line } from "react-icons/ri";

const menuItem = [
  {
    id: 1,
    icon: <RiHome4Line />,
    title: "DashBoard",
    link: "/admin",
  },
  {
    id: 2,
    icon: <MdOutlineShoppingBag />,

    title: "Danh Mục ",
    link: "/admin",
    submenu: [
      {
        id: 1,
        icon: <AiOutlineProduct />,
        title: "loại sản phẩm",
        link: "/admin/danhmuc/adsanpham",
      },
      {
        id: 2,
        icon: <AiOutlineProduct />,
        title: "Sản phẩm",
        link: "/admin/danhmuc/categories",
      },
      {
        id: 3,
        icon: <AiOutlineProduct />,
        title: "cửa hàng",
        link: "/admin/danhmuc/adcuahang",
      },
    ],
  },
];
const ListMenuItem = () => {
  return (
    <div className="w-full h-screen  ">
      <ul className="flex flex-col  ">
        {menuItem.map((menuItem) => (
          <li key={menuItem.id} className="   ">
            <MenuItem menuItem={menuItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListMenuItem;
