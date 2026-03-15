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
      className="group relative flex w-72 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* The Image Container with Overlay */}
      <div className="relative h-96 w-full">
        <Image
          src={imageUrl}
          alt={skillTitle}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark Gradient Overlay to ensure text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all group-hover:bg-white group-hover:text-black">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase group-hover:text-zinc-900">
            {skillTitle}
          </h2>
          <div className="rounded-full bg-indigo-600 p-2 text-white shadow-lg transition-transform group-hover:rotate-45">
            <ArrowDownRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;
