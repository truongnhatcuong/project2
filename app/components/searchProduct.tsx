import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchProductProps {
  onSearch: (keyword: string, limit: number, pageCurrent: number) => void;
}

const SearchProduct: React.FC<SearchProductProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword.trim(), limit, pageCurrent);
  };

  return (
    <form className="flex  max-w-6xl mt-5 ml-10" onSubmit={searchHandler}>
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Tìm Kiếm Sản Phẩm..."
          className="w-full rounded-md p-4 pr-12 border-solid border-2 border-gray-400 placeholder-black"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-0.5 top-1/2 transform -translate-y-1/2 text-amber-black border-solid border-2 border-gray-400 p-5"
        >
          <BsSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchProduct;
