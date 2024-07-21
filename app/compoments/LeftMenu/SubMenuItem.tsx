import Link from "next/link";
import React from "react";

interface Props {
  menuItem: IMenu;
}

interface IMenu {
  id: number;
  icon: React.ReactNode;
  title: string;
  link: string;
  submenu?: IMenu[];
}

const SubMenuItem = (props: Props) => {
  return (
    <div className="flex cursor-pointer ">
      <Link href={props.menuItem.link} className="flex p-1 mt-2">
        {props.menuItem.icon}{" "}
        <span className="pl-2">{props.menuItem.title}</span>
      </Link>
    </div>
  );
};

export default SubMenuItem;
