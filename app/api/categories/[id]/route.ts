import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const categoryId = Number(params.id);
  // Bắt Đầu Láy Dữ Liệu Từ Server
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  // Trả về Nếu Không có dữ liệu thì :
  if (category == null) {
    return NextResponse.json(
      { error: `không tim thấy dữ liệu của id: ${params.id}` },
      { status: 200 }
    );
  } else {
    // ngược lại nếu lấy dữ liệu thành công thì :
    return NextResponse.json({ category }, { status: 200 });
  }
}
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const categoryId = Number(params.id);
    // Bắt Đầu Xóa
    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    //trả về xóa thành công
    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    // Bắt lỗi Nếu Sản phẩm không tồn tại
    console.log("lỗi", error);
    return NextResponse.json(
      { errorcode: error, error: error.message },
      { status: 200 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //gửi yêu cầu lên server
    const data = await request.json();
    const categoryId = Number(params.id);
    //bắt đầu update
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    //trả về update thành công
    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    //bắt lỗi nếu update bị lỗi
    console.log("lỗi", error);

    return NextResponse.json(
      { errorcode: error, errorMessage: error.massage },
      { status: 200 }
    );
  }
}
