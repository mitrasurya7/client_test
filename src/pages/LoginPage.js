import api from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
      const { data } = await api.post("/api/users/login", {
        username,
        password,
      });
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      if (data.access_token) {
        navigate("/");
      }
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  return (
    <section className="p-32 h-screen">
      <div className="bg-gray-200 rounded shadow-lg w-1/2 mx-auto p-5 text-slate-950 font-semibold">
        <h1 className="text-center font-bold text-lg">Halo Please Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 rounded-lg bg-slate-50 hover:border-sky-500"
              placeholder="Insert Your Username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded-lg my-2"
              placeholder="Insert Your Password"
            />
          </div>
          <div className="font-bold">
            <button
              type="submit"
              className="bg-sky-500 w-full p-1 rounded-lg hover:bg-sky-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
