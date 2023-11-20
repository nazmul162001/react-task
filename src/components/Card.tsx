import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";

const Card = ({ videoInfo }) => {
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center border border-gray-600 rounded p-3 pl-5 mb-5">
        <div className="flex items-center gap-4 w-full">
          <div>
            <img
              className="w-16"
              src="https://png.pngtree.com/png-vector/20231006/ourmid/pngtree-demo-violet-glossy-icon-on-white-background-game-png-image_10076795.png"
              alt="video/image"
            />
          </div>
          <div className="text-gray-400 font-medium text-lg pr-5">
            <p>Title of the card</p>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <span>
              <FaRegCircleUser className="text-xl" fil={undefined} />
            </span>
            <span className="text-[#DBFD51]">User-1</span>
          </div>
          <div className="flex items-center gap-2 ">
            <span>254</span>
            <span>
              <FaArrowUpLong className="text-[#DBFD51]" fil={undefined} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
