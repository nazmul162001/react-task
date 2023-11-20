import React from "react";
import { FaRegUser } from "react-icons/fa";

const AdminDashboardPage = () => {
  return (
    <>
      <section className="w-full bg-[#111111] h-screen text-white py-10 px-5 md:px-10">
        {/* logo & logout  */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">APP</h1>
          <button className="flex items-center gap-2 text-sm px-5 py-1 text-black rounded-full bg-[#9BFF00]">
            <span className="">
              <FaRegUser />
            </span>
            <span>Logout</span>
          </button>
        </div>

        {/* Dashboard Header  */}
        <div className="w-full p-5 mt-10">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl text-gray-400">Today's leaderboard</h1>
            <div className="flex justify-between gap-5 items-center bg-[#424141c0] p-5 rounded-lg">
              {/* date  */}
              <h4 className="text-gray-400">22 November 2023</h4>
              <span className="bg-[#9BFF00]  py-1 px-2 text-gray-500 rounded">Submissions Open</span>
              <h4 className="text-gray-400">11:14</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
