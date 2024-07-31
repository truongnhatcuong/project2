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
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={24} style={{ maxWidth: 800 }}>
        <Title level={1} style={{ fontSize: "3rem", textAlign: "center" }}>
          Thanh toán
        </Title>
        {image && (
          <Card
            cover={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 300,
                }}
              >
                <img
                  alt={name || "Sản phẩm"}
                  src={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            }
          >
            <Card.Meta
              title={
                <Paragraph style={{ fontSize: "1.5rem" }}>
                  Sản phẩm: {name}
                </Paragraph>
              }
              description={
                <>
                  <Paragraph style={{ fontSize: "1.25rem" }}>
                    Kích thước: {size}
                  </Paragraph>
                  <Paragraph style={{ fontSize: "1.25rem" }}>
                    Tổng tiền: {formattedPrice} VNĐ
                  </Paragraph>
                  <Paragraph style={{ fontSize: "1.25rem" }}>
                    Địa chỉ giao hàng: {address}
                  </Paragraph>
                  {!isPaid ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={handlePayment}
                      style={{ marginTop: 16, fontSize: "1.25rem" }}
                    >
                      Thanh toán
                    </Button>
                  ) : (
                    <Paragraph style={{ fontSize: "1.25rem" }}>
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
