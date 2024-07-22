"use client";
import React from "react";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IExportProps {
  data: any[];
  fileName: string;
}

const ExportExcel = ({ data, fileName }: IExportProps) => {
  const exportToExcel = async () => {
    const confirmExport = withReactContent(Swal);
    const result = await confirmExport.fire({
      title: "Bạn có chắc chắn muốn xuất file không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
    });
    if (result.isConfirmed) {
      const workBook = new ExcelJS.Workbook();
      const workSheet = workBook.addWorksheet("Sheet1");

      // thêm Tên Công Ty vào hàng đầu tiên
      workSheet.mergeCells("A1:E1");
      const headerCell = workSheet.getCell("A1");
      headerCell.value = "Shop Bán Hàng Uy Tín - Chất Lượng - Giá rẻ";
      headerCell.font = { bold: true, size: 25, color: { argb: "515993" } };
      headerCell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      headerCell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
      };
      workSheet.getRow(1).height = 60;

      // tiêu đề quản Lý Bán Hàng
      workSheet.mergeCells("A2:E2");
      const titleCell = workSheet.getCell("A2");
      titleCell.value = "Quản Lý Danh Mục Bán Hàng";
      titleCell.font = {
        bold: true,
        size: 17,
        color: { argb: "var(--white)" },
      };
      titleCell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      titleCell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
      };
      workSheet.getRow(2).height = 50;

      // tiêu đề các danh mục
      const headerTitle = [
        "ID",
        "Name",
        "Description",
        "CreateDate",
        "UpdateDate",
      ];
      const headerRow = workSheet.addRow(headerTitle);
      headerRow.font = { bold: true, size: 17, color: { argb: "CEE9EF" } };
      headerRow.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      headerRow.eachCell((item) => {
        item.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "black" },
        };
        item.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
          bottom: { style: "thin" },
        };
      });
      workSheet.getRow(3).height = 40;

      // thêm dữ liệu vào các bảng

      data.forEach((item) => {
        const row = workSheet.addRow([
          item.id,
          item.name,
          item.description,
          item.createAt,
          item.updateAt,
        ]);
        row.eachCell((item) => {
          item.alignment = { vertical: "middle", horizontal: "center" };
          item.font = { size: 15 };
          item.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
            bottom: { style: "thin" },
          };
        });
      });
      workSheet.columns = [
        { width: 10 },
        { width: 30 },
        { width: 70 },
        { width: 40 },
        { width: 40 },
      ];

      // thêm biểu đồ

      const buffer = await workBook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: " application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  return (
    <button
      onClick={exportToExcel}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-5"
    >
      Xuất Excel
    </button>
  );
};

export default ExportExcel;
