import TopBar from "@/app/compoments/dashboard/TopBar";
import LeftMenu from "@/app/compoments/LeftMenu/LeftMenu";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Hệ thống bán hàng",
  description: "Trang quản trị hệ thống bán hàng",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <div className="flex w-full">
        {/* Left menu with 3D effect */}
        <div className="bg-gray-800 w-[22%] max-w-[22%] h-full transform rotate-y-6 shadow-black text-white">
          <LeftMenu />
        </div>
        {/* TopBar and Content */}
        <div className="flex flex-col w-[78%]">
          <TopBar />
          <main className="flex-grow bg-white">{children}</main>
        </div>
      </div>
    </div>
  );
}
