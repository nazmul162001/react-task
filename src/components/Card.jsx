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
      <div className="flex justify-between gap-4 items-center border border-gray-600 rounded p-3 pl-5 mb-5">
        <div className="flex items-center gap-2 w-full">
          <div className="">
            <img
              className="w-20 h-12 rounded-lg"
              src="https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg"
              alt="video/image"
            />
          </div>
          <div className="text-gray-400 font-medium text-lg pr-5">
            <p>{videoInfo?.name}</p>
          </div>
        </div>
        <div className="flex items-center w-full">
          <div className="flex items-center gap-2">
            <span>
              <FaRegCircleUser className="text-xl" fil={undefined} />
            </span>
            <span className="text-[#DBFD51]">{videoInfo.author}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <span>{videoInfo.like}</span>
          <span>
            <FaArrowUpLong className="text-[#DBFD51]" fil={undefined} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
