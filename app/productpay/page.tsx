"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Card, Col, Row, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title, Paragraph } = Typography;
const MySwal = withReactContent(Swal);

interface IProduct {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const ProductPay: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy tham số từ URL
  const productsParam = searchParams.get("products");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products: IProduct[] = productsParam
    ? JSON.parse(decodeURIComponent(productsParam))
    : [];

  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async () => {
    console.log("Thanh toán đã được thực hiện cho:", products);
    setIsPaid(true);

    // Hiển thị thông báo thanh toán thành công
    await MySwal.fire({
      title: "Thông báo!",
      text: "Thanh toán thành công!",
      icon: "success",
      confirmButtonText: "OK",
    });

    toast.success("Thanh toán thành công!");
  };

  useEffect(() => {
    if (products.length === 0) {
      router.push("/");
    }
  }, [products, router]);

  useEffect(() => {
    if (isPaid) {
      const timer = setTimeout(() => {
        router.push("/product");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isPaid, router]);

  const getTotalPrice = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(getTotalPrice());

  return (
    <Row
      justify="center"
      align="middle"
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4"
    >
      <Col span={24} className="max-w-3xl mx-auto">
        <Title
          level={1}
          className="text-3xl text-center text-gray-900 dark:text-gray-100 mb-6"
        >
          Thanh toán
        </Title>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <Paragraph className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Địa Chỉ Nhận Hàng
          </Paragraph>
          <Paragraph className="text-md text-gray-700 dark:text-gray-300">
            Trương Nhật Cường (+84) 372204152
          </Paragraph>
          <Paragraph className="text-md text-gray-700 dark:text-gray-300">
            8 Hà Văn Tính, Khu Kí Túc Xá, Phường Hòa Khánh Nam, Quận Liên Chiểu,
            Đà Nẵng
          </Paragraph>
        </div>

        {products.length > 0 && (
          <>
            {products.map((product) => (
              <Card
                key={product.id}
                cover={
                  <div className="flex justify-center items-center h-60 bg-gray-200 dark:bg-gray-800">
                    <img
                      alt={product.name || "Sản phẩm"}
                      src={product.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                }
                className="bg-white dark:bg-gray-800 mb-4 rounded-lg shadow-md"
              >
                <Card.Meta
                  title={
                    <Paragraph className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Sản phẩm: {product.name}
                    </Paragraph>
                  }
                  description={
                    <>
                      <Paragraph className="text-md text-gray-700 dark:text-gray-300">
                        Kích thước: {product.size}
                      </Paragraph>
                      <Paragraph className="text-md text-gray-700 dark:text-gray-300">
                        Giá: {product.price.toLocaleString()} VNĐ
                      </Paragraph>
                      <Paragraph className="text-md text-gray-700 dark:text-gray-300">
                        Số lượng: {product.quantity}
                      </Paragraph>
                    </>
                  }
                />
              </Card>
            ))}

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
              <Paragraph className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Đơn vị vận chuyển
              </Paragraph>
              <Paragraph className="text-md text-gray-700 dark:text-gray-300">
                Nhanh
              </Paragraph>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <Paragraph className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Tổng cộng: {formattedPrice} VNĐ
              </Paragraph>
              {!isPaid ? (
                <Button
                  type="primary"
                  size="large"
                  onClick={handlePayment}
                  className="mt-4 bg-orange-500 border-orange-500 text-white dark:bg-orange-600 dark:border-orange-600 rounded-lg shadow-md"
                >
                  Thanh toán
                </Button>
              ) : (
                <Paragraph className="text-lg text-gray-900 dark:text-gray-100">
                  Vui lòng chờ...
                </Paragraph>
              )}
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProductPay;
