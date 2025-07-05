"use client";

import React, { FC } from "react";

export interface ProjectType {
  name: string;
  role: string;
  description: string;
  tools: string[];
}

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => (
  <div className="relative w-full rounded-lg border bg-gradient-to-r from-[#0d1224] to-[#0a0d37] border-[#1b2c68a0]">
    {/* top gradient bar */}
    <div className="flex flex-row">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
      <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent" />
    </div>

    {/* window chrome + title */}
    <div className="relative px-4 py-3 lg:px-8 lg:py-5">
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-row space-x-1 lg:space-x-2">
        <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400" />
        <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400" />
        <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200" />
      </div>
      <p className="ml-3 text-center text-base lg:text-xl text-[#16f2b3]">
        {project.name}
      </p>
    </div>

    {/* code block */}
    <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 py-4 lg:px-8 lg:py-8">
      <code className="font-mono text-xs md:text-sm lg:text-base">
        {/* opening */}
        <div className="blink">
          <span className="mr-2 text-pink-500">const</span>
          <span className="mr-2 text-white">project</span>
          <span className="mr-2 text-pink-500">=</span>
          <span className="text-gray-400">&#123;</span>
        </div>

        {/* name */}
        <div>
          <span className="ml-4 mr-2 lg:ml-8 text-white">name:</span>
          <span className="text-gray-400">&apos;</span>
          <span className="text-amber-300">{project.name}</span>
          <span className="text-gray-400">&apos;,</span>
        </div>

        {/* tools */}
        <div className="ml-4 mr-2 lg:ml-8">
          <span className="text-white">tools:</span>
          <span className="text-gray-400"> [&apos;</span>
          {project.tools.map((tag) => (
            <React.Fragment key={tag}>
              <span className="text-amber-300">{tag}</span>
              {tag !== project.tools.at(-1) && (
                <span className="text-gray-400">&apos;, &apos;</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-gray-400">&apos;],</span>
        </div>

        {/* role */}
        <div>
          <span className="ml-4 mr-2 lg:ml-8 text-white">myRole:</span>
          <span className="text-orange-400">{project.role}</span>
          <span className="text-gray-400">,</span>
        </div>

        {/* description */}
        <div className="ml-4 mr-2 lg:ml-8">
          <span className="text-white">description:</span>
          <span className="text-cyan-400"> {project.description}</span>
          <span className="text-gray-400">,</span>
        </div>

        {/* closing */}
        <div>
          <span className="text-gray-400">&#125;;</span>
        </div>
      </code>
    </div>
  </div>
);

export default ProjectCard;
