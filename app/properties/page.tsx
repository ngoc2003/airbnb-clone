import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getListingList from "../actions/getListingList";
import PropertiesClient from "./PropertiesClient";
import Client from "../components/client/Client";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorize" subtitle="Please login" />;
  }

  const params = { userId: currentUser.id };

  const listingList = await getListingList(params);

  if (listingList.length === 0) {
    return (
      <Client>
        <EmptyState
          title="No properties found"
          subtitle="Look like you have no properties!"
        />
      </Client>
    );
  }

  return (
    <Client>
      <PropertiesClient listingList={listingList} currentUser={currentUser} />
    </Client>
  );
};

export default PropertiesPage;
