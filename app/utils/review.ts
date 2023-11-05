import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const createReview = (data: any) => axios.post("/api/reviews", data);

export const useCreateReview = (onSuccessFunc?: () => void) => {
  return useMutation<any, any, any>({
    mutationKey: ["reviews"],
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Your review have posted!");
      onSuccessFunc?.();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
