import React, { useRef } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-toastify/dist/ReactToastify.css";

interface ExportCSVProps {
  data: any[];
  fileName: string;
}

const ExportCSV: React.FC<ExportCSVProps> = ({ data, fileName }) => {
  const csvLinkRef = useRef<any>(null);

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

    if (result.isConfirmed) {
      csvLinkRef.current.link.click();
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex items-center"
      >
        Xuất CSV
      </button>
      <CSVLink
        data={data}
        headers={headers}
        filename={fileName}
        className="hidden"
        ref={csvLinkRef}
      >
        Xuất CSV
      </CSVLink>
    </div>
  );
};

export default ExportCSV;
