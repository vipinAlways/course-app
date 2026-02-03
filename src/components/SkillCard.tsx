import { ArrowBigLeft, ArrowDownRight } from "lucide-react";
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
      className="flex w-72 flex-col rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex h-96 flex-col justify-end rounded-lg p-3">
        <h1 className="flex w-full items-center gap-4 rounded-lg bg-white p-1 text-2xl text-zinc-900 capitalize">
          {skillTitle} <ArrowDownRight />
        </h1>
      </div>
    </Link>
  );
};

export default SkillCard;
