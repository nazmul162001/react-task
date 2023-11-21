import React, { useEffect, useState } from "react";
import Card from "./Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const VideoCard = () => {
  const [allItems, setAllItems] = useState([
    {
      id: "1",
      name: "Cryptocurrency Explained: The Future of Money",
      like: Math.floor(Math.random() * 50) + 50,
      author: "John Smith",
    },
    {
      id: "2",
      name: "Mastering Algorithms: The Key to Efficient Programming",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Emily Johnson",
    },
    {
      id: "3",
      name: "The Evolution of AI in Modern Technology",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Michael Williams",
    },
    {
      id: "4",
      name: "Data Privacy: Navigating the Digital Age",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Olivia Brown",
    },
    {
      id: "5",
      name: "Future of Transportation: From Hyperloop to Flying Cars",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Daniel Martinez",
    },
    {
      id: "6",
      name: "Sustainable Energy: Innovations and Challenges",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Sophia Garcia",
    },
    {
      id: "7",
      name: "Space Exploration: Journey Beyond Our Solar System",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Liam Wilson",
    },
    {
      id: "8",
      name: "Artificial Intelligence in Healthcare: Revolutionizing Medicine",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Ava Anderson",
    },
    {
      id: "9",
      name: "Blockchain Technology: Beyond Bitcoin",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Noah Taylor",
    },
    {
      id: "10",
      name: "Future of Work: Adapting to Remote Employment",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Isabella Clark",
    },
    {
      id: "11",
      name: "Cybersecurity: Protecting Your Digital Life",
      like: Math.floor(Math.random() * 50) + 50,
      author: "William Rodriguez",
    },
    {
      id: "12",
      name: "Virtual Reality: Changing How We Experience Entertainment",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Sophie Moore",
    },
    {
      id: "13",
      name: "The Ethics of Biotechnology: Balancing Innovation and Responsibility",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Ethan Thompson",
    },
    {
      id: "14",
      name: "Gaming Industry Trends: From eSports to Game Streaming",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Avery Lee",
    },
    {
      id: "15",
      name: "Augmented Reality: Enhancing the Real World with Technology",
      like: Math.floor(Math.random() * 50) + 50,
      author: "Charlotte Hill",
    },
  ]);

  const [page, setPage] = useState(1);

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
    setAllItems(newItems);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
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
          setAllItems(data.list);
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
