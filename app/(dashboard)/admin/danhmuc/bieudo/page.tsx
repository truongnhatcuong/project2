"use client";
import ChartComponent from "@/app/compoments/ChucNang/bieudoExcel";
import Pagination from "@/app/compoments/ChucNang/Pagination";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface Category {
  id: number;
  name: string;
  description: string;
  createAt: string; // Thêm trường createAt để chuyển đổi dữ liệu
}

interface CategoryTableProps {
  categories: Category[];
  pagination: {
    totalPages: number;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Bieudo = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [isChartVisible, setIsChartVisible] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const { data, error } = useSWR<CategoryTableProps>(
    `http://localhost:3000/api/categories?keyword=${keyword}&limit=${limit}&page=${currentPage}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      setTotalPages(data.pagination.totalPages);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <ChartComponent data={categories} visible={isChartVisible} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Bieudo;
