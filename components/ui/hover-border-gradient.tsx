"use client";
import React, { useState, useEffect } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

type BaseProps = {
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  children?: React.ReactNode;
};

type HoverBorderGradientProps<T extends React.ElementType = "button"> =
  BaseProps &
    Omit<React.ComponentPropsWithoutRef<T>, keyof BaseProps | "as"> & {
      as?: T;
    };

export function HoverBorderGradient<T extends React.ElementType = "button">({
  children,
  containerClassName,
  className,
  as,
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps<T>) {
  const Tag = (as || "div") as React.ElementType;
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #f6f247 0%, rgba(246, 242, 71, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #f6f247 0%, rgba(246, 242, 71, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, #f6f247 0%, rgba(246, 242, 71, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, #f6f247 0%, rgba(246, 242, 71, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #f6f247 0%, rgba(246, 242, 71, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => {
          const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
          const currentIndex = directions.indexOf(prevState);
          const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
          return directions[nextIndex];
        });
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);
  
  const Component = Tag as React.ComponentType<
    React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }
  >;
  
  return (
    <Component
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px box-decoration-clone w-fit",
        containerClassName
      )}
      {...(props as Record<string, unknown>)}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-black absolute z-1 flex-none inset-0.5 rounded-[100px]" />
    </Component>
  );
}
