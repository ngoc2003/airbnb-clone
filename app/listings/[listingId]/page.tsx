import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing as any} currentUser={currentUser} />;
};

export default ListingPage;
