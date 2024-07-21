import React from "react";
import Link from "next/link";
import SubMenuItem from "./SubMenuItem";

interface Props {
  menuItem: IMenu;
}

interface IMenu {
  id: number;
  icon: React.ReactElement;
  title: string;
  link: string;
  submenu?: IMenu[];
}

function MenuItem(props: Props) {
  return (
    <div>
      <ul className="flex flex-col cursor-pointer p-2 rounded mb-1  ">
        <Link
          href={props.menuItem.link}
          className="flex items-center p-1 text-3xl  font-extrabold "
        >
          {props.menuItem.icon}
          <span className="pl-3 ">{props.menuItem.title}</span>
        </Link>
        {props.menuItem.submenu
          ? props.menuItem.submenu.map((item) => (
              <li
                key={item.id}
                className="hover:text-2xl hover:text-blue-700 hover:bg-blue-200 rounded-md"
              >
                <SubMenuItem menuItem={item} />
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

export default MenuItem;
