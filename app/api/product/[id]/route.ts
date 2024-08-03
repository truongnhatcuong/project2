import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { types } from "util";
import { object } from "zod";

// Hàm GET để lấy thông tin sản phẩm theo ID từ request
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);

  if (isNaN(productId)) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (product === null) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    } else {
      // Chuyển đổi dữ liệu để loại bỏ BigInt
      const serializedProduct = {
        ...product,
        id: Number(product.id), // Chuyển đổi BigInt thành String
        quantity: Number(product.quantity), // Chuyển đổi quantity về số
        price: Number(product.price), // Chuyển đổi price về số
        categoryId: Number(product.categoryId),
      };

      return NextResponse.json({ product: serializedProduct }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  if (!productId || isNaN(productId)) {
    return NextResponse.json({ message: "not found id" }, { status: 200 });
  }
  try {
    const data = await request.json();
    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: data.name,
        info: data.info,
        image: data.image,
        quantity: data.quatity,
        price: data.price,
        categoryId: data.categoryId,
      },
    });
    const serializedProduct = {
      ...updateProduct,
      id: Number(updateProduct.id), // Chuyển đổi BigInt thành String
      quantity: Number(updateProduct.quantity), // Chuyển đổi quantity về số
      price: Number(updateProduct.price), // Chuyển đổi price về số
      categoryId: Number(updateProduct.categoryId),
    };

    return NextResponse.json(
      { message: "update success", serializedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function DELETE({ params }: { params: { id: string } }) {
  const productId = await Number(params.id);
  try {
    const deleteproduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return NextResponse.json({ message: "deleted success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
