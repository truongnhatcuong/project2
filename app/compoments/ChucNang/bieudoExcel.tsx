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
import { text } from "stream/consumers";

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
        backgroundColor: "#4F81BC",
        borderColor: "#4F81BC",
        borderWidth: 3,
        barThickness: 60,
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
        font: {
          size: 20,
        },
        color: "red",
      },
    },
  };

  return (
    <div className="w-[92%] h-[65%] ml-10">
      <Bar data={chartData} options={options} />;
    </div>
  );
};

export default ChartComponent;
