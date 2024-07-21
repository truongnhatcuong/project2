import React from "react";
import Brand from "./Brand";
import ListMenuItem from "./ListMenuItem";
import { RiAdminLine } from "react-icons/ri";

const LeftMenu = () => {
  return (
    <div className="flex flex-col items-center w-[100%]  h-[100%] max-w-xs max-h-screen">
      <div className="flex items-center justify-center text-4xl bg-slate-900 w-full py-3 font-extrabold  ">
        <RiAdminLine className=" mr-2" />
        <Brand />
      </div>
      <div>
        <ListMenuItem />
      </div>
    </div>
  );
};

export default LeftMenu;
