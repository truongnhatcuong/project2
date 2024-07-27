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

interface ChartComponentProps {
  data?: Array<{ createAt: string }>;
  visible: boolean;
}

const transformData = (data: Array<{ createAt: string }>) => {
  const dateCounts: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = item.createAt.split("T")[0]; // Lấy phần ngày của createAt
    if (dateCounts[date]) {
      dateCounts[date] += 1;
    } else {
      dateCounts[date] = 1;
    }
  });

  return Object.keys(dateCounts).map((date) => ({
    name: date,
    count: dateCounts[date],
  }));
};

const ChartComponent: React.FC<ChartComponentProps> = ({
  data = [], // Cung cấp giá trị mặc định là mảng trống
  visible,
}) => {
  if (!visible) return null;

  // Kiểm tra xem data có phải là mảng không
  const isArray = Array.isArray(data);
  const transformedData = isArray ? transformData(data) : [];

  const maxCount = Math.max(...transformedData.map((item) => item.count), 0);

  const chartData = {
    labels: transformedData.map((item) => item.name), // Chỉ sử dụng data nếu là mảng
    datasets: [
      {
        label: "Số Lượng Danh Mục",
        data: transformedData.map((item) => item.count), // Chỉ sử dụng data nếu là mảng
        backgroundColor: "#FFCC01",
        borderColor: "#FFCC01",
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
        text: "Số Lượng Danh Mục Theo Ngày",
        font: {
          size: 20,
        },
        color: "red",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ngày",
        },
        // Hiển thị tất cả các ngày trên trục x nếu cần thiết
        ticks: {
          autoSkip: false, // Đảm bảo rằng tất cả các ngày đều được hiển thị
        },
      },
      y: {
        title: {
          display: true,
          text: "Số lượng",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 2, // Đặt khoảng cách giữa các giá trị trên trục y
          max: maxCount + 1, // Đặt giá trị tối đa trên trục y
        },
      },
    },
  };

  return (
    <div className="w-[92%] h-[65%] ml-10">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
