"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import AddCategory from "@/app/compoments/ChucNang/Addcategories";
import UpdateCategories from "@/app/compoments/ChucNang/UpdateCategories";
import Search from "@/app/compoments/ChucNang/Search";
import Order from "@/app/compoments/ChucNang/order";
import Pagination from "@/app/compoments/ChucNang/Pagination";
import { sort } from "fast-sort";
import ExportExcel from "@/app/compoments/ChucNang/exportExcel";
import CategoryTable from "@/app/compoments/ChucNang/categories.Table";
import ExportCSV from "@/app/compoments/ChucNang/xuatCsv";
import ChartComponent from "@/app/compoments/ChucNang/bieudoExcel";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface ApiResponse {
  categories: Category[];
  pagination: Pagination;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortByNameOrder, setSortByNameOrder] = useState<"asc" | "desc">("asc");
  const { data, error, isValidating } = useSWR(
    `http://localhost:3000/api/categories?keyword=${keyword}&limit=${limit}&page=${currentPage}&sortOrder=${sortOrder}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data && !isValidating) {
      const initialCategories = data.categories;
      setCategories(initialCategories || []);
      setTotalPages(data.pagination.totalPages || 1);
      setCurrentPage(data.pagination.currentPage || 1);
      setLoading(false);
    } else {
      setCategories([]);
    }
  }, [data, isValidating]);

  useEffect(() => {
    handleSearch(keyword, sortOrder, limit, currentPage);
  }, [keyword, sortOrder, limit, currentPage]);

  const closeAddModal = () => {
    setShowDemo(false);
  };

  const openEditModal = (category: Category) => {
    setCategory(category);
    setshowEdit(true);
  };

  const closeEditModal = () => {
    setshowEdit(false);
    setCategory(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch(keyword, sortOrder, limit, page);
  };

  const handleSortByName = () => {
    const sortedCategories = sort(categories)[sortByNameOrder](
      (category) => category.name
    );
    setCategories(sortedCategories);
    setSortByNameOrder(sortByNameOrder === "asc" ? "desc" : "asc");
  };

  const deleteHandle = (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      fetch(`http://localhost:3000/api/categories/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          console.log("Xóa dữ liệu thành công", data);
          setCategories(categories.filter((item) => item.id !== id));
          toast.success("Đã xóa thành công danh mục sản phẩm", {
            position: "top-right",
            autoClose: 5000,
          });
        })
        .catch((err) => {
          console.error("Lỗi hệ thống khi xóa:", err);
          toast.error("Lỗi hệ thống khi xóa danh mục sản phẩm");
        });
    } catch (error) {
      console.error("Lỗi hệ thống khi xóa:", error);
      toast.error("Lỗi hệ thống khi xóa danh mục sản phẩm");
    }
  };

  const handleSearch = async (
    keyword: string,
    sortOrder: string,
    limit: number,
    pageCurrent: number
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/categories?keyword=${keyword}&limit=${limit}&page=${pageCurrent}&sortOrder=${sortOrder}`
      );
      if (response.ok) {
        const data: ApiResponse = await response.json();
        setCategories(data.categories);
        setTotalPages(data.pagination.totalPages || 1);
        setCurrentPage(pageCurrent);
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi hệ thống khi tìm kiếm:", error);
      toast.error("Lỗi hệ thống khi tìm kiếm danh mục sản phẩm");
      setLoading(false);
    }
  };

  const handleSortChange = (order: string) => {
    let sortOrderCategories = [...categories];
    if (order === "asc") {
      sortOrderCategories.sort((a: Category, b: Category) => a.id - b.id);
    } else if (order === "desc") {
      sortOrderCategories.sort((a: Category, b: Category) => b.id - a.id);
    }
    setCategories(sortOrderCategories);
  };

  if (isLoading)
    return (
      <p className="flex justify-center">
        <span className="loading loading-dots loading-lg "></span>
      </p>
    );

  return (
    <div className="ml-6">
      <ToastContainer />

      <div className="ml-9 mt-2">
        <div className="flex justify-around mt-5">
          <Search
            onSearch={(keyword, sortOrder, limit, pageCurrent) => {
              setKeyword(keyword);
              setSortOrder(sortOrder);
              setLimit(limit);
              setCurrentPage(pageCurrent);
            }}
            keyword={keyword}
          />
          <button
            className="bg-green-500 btn btn-outline hover:bg-green-700 mr-6 w-[130px] hover:text-white border-2 border-solid border-blue-200"
            onClick={() => setShowDemo(true)}
          >
            Thêm Mới
          </button>
        </div>

        {showDemo && <AddCategory closeHandle={closeAddModal} />}
        <div className="my-4"> </div>

        <div className="flex justify-between items-center mr-3">
          <Order onSortChange={handleSortChange} />
        </div>

        <div className="flex justify-end mr-7 mt-7">
          <ExportExcel data={categories} fileName={"categories.xlsx"} />
          <ExportCSV data={categories} fileName={"categories.csv"} />
        </div>

        <CategoryTable
          categories={categories}
          sortByNameOrder={sortByNameOrder}
          handleSortByName={handleSortByName}
          openEditModal={openEditModal}
          deleteHandle={deleteHandle}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      {showEdit && category && (
        <UpdateCategories closeHandle={closeEditModal} category={category} />
      )}
    </div>
  );
};

export default Page;
