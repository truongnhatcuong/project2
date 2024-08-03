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

const ProductPay: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const size = searchParams.get("size");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const address = searchParams.get("address");
  const image = searchParams.get("image");

  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async () => {
    console.log("Thanh toán đã được thực hiện cho:", name, size, address);
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
    if (!id || !size || !name || !price || !address) {
      router.push("/");
    }
  }, [id, size, name, price, address, router]);

  useEffect(() => {
    if (isPaid) {
      const timer = setTimeout(() => {
        router.push("/product");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isPaid, router]);

  const formattedPrice = price
    ? new Intl.NumberFormat("vi-VN").format(Number(price))
    : "0";

  return (
    <Row
      justify="center"
      align="middle"
      className="min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <Col span={24} className="max-w-2xl">
        <Title
          level={1}
          className="text-3xl text-center text-gray-900 dark:text-gray-100"
        >
          Thanh toán
        </Title>
        {image && (
          <Card
            cover={
              <div className="flex justify-center items-center h-80 bg-gray-200 dark:bg-gray-800">
                <img
                  alt={name || "Sản phẩm"}
                  src={image}
                  className="w-full h-auto object-contain max-h-80"
                />
              </div>
            }
            className="bg-white dark:bg-gray-800"
          >
            <Card.Meta
              title={
                <Paragraph className="text-lg text-gray-900 dark:text-gray-100">
                  Sản phẩm: {name}
                </Paragraph>
              }
              description={
                <>
                  <Paragraph className="text-lg text-gray-900 dark:text-gray-100">
                    Kích thước: {size}
                  </Paragraph>
                  <Paragraph className="text-lg text-gray-900 dark:text-gray-100">
                    Tổng tiền: {formattedPrice} VNĐ
                  </Paragraph>
                  <Paragraph className="text-lg text-gray-900 dark:text-gray-100">
                    Địa chỉ giao hàng: {address}
                  </Paragraph>
                  {!isPaid ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={handlePayment}
                      className="mt-4 bg-blue-500 border-blue-500 text-white dark:bg-blue-600 dark:border-blue-600"
                    >
                      Thanh toán
                    </Button>
                  ) : (
                    <Paragraph className="text-lg text-gray-900 dark:text-gray-100">
                      Vui lòng chờ...
                    </Paragraph>
                  )}
                </>
              }
            />
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default ProductPay;
