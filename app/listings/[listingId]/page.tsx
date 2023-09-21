import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getListingById from "@/app/actions/getListingById";
import Client from "@/app/components/client/Client";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <Client>
        <EmptyState />
      </Client>
    );
  }

  return (
    <Client>
      <ListingClient listing={listing as any} currentUser={currentUser} />
    </Client>
  );
};

export default ListingPage;
