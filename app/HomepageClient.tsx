/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { IListingParams } from "./actions/getListingList";
import { useInfinityScroll } from "./hooks/useInfinityScroll";
import Client from "./components/client/Client";
import EmptyState from "./components/EmptyState";
import Container from "./components/container";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing, SafeUser } from "./types";
import Loader from "./components/loading";
import { useGetListings } from "./utils/listings";

const HomepageClient = ({
  searchParams,
  currentUser,
}: {
  searchParams: IListingParams;
  currentUser?: SafeUser | null;
}) => {
  const [offset, setOffset] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const { scrollRef, isFetching: isInfinityScrollFetching } =
    useInfinityScroll(canScroll);
  const [listingList, setListingList] = useState<SafeListing[]>([]);

  const handleConcatData = (data: SafeListing[]) => {
    if (data.length < 20) {
      setCanScroll(false);
    } else {
      setCanScroll(true);
      setOffset((prev) => prev + 20);
    }
    setListingList((prev) => prev.concat(data));
  };

  useEffect(() => {
    setCanScroll(false);
    setListingList([]);
    setOffset(0);
    refetch();
  }, [searchParams?.category]);

  const { refetch, isFetching } = useGetListings(
    { ...searchParams, offset: offset },
    handleConcatData
  );

  useEffect(() => {
    if (isInfinityScrollFetching && canScroll) {
      refetch();
    }
  }, [canScroll, isInfinityScrollFetching]);

  if (!listingList?.length && !isInfinityScrollFetching && !isFetching) {
    return (
      <Client>
        <EmptyState showReset />
      </Client>
    );
  }

  return (
    <Client>
      <Container>
        <div
          ref={(node) => {
            if (node) {
              scrollRef.current = node;
            }
          }}
          className="pt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >
          {listingList.map((item: SafeListing) => (
            <ListingCard key={item.id} data={item} currentUser={currentUser} />
          ))}
        </div>
        {isFetching && <Loader />}
      </Container>
    </Client>
  );
};

export default HomepageClient;
