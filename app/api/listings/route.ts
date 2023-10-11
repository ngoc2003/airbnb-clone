import { NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingList from "@/app/actions/getListingList";

function parseURL(url: string) {
  const queryString = url.split("?")[1];
  if (!queryString) {
    return {};
  }

  return queryString.split("&").reduce((params: any, param) => {
    const [key, value] = param.split("=");
    params[key] = decodeURIComponent(value.replace(/\+/g, " "));
    return params;
  }, {});
}

export async function GET(req: Request) {
  const data = await getListingList(parseURL(req.url));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await req.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await client.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
