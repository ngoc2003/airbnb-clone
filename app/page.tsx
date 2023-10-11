import HomepageClient from "./HomepageClient";
import getCurrentUser from "./actions/getCurrentUser";
import { IListingParams } from "./actions/getListingList";

interface HomeProps {
  searchParams: IListingParams;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 60;

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();

  return (
    <HomepageClient currentUser={currentUser} searchParams={searchParams} />
  );
};

export default Home;
