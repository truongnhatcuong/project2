import React from "react";

const Page = () => {
  return (
    <div>
      <div className="marquee bg-black font-bold text-white py-2">
        <div className="marquee-content text-2xl ">
          <p className="inline-block whitespace-nowrap mx-10">
            Thương Hiệu Local Brand Lớn Nhất Việt Nam
          </p>

          <p className="inline-block whitespace-nowrap mx-10">
            Free shipping for orders from 800,000 VND
          </p>
          <p className="inline-block whitespace-nowrap mx-10 ">
            ping for orders from 800,000 VND
          </p>

          <p className="inline-block whitespace-nowrap mx-10">
            30-Day Warranty on All Products
          </p>
          <p className="inline-block whitespace-nowrap mx-10">
            1-for-1 Exchange Within 7 Days
          </p>
          <p className="inline-block whitespace-nowrap mx-10">
            5% discount for first-time customers
          </p>
          <p className="inline-block whitespace-nowrap mx-10">
            MiKenCo Shop áo quần lớn
          </p>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <img
          src="https://mikenco.vn/wp-content/uploads/2024/05/1836952752705-4414361171162225297-n.jpg"
          alt="Design Inspiration"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Page;
