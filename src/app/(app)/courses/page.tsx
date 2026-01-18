import React from "react";
import CourseCard from "~/components/CourseCard";

const page = () => {
  const cards: CourseCardData[] = [
    {
      category: "",
      creator: "",
      description: "",
      id: "",
      image: "",
      price: 122,
      title: "",
    },
  ];
  return (
    <div>
      {cards.map((card, index) => (
        <div key={index}>
          <h1>{card.category}</h1>

          <CourseCard cardData={card} />
        </div>
      ))}
    </div>
  );
};

export default page;
