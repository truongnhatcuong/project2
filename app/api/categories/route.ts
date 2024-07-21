//getaAllcategories- lấy tât cả  danh mục API
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { skip } from "node:test";
import { z } from "zod";

// export async function GET(request:NextRequest) {

//     const categories = await prisma.category.findMany();


//     //lấy tất cả dữ liệu của user
//     return NextResponse.json(
//         { categories, message: "Thành Công" }, { status: 200, }
//     );
// }


 export async function GET(request:NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const keyword:string = searchParams?.get('keyword')|| '';
    const limit : number = Number(searchParams?.get('limit')|| 5);
    const page : number = Number(searchParams?.get('page')|| 1);
    let sortOrder : any = searchParams?.get('sortOrder')|| 'asc'
    

    // Ensure sortOrder is either 'asc' or 'desc'
  if (sortOrder !== 'asc' && sortOrder !== 'desc') {
       sortOrder = 'asc'
  }

    // if (keyword) {
        const totalRecords: number = await prisma.category.count({
          where: {
            name: {
              contains: keyword,
            
            },
          },
        });
  
        const totalPages = Math.ceil(totalRecords / limit);
        const totalSkipRecords = (page - 1) * limit;
  
        const categories = await prisma.category.findMany({
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
  
        return NextResponse.json(
          {
            categories,
            pagination: {
              totalRecords,
              totalPages,
              currentPage: page,
              limit,
            },
          },
          { status: 200 }
        );
      // } else {
      //   const categories = await prisma.category.findMany();
      //   return NextResponse.json(
      //     { categories, message: 'Thành Công' },
      //     { status: 200 }
        
      }

export async function POST(request:NextRequest) {
  //get data from request body
  const data = await request.json()
  // add data into db via prisma

  //validating the data using zod
  const categorySchema = z.object({
      name:z.string().min(8,{message:"độ dài tối da là 255"}).max(255,{message:"độ dài tối da là 255"}),
      description:z.string(),
  })

  const isValid = categorySchema.safeParse(data);

  //if the data is invalid --> return error
  if(!isValid.success){
      return NextResponse.json({message:isValid.error.errors},{status:200})
  }else{
      
  }
  // add data into db via prisma -ì the data is valid
  const category = await prisma.category.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  // return the result and new category for client
  return NextResponse.json(
    { category },
    { status: 200, statusText: "Creeted successfly" }
  );
}