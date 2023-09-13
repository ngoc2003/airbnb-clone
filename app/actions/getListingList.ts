import client from "../libs/prismadb";

export default async function getListingList() {
  try {
    const listingList = await client.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listingList.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (err: any) {
    throw new Error(err);
  }
}
