import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const register = (data: any) => axios.post("/api/register", data);

export const useRegister = (onSuccessFunc?: () => void) => {
  return useMutation<any, any, any>({
    mutationKey: ["auth"],
    mutationFn: register,
    onSuccess: () => {
      toast.success("Register success!");
      onSuccessFunc?.();
    },
    onError: (error) => {
      toast.error(error?.response?.statusText || "Something went wrong");
    },
  });
};
