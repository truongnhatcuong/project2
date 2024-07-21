import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

const Search: React.FC<{
  onSearch: (
    keyword: string,
    sortOrder: string,
    limit: number,
    pageCurrent: number
  ) => void;
  keyword: string;
}> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  const searchHandler = () => {
    if (keyword.trim() == "") {
      onSearch("", "asc", 5, 1);
    } else {
      onSearch(keyword, sortOrder, limit, pageCurrent);
    }
  };

  const enterHanler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchHandler();
    }
  };

  return (
    <div className="relative w-[69%]">
      <input
        type="text"
        className="p-3 pr-16 rounded-lg border-solid border-2 border-black w-[78%]"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={enterHanler}
      />
      <button
        className=" absolute right-44 top-1/2 transform -translate-y-1/2 bg-white rounded-lg  border-black border-solid border-2 hover:bg-blue-500 p-4 active:bg-blue-400"
        onClick={searchHandler}
      >
        <BsSearch />
      </button>
    </div>
  );
};

export default Search;
