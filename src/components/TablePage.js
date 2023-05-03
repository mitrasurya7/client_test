import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { ebooksAtom, fetchEbooks, ebookOneAtom } from "../stores/store";
import api from "../config/axios.config";
import Swal from "sweetalert2";

const TablePage = ({ role, dataTable }) => {
  const navigate = useNavigate();
  const [, setEbooks] = useAtom(ebooksAtom);
  const [, setEbookOne] = useAtom(ebookOneAtom);

  const isUser = role === "user";

  const tableHeader = isUser
    ? "Daftar Ebook Yang dapat di baca"
    : "Daftar Ebook Yang Telah Terupload";

  const dataColumn = isUser
    ? [{ header: "Title", key: "title" }]
    : [
        { header: "Title", key: "title" },
        { header: "Status", key: "status" },
      ];

  const classBg = isUser
    ? "overflow-x-auto h-[390px]"
    : "overflow-x-auto max-h-[310px]";

  const handleOnChange = async (e) => {
    try {
      const { data } = await api.patch(`/api/ebooks/${e.target.id}`, {
        status: e.target.value,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      const result = await fetchEbooks();
      setEbooks(result);
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const handleOnClickDelete = async (e) => {
    try {
      const popUp = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (popUp.isConfirmed) {
        await api.delete(`/api/ebooks/${e.target.id}`);
        const result = await fetchEbooks();
        setEbooks(result);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const handleOnClickRead = async (e) => {
    try {
      const { data } = await api.get(`/api/ebooks/${e.target.id}`);
      setEbookOne(data);
      navigate("/read");
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  return (
    <div className={classBg}>
      <h2 className="text-center font-bold">{tableHeader}</h2>
      <table className="table-auto w-full text-center">
        <thead>
          <tr>
            <th className="border py-2">No</th>
            {dataColumn.map((item, index) => (
              <th key={index} className="border px-4 py-2">
                {item.header}
              </th>
            ))}
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTable &&
            dataTable.map((item, index) => (
              <tr key={index}>
                <td className="border py-2 ">{index + 1}</td>
                {dataColumn.map((column, index) => (
                  <td key={column.key} className="border px-4 py-2">
                    {item[column.key]}
                  </td>
                ))}
                <td className="border px-4 py-2">
                  {role === "admin" ? (
                    <>
                      <select
                        className="bg-slate-200 rounded-lg p-2 text-slate-950"
                        id={item._id}
                        value={item.status}
                        onChange={handleOnChange}
                      >
                        <option value="public">public</option>
                        <option value="private">private</option>
                      </select>
                      <button
                        id={item._id}
                        className="bg-sky-500 px-2 mx-2 py-2 rounded-lg font-bold text-slate-100 hover:bg-sky-800"
                        onClick={handleOnClickDelete}
                      >
                        delete
                      </button>
                    </>
                  ) : (
                    <button
                      id={item._id}
                      className="bg-sky-500 px-2 mx-2 py-2 rounded-lg font-bold text-slate-100 hover:bg-sky-800"
                      onClick={handleOnClickRead}
                    >
                      read
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
