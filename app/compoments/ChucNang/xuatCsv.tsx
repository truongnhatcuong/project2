import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-toastify/dist/ReactToastify.css";

interface ExportCSVProps {
  data: any[];
  fileName: string;
}

const ExportCSV: React.FC<ExportCSVProps> = ({ data, fileName }) => {
  const [exportConfirmed, setExportConfirmed] = useState(false);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
  ];

  const handleExport = async () => {
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
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex items-center"
      >
        <FaDownload className="mr-2" />
        Xuất CSV
      </button>
      {/* Điều kiện để xuất file CSV */}
      {exportConfirmed && (
        <CSVLink
          data={data}
          headers={headers}
          filename={fileName}
          className="hidden"
          id="csv-link"
          asyncOnClick={true}
          onClick={() => setExportConfirmed(false)}
        >
          Xuất CSV
        </CSVLink>
      )}
    </div>
  );
};

export default ExportCSV;
