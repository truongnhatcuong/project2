"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const users = [
    {
      email: "tncuong2222004@gmail.com",
      password: "123321",
    },
    {
      email: "tncuong22220@gmail.com",
      password: "123321",
    },
    {
      email: "tncuong22224@gmail.com",
      password: "123321",
    },
  ];

  const submitHanler = (e: any) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setErrorMessage("");
      alert("đăng nhập thành công");
      router.push("/");
    } else {
      setErrorMessage("Email hoặc mật khẩu không đúng.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-black">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-8">Đăng Nhập</h2>
        <form onSubmit={submitHanler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            ></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fas fa-user text-gray-400"></i>
              </span>
              <input
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            ></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fas fa-lock text-gray-400"></i>
              </span>
              <input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-indigo-500"
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-green-600 w-full"
            >
              Login
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Do not have an account?
            </a>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
