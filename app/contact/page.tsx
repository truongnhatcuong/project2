"use client";
import React from "react";

const MembershipPolicy = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-6">CHÍNH SÁCH THÀNH VIÊN</h2>

      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md rounded-lg mb-8">
        <thead className="bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 font-semibold">
              Lợi ích
            </th>
            <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 font-semibold">
              Bạc
            </th>
            <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 font-semibold">
              Vàng
            </th>
            <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 font-semibold">
              Kim cương
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <td className="px-6 py-4">Điểm tích lũy</td>
            <td className="px-6 py-4">10.000.000</td>
            <td className="px-6 py-4">20.000.000</td>
            <td className="px-6 py-4">30.000.000</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <td className="px-6 py-4">Phần trăm khuyến mại</td>
            <td className="px-6 py-4">Giảm giá 5% cho một hóa đơn</td>
            <td className="px-6 py-4">Giảm giá 10% cho một hóa đơn</td>
            <td className="px-6 py-4">Giảm giá 15% cho một hóa đơn</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <td className="px-6 py-4">Sinh nhật</td>
            <td className="px-6 py-4">Giảm giá 20 % cho một hóa đơn</td>
            <td className="px-6 py-4">Giảm giá 20 % cho một hóa đơn</td>
            <td className="px-6 py-4">Giảm giá 20 % cho một hóa đơn</td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3 className="text-2xl font-semibold mb-4">1. ĐIỀU KIỆN ÁP DỤNG</h3>
        <ul className="list-disc list-inside pl-5 mb-6 space-y-2">
          <li>Khuyến mãi áp dụng cho sản phẩm giá đầy đủ.</li>
          <li>
            Giảm giá dựa trên hạng thành viên được áp dụng tại cả cửa hàng
            MIKENCO và trực tuyến.
          </li>
          <li>
            Khách hàng vui lòng đọc kỹ số điện thoại đăng ký thành viên trước
            khi mua hàng.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">
          2. QUY ĐỊNH VỀ VIỆC THĂNG CẤP, GIẢM CẤP
        </h3>
        <ul className="list-disc list-inside pl-5 mb-6 space-y-2">
          <li>
            Thành viên sẽ được thăng cấp lên cấp tiếp theo khi tích lũy đủ điều
            kiện ở cấp tiếp theo.
          </li>
          <li>
            Thành viên sẽ bị hạ cấp nếu không có ít nhất 1 giao dịch trong 12
            tháng qua.
          </li>
          <li>
            Điểm tích lũy sẽ được áp dụng trên toàn bộ hệ thống trực tuyến và
            tại các cửa hàng.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">
          3. ƯU ĐÃI ĐẶC BIỆT (DÀNH RIÊNG CHO VIP DIAMOND)
        </h3>
        <ul className="list-disc list-inside pl-5 mb-6 space-y-2">
          <li>
            Mua sản phẩm từ bộ sưu tập mới trước khi chúng được bày bán với giá
            ưu đãi.
          </li>
          <li>Tham gia các sự kiện, hoạt động và tiệc tung của MIKENCO.</li>
          <li>Sản phẩm dành riêng cho khách hàng VIP Diamond.</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">4. QUY TẮC KHÁC</h3>
        <ul className="list-disc list-inside pl-5 mb-6 space-y-2">
          <li>
            Chương trình khách hàng được quản lý theo số điện thoại. Khách hàng
            nhớ đọc đúng số điện thoại để đăng ký mua hàng trực tuyến và tại cửa
            hàng.
          </li>
          <li>
            Mọi phản hồi hoặc khiếu nại vui lòng gửi về email:{" "}
            <a
              href="mailto:Support@mikenco.vn"
              className="text-blue-500 hover:underline"
            >
              Support@mikenco.vn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MembershipPolicy;
