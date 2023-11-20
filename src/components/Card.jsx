import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";

const Card = ({ videoInfo, index, moveCard, setHoverIndex }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "videoInfo",
    item: { id: videoInfo?.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "videoInfo",
    drop: (item) => {
      moveCard(item.index, index);
      setHoverIndex(null);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    hover: (item) => {
      if (index !== item.index) {
        setHoverIndex(index);
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`w-full ${isDragging ? "opacity-25" : "opacity-100"}`}
    >
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
            <p>{videoInfo?.title}</p>
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
