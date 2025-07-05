"use client";

import { FC, ReactNode, useEffect } from "react";

interface GlowCardProps {
  /** Inner JSX placed inside the glowing container */
  children: ReactNode;
  /** Unique suffix used in the CSS classname selectors */
  identifier: string | number;
}

const GlowCard: FC<GlowCardProps> = ({ children, identifier }) => {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(
      `.glow-container-${identifier}`
    );
    const cards = document.querySelectorAll<HTMLElement>(
      `.glow-card-${identifier}`
    );

    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [identifier]);

  return <div className={`glow-container-${identifier}`}>{children}</div>;
};

export default GlowCard;
