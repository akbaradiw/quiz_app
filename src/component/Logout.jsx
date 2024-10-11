import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="pb-4 flex justify-center">
      <FaPowerOff
        onClick={handleLogout}
        className="  text-red-500 hover:text-blue-500 hover:cursor-pointer font-semibold p-2 transition duration-300 ease-in-out text-5xl"
      />

   
    </div>
  );
};

export default Logout;
