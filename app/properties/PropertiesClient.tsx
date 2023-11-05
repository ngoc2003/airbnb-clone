"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SafeListing, SafeUser } from "../types";
import Heading from "../components/heading";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/container";
import Client from "../components/client/Client";
import EmptyState from "../components/EmptyState";
import { useInfinityScroll } from "../hooks/useInfinityScroll";
import { useDeleteListing, useGetListings } from "../utils/listings";
import Loader from "../components/loading";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  params: {
    userId: string;
  };
}

const PropertiesClient = ({ currentUser, params }: PropertiesClientProps) => {
  const [deletingId, setDeletingId] = useState<string>("");
  const [offset, setOffset] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [listingList, setListingList] = useState<SafeListing[]>([]);

  const { scrollRef, isFetching: isInfinityScrollFetching } =
    useInfinityScroll(canScroll);

  const handleConcatData = (data: SafeListing[]) => {
    if (data.length < 20) {
      setCanScroll(false);
    }
    setListingList((prev) => prev.concat(data));
    setOffset((prev) => prev + 20);
  };
  const { mutate } = useDeleteListing();
  const { refetch, isFetching } = useGetListings(
    {
      ...params,
      offset: offset,
    },
    handleConcatData
  );

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      mutate(id);
    },
    [mutate]
  );

  useEffect(() => {
    if (isInfinityScrollFetching && canScroll) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canScroll, isInfinityScrollFetching]);

  if (listingList.length === 0 && !isFetching) {
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
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        ref={(node) => {
          if (node) {
            scrollRef.current = node;
          }
        }}
        className="mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listingList &&
          listingList.map((item: any) => (
            <ListingCard
              key={item.id}
              data={item}
              actionId={item.id}
              onAction={onCancel}
              disabled={deletingId === item.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
      </div>
      {isFetching && <Loader />}
    </Container>
  );
};

export default PropertiesClient;
