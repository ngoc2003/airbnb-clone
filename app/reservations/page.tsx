import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsPage";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorize" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (!reservations?.length) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Look like you have no reservations on your property!"
      />
    );
  }
  return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
};

export default ReservationsPage;
