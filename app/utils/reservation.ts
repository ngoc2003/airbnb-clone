import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const getReservation = (params: any) =>
  axios.get("/api/reservations", { params });

const deleteReservation = (id: string) =>
  axios.delete(`/api/reservations/${id}`);

const createReservation = (data: any) => axios.post("/api/reservations", data);

export const useCreateReservation = (onSuccessFunc?: () => void) => {
  return useMutation<any, any, any>({
    mutationKey: ["reservations"],
    mutationFn: createReservation,
    onSuccess: () => {
      toast.success("Listing reserved!");
      onSuccessFunc?.();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};

export const useDeleteReservation = (onSuccessFunc?: () => void) => {
  return useMutation<any, any, any>({
    mutationKey: ["reservations"],
    mutationFn: deleteReservation,
    onSuccess: () => {
      toast.success("Reservation cancelled");
      onSuccessFunc?.();
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });
};
