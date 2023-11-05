import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SafeListing } from "../types";
import toast from "react-hot-toast";

const getListing = (params: any) => axios.get("/api/listings", { params });

const deleteListing = (id: string) => axios.delete(`/api/listings/${id}`);

const createListing = (data: any) => axios.post("/api/listings", data);

export const useDeleteListing = (onSuccessFunc?: () => void) => {
  return useMutation<any, any, any>({
    mutationKey: ["listings"],
    mutationFn: deleteListing,
    onSuccess: () => {
      toast.success("Listing deleted");
      onSuccessFunc?.();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
};

export const useGetListings = (
  params: any,
  func: (data: SafeListing[]) => void
) => {
  return useQuery(["listings", params?.category], () => getListing(params), {
    select: ({ data }) => data,
    onSuccess: (data) => {
      func(data);
    },
  });
};

export const useCreateListing = (onSuccessFunc?: () => void) => {
  return useMutation<any, any, any>({
    mutationKey: ["listings"],
    mutationFn: createListing,
    onSuccess: () => {
      toast.success("Listing created!");
      onSuccessFunc?.();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
