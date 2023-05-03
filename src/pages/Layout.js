import { useState } from "react";
// import { useNavigate } from "react-router-dom";
const LayoutPage = ({ children }) => {
  // const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const changeTheme = () => setDarkMode(!darkMode);
  let changeBackground = darkMode
    ? "bg-slate-100 h-screen"
    : "bg-gray-950 text-slate-50 h-screen";
  let changeButton = darkMode
    ? "bg-slate-950 rounded-full h-9 w-9 transition-all left-7 relative"
    : "bg-white rounded-full h-9 w-9 transition-all relative left-0";

  return (
    <div className={changeBackground}>
      <div className="bg-sky-500 text-slate-100 p-2 font-bold text-xl shadow-lg flex justify-between">
        <h1>Ebook Reader EIS</h1>
      </div>
      <div className="bg-slate-500 absolute right-24 top-24 h-9 w-16 rounded-full p">
        <button onClick={changeTheme}>
          <div className={changeButton}></div>
        </button>
      </div>
      {children}
    </div>
  );
};

export default LayoutPage;
