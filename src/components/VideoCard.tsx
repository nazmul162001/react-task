import React from "react";
import Card from "./Card";

const VideoCard = () => {
  const items = [
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
  ];

  return (
    <section className="px-5">
      {items.map((item) => (
        <Card key={item.id} videoInfo={item} />
      ))}
    </section>
  );
};

export default VideoCard;
