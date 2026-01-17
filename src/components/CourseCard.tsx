"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";
import { useSearchParams } from "next/navigation";

const CourseCard = ({ cardData }: { cardData: CourseCardData }) => {
  const searchParams = useSearchParams()
  const ida = searchParams.get("id")
  const { title, image, price, creator, id = "dkjlskjlksjdjskd" } = cardData;
  const url = `/${creator.trim()}/id=${id}`;
  console.log({ida});
  return (
    <div className="w-60 space-y-4">
      <Link
        href={url}
        className="flex flex-col gap-6 rounded-lg bg-neutral-900 p-2.5 text-white"
      >
        <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="mt-2">
          <h1 className="text-xl">{title}</h1>
          <p className="text-xs text-neutral-400">
            <i>{creator}</i>
          </p>
          <p className="text-neutral-400">&#8377; {price}</p>
        </div>
      </Link>

      <Link
        href={"/url"}
        className={cn(buttonVariants({ variant: "default" }), "w-full")}
      >
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;
