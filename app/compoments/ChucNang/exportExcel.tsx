import React from "react";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Định nghĩa interface cho các props của component
interface IExportProps {
  data: any[]; // Dữ liệu sẽ được xuất ra file Excel
  fileName: string; // Tên file Excel sẽ được tạo
  companyName: string; // Tên công ty sẽ được thêm vào file Excel
}

// Định nghĩa component ExportExcel sử dụng React.FC (Function Component) với các props được xác định bởi IExportProps
const ExportExcel: React.FC<IExportProps> = ({
  data,
  fileName,
  companyName,
}) => {
  // Hàm exportToExcel được gọi khi người dùng nhấn nút xuất file
  const exportToExcel = async () => {
    // Hiển thị hộp thoại xác nhận trước khi xuất file
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
      // Tạo workbook mới
      const workbook = new ExcelJS.Workbook();
      // Thêm một worksheet mới vào workbook
      const worksheet = workbook.addWorksheet("Sheet1");

      // Thêm tên công ty vào dòng đầu tiên
      worksheet.mergeCells("A1:E1"); // Gộp các ô từ A1 đến E1
      const titleCell = worksheet.getCell("A1"); // Lấy ô A1
      titleCell.value = companyName; // Đặt giá trị ô A1 là tên công ty
      titleCell.font = { bold: true, size: 20 }; // Định dạng chữ đậm và cỡ chữ lớn hơn
      titleCell.alignment = { vertical: "middle", horizontal: "center" }; // Căn giữa theo cả chiều dọc và ngang
      titleCell.border = {
        // Thêm đường viền cho ô A1
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Thêm tiêu đề cột vào dòng thứ hai (dưới tên công ty)
      worksheet.addRow([]); // Thêm một dòng trống để tạo khoảng cách giữa tên công ty và tiêu đề cột
      const headers = ["id", "name", "description", "createAt", "updateAt"];
      const headerRow = worksheet.addRow(headers); // Thêm dòng tiêu đề cột vào worksheet
      headerRow.font = { bold: true }; // Định dạng chữ đậm cho dòng tiêu đề cột
      headerRow.alignment = { vertical: "middle", horizontal: "center" }; // Căn giữa tiêu đề cột
      headerRow.eachCell((cell) => {
        // Áp dụng định dạng cho từng ô trong dòng tiêu đề cột
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "CDE8EE" }, // Màu nền xanh nhạt
        };
        cell.border = {
          // Thêm đường viền cho từng ô trong dòng tiêu đề cột
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Thêm dữ liệu vào worksheet
      data.forEach((item) => {
        const row = worksheet.addRow([
          item.id,
          item.name,
          item.description,
          item.createAt,
          item.updateAt,
        ]); // Thêm từng hàng dữ liệu vào worksheet
        row.eachCell((cell) => {
          // Áp dụng định dạng cho từng ô trong các hàng dữ liệu
          cell.alignment = { vertical: "middle", horizontal: "left" }; // Căn trái dữ liệu
          cell.border = {
            // Thêm đường viền cho từng ô trong các hàng dữ liệu
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      // Đặt độ rộng của các cột
      worksheet.columns = [
        { width: 10 }, // Độ rộng cột id
        { width: 30 }, // Độ rộng cột name
        { width: 70 }, // Độ rộng cột description
        { width: 30 }, // Độ rộng cột createAt
        { width: 30 }, // Độ rộng cột updateAt
      ];

      // Tạo buffer từ workbook và lưu file dưới dạng blob
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob); // Tạo URL từ blob
      const a = document.createElement("a"); // Tạo thẻ <a> để tải file
      a.href = url;
      a.download = fileName; // Đặt tên file cho link download
      a.click(); // Tự động nhấn vào link để tải file
      window.URL.revokeObjectURL(url); // Hủy URL sau khi tải xong
    }
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      xuất excel
    </button>
  );
};

export default ExportExcel;
