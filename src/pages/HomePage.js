 // eslint-disable-next-line 
import { useAtom } from "jotai";
import { ebooksAtom } from "../stores/store";
import { useEffect } from "react";
import TablePage from "../components/TablePage";
import { fetchEbooks } from "../stores/store";
import api from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import "../styles/spinner.css";
import Swal from "sweetalert2";

const HomePage = () => {
  const navigate = useNavigate();
  const [ebooks, setEbooks] = useAtom(ebooksAtom);
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("username");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const title = e.target.title.value;
      const ebook = e.target.ebook.files[0];
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ebook", ebook);
      const { data } = await api.post("/api/ebooks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      let result = await fetchEbooks();
      setEbooks(result);
      Swal.fire("Success", "Ebook berhasil diupload", "success");
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };
  const onClickHandler = () => {
    console.log("logout");
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEbooks();
      setEbooks(data);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!ebooks) {
    return (
      <div class="spinner">
        <div class="spinner1"></div>
      </div>
    );
  }
  return (
    <section className=" container mx-auto p-10">
      <button
        onClick={onClickHandler}
        className="bg-slate-100 text-slate-950 rounded px-2 text-sm hover:bg-slate-400"
      >
        Logout
      </button>
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Selamat datang {user}</h1>
        <p className="font-semibold text-lg">anda adalah ({role})</p>
      </div>
      {role === "admin" && (
        <form onSubmit={onSubmitHandler}>
          <label> Upload Ebook</label>
          <div className="flex py-2 text-slate-900">
            <input
              type="file"
              className="w-full bg-slate-200 rounded-l-lg p-2"
              id="ebook"
              required
            />
            <input
              type="text"
              className="rounded-r-lg px-2"
              placeholder="title"
              id="title"
              required
            />
            <button
              type="submit"
              className=" bg-sky-500 px-2 mx-2 py-2 rounded-lg font-bold text-slate-100 hover:bg-sky-800"
            >
              Upload
            </button>
          </div>
        </form>
      )}
      <TablePage role={role} dataTable={ebooks} />
    </section>
  );
};

export default HomePage;
