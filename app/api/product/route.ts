import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Xử lý yêu cầu GET
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword") || "";
    const limit: number = Number(searchParams.get("limit") || "10");
    const page: number = Number(searchParams.get("page") || "1");
    const sortOrder: "asc" | "desc" = (searchParams.get("sortOrder") ||
      "asc") as "asc" | "desc";

    // Tính toán tổng số bản ghi và phân trang
    const totalRecords = await prisma.product.count({
      where: {
        name: {
          contains: keyword,
        },
      },
    });

    const totalPages = Math.ceil(totalRecords / limit);
    const totalSkipRecords = (page - 1) * limit;

    // Lấy danh sách sản phẩm
    const products = await prisma.product.findMany({
      skip: totalSkipRecords,
      take: limit,
      where: {
        name: {
          contains: keyword,
        },
      },
      orderBy: {
        name: sortOrder,
      },
    });

    // Chuyển đổi BigInt thành số
    const productsWithStringIds = products.map((product) => ({
      ...product,
      id: Number(product.id), // Chuyển đổi id về số
      quantity: Number(product.quantity), // Chuyển đổi quantity về số
      price: Number(product.price), // Chuyển đổi price về số
      categoryId: Number(product.categoryId), // Chuyển đổi categoryId về số
    }));

    return NextResponse.json(
      {
        products: productsWithStringIds,
        pagination: {
          totalRecords,
          totalPages,
          currentPage: page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Xử lý yêu cầu POST
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Định nghĩa schema với zod
    const productSchema = z.object({
      name: z
        .string()
        .min(1, { message: "Tên sản phẩm là bắt buộc" })
        .max(255, { message: "Độ dài tối đa là 255 ký tự" }),
      info: z.string().min(1, { message: "Thông tin sản phẩm là bắt buộc" }),
      image: z.string().url({ message: "Đường dẫn hình ảnh không hợp lệ" }),
      quantity: z
        .number({ required_error: "Số lượng là bắt buộc" })
        .int()
        .positive(),
      price: z.number({ required_error: "Giá là bắt buộc" }).positive(),
      categoryId: z
        .number({ required_error: "ID danh mục là bắt buộc" })
        .int()
        .positive(),
    });

    const result = productSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        { message: "Lỗi xác thực", errors: result.error.errors },
        { status: 400 }
      );
    }

    // Tạo sản phẩm mới
    const product = await prisma.product.create({
      data: {
        name: data.name,
        info: data.info,
        image: data.image,
        quantity: data.quantity,
        price: data.price,
        categoryId: data.categoryId,
      },
    });

    // Chuyển đổi BigInt thành số để trả về
    const productWithStringId = {
      ...product,
      id: Number(product.id), // Chuyển đổi id về số
      quantity: Number(product.quantity), // Chuyển đổi quantity về số
      price: Number(product.price), // Chuyển đổi price về số
      categoryId: Number(product.categoryId), // Chuyển đổi categoryId về số
    };

    return NextResponse.json(
      { message: "Thành công", product: productWithStringId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
