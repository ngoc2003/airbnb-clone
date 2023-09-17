import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favoriteIdList = [...(currentUser.favoriteIds || [])];

  favoriteIdList.push(listingId);

  const user = await client.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIdList,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favoriteIdList = [...(currentUser.favoriteIds || [])];

  favoriteIdList = favoriteIdList.filter((id) => id !== listingId);

  const user = await client.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIdList,
    },
  });

  return NextResponse.json(user);
}
