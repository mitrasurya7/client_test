import { Link } from "react-router-dom";

const ButtonBack = () => {
  return (
    <div>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full fixed bottom-8 right-24 transform hover:-translate-y-2 transition duration-500 ease-in-out"
      >
        Back
      </Link>
    </div>
  );
};

export default ButtonBack;
