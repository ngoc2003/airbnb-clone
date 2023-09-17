import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import getFavoriteListings from "../actions/getFavoriteListings";
import Client from "../components/client/Client";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorize" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <Client>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </Client>
    );
  }

  return (
    <Client>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </Client>
  );
};

export default FavoritesPage;
