"use client";

import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface StarRatingProps {
  defaultValue?: number;
  value?: number;
  onChange?: (rate: number) => void;
}

const StarRating = ({ defaultValue, value, onChange }: StarRatingProps) => {
  const [rating, setRating] = useState((value || defaultValue) ?? 0);
  const [hover, setHover] = useState((value || defaultValue) ?? 0);

  return (
    <div className="flex justify-between w-full items-center mb-6">
      <h2 className="font-semibold">Put your star</h2>
      <div>
        {[...Array(5)].map((_, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`group mx-1 text-xl ${
                index <= (hover || rating) ? "text-primary" : "text-[#bbb9b9]"
              }`}
              onClick={() => {
                setRating(index);
                onChange?.(index);
              }}
              onMouseEnter={() => {
                setHover(index);
              }}
              onMouseLeave={() => {
                setHover(rating);
              }}
            >
              <AiFillStar />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
