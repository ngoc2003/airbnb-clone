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

  return (
    <Client>
      <PropertiesClient
        params={params}
        currentUser={currentUser}
      />
    </Client>
  );
};

export default PropertiesPage;
