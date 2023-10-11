"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { IListingParams } from "./actions/getListingList";
import { useInfinityScroll } from "./hooks/useInfinityScroll";
import Client from "./components/client/Client";
import EmptyState from "./components/EmptyState";
import Container from "./components/container";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing, SafeUser } from "./types";
import axios from "axios";
import Loader from "./components/loading";

const HomepageClient = ({
  searchParams,
  currentUser,
}: {
  searchParams: IListingParams;
  currentUser?: SafeUser | null;
}) => {
  const [offset, setOffset] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const [listingList, setListingList] = useState<SafeListing[]>([]);
  const { scrollRef, isFetching } = useInfinityScroll(canScroll);

  const handleFetchListingList = useCallback(() => {
    axios
      .get("/api/listings", {
        params: {
          ...searchParams,
          offset: offset,
        },
      })
      .then((data) => {
        if (data.data.length < 20) {
          setCanScroll(false);
        }

        setListingList((prev) => [...prev, ...data.data]);
      });
  }, [offset, searchParams]);

  useEffect(() => {
    if (canScroll && !isFetching) {
      handleFetchListingList();
    }
  }, [canScroll, handleFetchListingList, isFetching]);

  useLayoutEffect(() => {
    setOffset(0);
    setListingList([]);
    setCanScroll(true);
  }, [searchParams]);

  useEffect(() => {
    if (isFetching && canScroll) {
      setOffset((prev) => prev + 20);
    }
  }, [canScroll, isFetching]);

  if (!listingList?.length && !isFetching) {
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
        {isFetching && canScroll && <Loader />}
      </Container>
    </Client>
  );
};

export default HomepageClient;
