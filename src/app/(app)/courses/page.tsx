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

  const data = new Map<string, CourseCardData[]>();

  for (let i = 0; i < cards.length; i++) {
    const category = cards[i]?.category;

    if (!data.has(category!)) {
      data.set(category!, []);
    }

    data.get(category!)!.push(cards[i]!);
  }
  return (
    <div>
      {[...data].map(([category, cards]) => (
        <div key={category}>
          <h1>{category}</h1>

          {cards.map((card, index) => (
            <CourseCard key={card.id} cardData={card} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default page;
