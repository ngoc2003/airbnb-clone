"use client";

import { useCountries } from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../button/HeartButton";
import Button from "../button";
import { AiFillStar } from "react-icons/ai";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) => {
  const router = useRouter();

  const { getByValue } = useCountries();

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const location = getByValue(data.locationValue);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group text-sm"
    >
      <div className="flex flex-col gap-1 w-full ">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="listings"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 gap-2">
          <div className="font-semibold">
            {location?.region}, {location?.label}
          </div>
          <div className="flex items-center">
            <AiFillStar />
            <span className="ml-0.5">5</span>
          </div>
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
