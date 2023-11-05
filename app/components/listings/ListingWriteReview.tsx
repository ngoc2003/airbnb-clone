"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import StarRating from "../rating";
import toast from "react-hot-toast";
import router from "next/router";
import TextField from "../textField";
import Button from "../button";
import useRentModal from "@/app/hooks/useRentModal";
import { useCreateReview } from "@/app/utils/review";

const EXAMPLE_REVIEW = [
  "Good!",
  "Amazing place!",
  "Beatifull house!",
  "Greate memories here!",
];

interface ListingWriteReviewProps {
  userId?: string | null;
  listingId: string;
}
const ListingWriteReview = ({ userId, listingId }: ListingWriteReviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useRentModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      content: "",
      rate: "",
    },
  });

  const rating = watch("rate");

  const content = watch("content");

  const handleInsertToContent = (text: string) => {
    setValue("content", (" " + content + (content ? ", " : "") + text).trim());
  };

  const { mutate } = useCreateReview(() => {
    reset();
    router.reload();
  });

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    if (!userId || !listingId) {
      toast.error("You need to sign in first!");
      return loginModal.onOpen();
    }

    if (!rating || !content) {
      return toast.error(
        "You must fill all content and star to post a review!"
      );
    }

    mutate({ ...values, listingId });
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold">Your review</h2>
      <hr className="my-6" />
      <StarRating value={rating} onChange={(r) => setValue("rate", r)} />
      <div className="flex flex-wrap whitespace-nowrap">
        {EXAMPLE_REVIEW.map((rv) => (
          <button
            className="bg-neutral-100 mr-3 rounded-full cursor-pointer mb-3 py-2 px-4 scale-100 hover:scale-95 duration-300"
            onClick={() => handleInsertToContent(rv)}
            key={rv}
          >
            {rv}
          </button>
        ))}
      </div>
      <TextField
        id="content"
        rows={4}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        hasValue={watch("content")}
      />
      <div className="mt-6">
        <Button label="Post my review" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};

export default ListingWriteReview;
