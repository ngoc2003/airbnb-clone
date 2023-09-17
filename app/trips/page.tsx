import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import Client from "../components/client/Client";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorize" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (!reservations?.length) {
    return (
      <Client>
        <EmptyState
          title="No trips found"
          subtitle="Look like you havent reserved any trips!"
        />
      </Client>
    );
  }

  return (
    <Client>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </Client>
  );
};

export default TripsPage;
