import TopBar from "@/app/compoments/dashboard/TopBar";
import LeftMenu from "@/app/compoments/LeftMenu/LeftMenu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Hệ thống bán hàng",
  description: "Trang quản trị hệ thống bán hàng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {/* Left menu with 3D effect */}
      <div className="bg-gray-800 w-[22%] max-w-[22%] h-w[125120px] transform rotate-y-6 shadow-black text-white">
        <LeftMenu />
      </div>
      {/* TopBar - content with 3D effect */}
      <div className="flex flex-col w-[100%]">
        {/* TopBar with 3D effect */}
        <div className=" transform rotate-x-3 shadow-md">
          <TopBar />
        </div>
        {/* Content */}
        <div className="bg-white  w-[100%] h-[100%]  ">{children}</div>
      </div>
    </div>
  );
}
