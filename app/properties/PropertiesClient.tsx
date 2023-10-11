"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SafeListing, SafeUser } from "../types";
import Heading from "../components/heading";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/container";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Client from "../components/client/Client";
import EmptyState from "../components/EmptyState";
import { useInfinityScroll } from "../hooks/useInfinityScroll";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  params: {
    userId: string;
  };
}

const PropertiesClient = ({ currentUser, params }: PropertiesClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");
  const [offset, setOffset] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const [listingList, setListingList] = useState<SafeListing[]>([]);

  const { scrollRef, isFetching } = useInfinityScroll(canScroll);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const handleFetchListingList = useCallback(() => {
    axios
      .get("/api/listings", {
        params: {
          ...params,
          offset: offset,
        },
      })
      .then((data) => {
        if (data.data.length < 20) {
          setCanScroll(false);
        }

        setListingList((prev) => [...prev, ...data.data]);
      });
  }, [offset, params]);

  useEffect(() => {
    if (canScroll && !isFetching) {
      handleFetchListingList();
    }
  }, [canScroll, handleFetchListingList, isFetching]);

  useEffect(() => {
    if (isFetching && canScroll) {
      setOffset((prev) => prev + 20);
    }
  }, [canScroll, isFetching]);

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
        {listingList.map((item: any) => (
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
    </Container>
  );
};

export default PropertiesClient;
