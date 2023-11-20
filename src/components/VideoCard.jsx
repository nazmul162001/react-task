import React, { useEffect, useState } from "react";
import Card from "./Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const VideoCard = () => {
  const [page, setPage] = useState(1);

  const allItems = [
    {
      id: "1",
      name: "Video 1",
      title: "Title 1",
      author: "Author 1",
    },
    {
      id: "2",
      name: "Video 2",
      title: "Title 2",
      author: "Author 2",
    },
    {
      id: "3",
      name: "Video 3",
      title: "Title 3",
      author: "Author 3",
    },
    {
      id: "4",
      name: "Video 4",
      title: "Title 4",
      author: "Author 4",
    },
    {
      id: "5",
      name: "Video 5",
      title: "Title 5",
      author: "Author 5",
    },
    {
      id: "6",
      name: "Video 6",
      title: "Title 6",
      author: "Author 6",
    },
    {
      id: "7",
      name: "Video 7",
      title: "Title 7",
      author: "Author 7",
    },
    {
      id: "8",
      name: "Video 8",
      title: "Title 8",
      author: "Author 8",
    },
    {
      id: "9",
      name: "Video 9",
      title: "Title 9",
      author: "Author 9",
    },
    {
      id: "10",
      name: "Video 10",
      title: "Title 10",
      author: "Author 10",
    },
    {
      id: "11",
      name: "Video 11",
      title: "Title 11",
      author: "Author 11",
    },
    {
      id: "12",
      name: "Video 12",
      title: "Title 12",
      author: "Author 12",
    },
    {
      id: "13",
      name: "Video 13",
      title: "Title 13",
      author: "Author 13",
    },
    {
      id: "14",
      name: "Video 14",
      title: "Title 14",
      author: "Author 14",
    },
    {
      id: "15",
      name: "Video 15",
      title: "Title 15",
      author: "Author 15",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const [hoverIndex, setHoverIndex] = useState(null);

  const moveCard = (dragIndex, dropIndex) => {
    if (dragIndex === dropIndex) return;
    const draggedItem = allItems[dragIndex];
    const newItems = [...allItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    // Update state or perform any actions with the rearranged items
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="px-5">
        {currentItems.map((item, index) => (
          <Card
            key={item.id}
            videoInfo={item}
            index={index}
            moveCard={moveCard}
            setHoverIndex={setHoverIndex}
          />
        ))}
      </section>
      <div className="px-5 my-8 flex justify-end gap-3">
        <button
          className="px-5 py-1 bg-gray-700 rounded-lg"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <span>
            <FaLongArrowAltLeft />
          </span>
        </button>
        <button
          className="px-5 py-1 bg-gray-700 rounded-lg"
          onClick={handleNextPage}
          disabled={indexOfLastItem >= allItems.length}
        >
          <span>
            <FaLongArrowAltRight />
          </span>
        </button>
      </div>
    </DndProvider>
  );
};

export default VideoCard;
