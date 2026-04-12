import Image from "next/image";

import type { CourseCard } from "~/types/course";

const Card = (data: CourseCard) => {
  const { category, id, instructor, price, thumbnail, title } = data;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={thumbnail ?? ""}
          alt={title}
          fill
          sizes="Max"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-blue-600">
          {title}
        </h3>

        <p className="mb-4 text-sm text-slate-500">
          By{" "}
          <span className="font-medium text-slate-700">
            {instructor.user.name}
          </span>
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xl font-bold text-slate-900">
            {price === 0 ? "Free" : `$${price}`}
          </span>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View Course →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
