import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsPage";
import Client from "../components/client/Client";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorize" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (!reservations?.length) {
    return (
      <Client>
        <EmptyState
          title="No trips found"
          subtitle="Look like you have no reservations on your property!"
        />
      </Client>
    );
  }
  return (
    <Client>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Client>
  );
};

export default ReservationsPage;
