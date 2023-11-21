import React, { useEffect, useState } from "react";
import Card from "./Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const VideoCard = () => {
  const [allItems, setAllItems] = useState([]);
  const [availableVideoData, setAvailableVideoData] = useState([]);
  // console.log(availableVideoData?.length);

  // const [page, setPage] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
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
    setAllItems(newItems);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      // const token = localStorage.getItem("token");
      try {
        const token = localStorage.getItem("token");
        // console.log(token);
        const response = await fetch(
          "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-project":
                "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              payload: {},
              page: currentPage,
              limit: itemsPerPage,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAllItems((prevItems) => [...prevItems, ...data.list]);

          // console.log(data.list); // Log the fetched video data
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="px-5">
        <div className="flex justify-between px-5 text-gray-400 py-5">
          <span>like</span>
          <span>Author</span>
          <span>Most Liked</span>
        </div>
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
          className={`px-5 py-1 bg-gray-700 rounded-lg ${
            currentPage === 1 ? "cursor-not-allowed" : ""
          }`}
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
          // disabled={indexOfLastItem >= allItems.length}
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
