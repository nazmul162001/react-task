import React, { useState } from "react";
import Card from "./Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const VideoCard = () => {
  const [items, setItems] = useState([
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
  ]);
  //   const items = [
  //     {
  //       id: "1",
  //       name: "Video 1",
  //       title: "Title 1",
  //       author: "Author 1",
  //     },
  //     {
  //       id: "2",
  //       name: "Video 2",
  //       title: "Title 2",
  //       author: "Author 2",
  //     },
  //     {
  //       id: "3",
  //       name: "Video 3",
  //       title: "Title 3",
  //       author: "Author 3",
  //     },
  //   ];

  const [hoverIndex, setHoverIndex] = useState(null);
  
  const moveCard = (dragIndex, dropIndex) => {
    if (dragIndex === dropIndex) return;
    const draggedItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setItems(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="px-5">
        {items.map((item, index) => (
          <Card
            key={item.id}
            videoInfo={item}
            index={index}
            moveCard={moveCard}
            setHoverIndex={setHoverIndex}
          />
        ))}
      </section>
    </DndProvider>
  );
};

export default VideoCard;
