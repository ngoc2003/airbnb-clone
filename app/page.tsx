import Image from "next/image";
import Container from "./components/container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import getListingList, { IListingParams } from "./actions/getListingList";
import { SafeListing } from "./types";

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listingList = await getListingList(searchParams);
  const currentUser = await getCurrentUser();

  if (!listingList?.length) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 m:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listingList.map((item: SafeListing) => (
          <ListingCard key={item.id} data={item} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
}
