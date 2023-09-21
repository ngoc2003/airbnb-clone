"use client";

import { Review, User } from "@prisma/client";
import React, { useMemo } from "react";
import Avatar from "../navbar/Avatar";
import { format } from "date-fns";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface ListingReviewProps {
  reviews?: (Review & {
    user: User;
  })[];
}

const ListingReview = ({ reviews }: ListingReviewProps) => {
  const router = useRouter();
  const averageRating = useMemo(() => {
    if (!reviews || reviews?.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce(
      (accumulator, { rate }) => accumulator + rate,
      0
    );
    return totalRating / reviews.length;
  }, [reviews]);

  if (!reviews?.length) {
    return null;
  }

  return (
    <div className="w-full mt-6 md:mt-0">
      <h2 className="text-xl font-semibold flex gap-2 items-center">
        <span>
          <AiFillStar />
        </span>
        <span>{averageRating}</span>
        <span>|</span>
        <span>
          <span className="text-rose-500">{reviews.length}</span> reviews
        </span>
      </h2>
      <hr className="my-6" />
      <div>
        {reviews.map((review) => (
          <div key={review.id} className="mb-10">
            <div className="text-sm flex gap-2 items-center">
              <span>
                <Avatar src={review.user.image} />
              </span>
              <div>
                <h2
                  className="font-semibold hover:underline"
                  onClick={() => router.push(`/users/show/${review.user.id}`)}
                >
                  {review.user.name}
                </h2>
                <p className="text-neutral-500">
                  {format(new Date(review.createdAt), "MM/dd/yyyy")}
                </p>
              </div>
            </div>
            <p className="mt-2 text-neutral-800">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingReview;
