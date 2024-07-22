"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({
  data = [], // Cung cấp giá trị mặc định là mảng trống
  visible,
}: {
  data?: any[]; // Đánh dấu là tùy chọn
  visible: boolean;
}) => {
  if (!visible) return null;

  // Kiểm tra xem data có phải là mảng không
  const isArray = Array.isArray(data);

  const chartData = {
    labels: isArray ? data.map((item) => item.name) : [], // Chỉ sử dụng data nếu là mảng
    datasets: [
      {
        label: "Số Lượng Sản Phẩm",
        data: isArray ? data.map((item) => item.id) : [], // Chỉ sử dụng data nếu là mảng
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Số Lượng Sản Phẩm Theo Danh Mục",
      },
    },
  };

  return (
    <div className="w-[95%] h-[70%]">
      <Bar data={chartData} options={options} />;
    </div>
  );
};

export default ChartComponent;
