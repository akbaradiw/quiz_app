import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="pb-4" >
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-semibold p-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out text-md md:text-xl"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
