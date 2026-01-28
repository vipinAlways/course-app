import Image from "next/image";
import Link from "next/link";
import React from "react";

const SkillCard = ({
  imageUrl,
  skillTitle,
}: {
  imageUrl: string;
  skillTitle: string;
}) => {
  return (
    <Link
      href={`/course?category=${encodeURIComponent(skillTitle)}`}
      className="flex flex-col"
    >
      <div
        className="h-80 w-64 p-3 flex flex-col"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <h1 className="w-full bg-white text-zinc-900 capitalize">
          {skillTitle}
        </h1>
      </div>
    </Link>
  );
};

export default SkillCard;
