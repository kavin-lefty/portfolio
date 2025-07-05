"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaCode, FaPlay } from "react-icons/fa";
import placeholder from "/public/png/placeholder.png";

export interface Project {
  name: string;
  description: string;
  tags: string[];
  code: string; // URL to repo
  demo: string; // URL to live demo/video
  image?: StaticImageData; // imported image or leave undefined
}

interface SingleProjectProps {
  project: Project;
}

const SingleProject: FC<SingleProjectProps> = ({ project }) => {
  const { name, description, tags, code, demo, image } = project;

  return (
    <div className="group relative flex h-fit w-full cursor-text flex-col items-center justify-center overflow-hidden rounded-lg border border-[#1a1443] bg-[linear-gradient(90deg,#281e57_0%,#201435_100%)] px-3 py-[1.4rem] shadow-2xl md:px-8">
      {/* background grid */}
      <div className="absolute left-0 top-0 flex justify-center opacity-40">
        {/* static SVG omitted for brevity */}
      </div>

      {/* main content */}
      <div className="flex h-full w-full flex-col items-center justify-between">
        <h2 className="text-center text-[1.525rem] font-semibold capitalize leading-[110%] text-[#EFF3F4]">
          {name}
        </h2>

        {/* project image */}
        <div className="p-6">
          <Image
            src={image ?? placeholder}
            alt={name}
            width={1080}
            height={720}
            className="h-64 w-80 rounded-lg transition-opacity delay-[0.3s] duration-[0.7s] group-hover:opacity-0"
            priority
          />
        </div>

        {/* action buttons */}
        <div className="flex w-full items-center justify-between">
          <Link
            href={demo}
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#EFF3F4] text-[#EFF3F4] transition-all duration-300 hover:scale-110 hover:border-[#0F0C41] hover:bg-[#231d4b] hover:text-violet-600"
          >
            <FaPlay />
          </Link>

          <Link
            href={code}
            target="_blank"
            className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#EFF3F4] text-[#EFF3F4] transition-all duration-300 hover:scale-110 hover:border-[#0F0C41] hover:bg-[#231d4b] hover:text-violet-600 md:delay-[0.3s] group-hover:-translate-x-[140px]"
          >
            <FaCode />
          </Link>
        </div>
      </div>

      {/* description slide‑in */}
      <p className="absolute left-0 top-0 w-[90%] translate-x-[-110%] translate-y-[25%] rounded-[0_20px_20px_0] bg-[#0f0b24] p-6 text-xs leading-[110%] text-[#EFF3F4] transition-transform duration-[0.9s] md:w-[85%] md:min-h-[150px] md:translate-y-[50%] md:text-sm group-hover:translate-x-[-2%]">
        {description}
      </p>

      {/* tags slide‑in */}
      <div className="group-hover:translate-x-0 absolute bottom-4 right-0 flex w-[140px] translate-x-full flex-col gap-2 rounded-[10px_0_0_10px] bg-[#0f0b24] p-[0.825rem] text-[0.8rem] text-[#EFF3F4] transition-transform duration-[0.5s] delay-[0.3s]">
        {tags.map((tag) => (
          <span key={tag} className="break-words text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SingleProject;
