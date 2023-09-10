"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex items-center gap-3 relative">
      <div
        className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        Airbnb your home
      </div>
      <div
        className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        onClick={handleToggleOpen}
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => {
                      console.log("ihihi");
                    }}
                  />
                  <MenuItem
                    label="My favorites"
                    onClick={() => {
                      console.log("ihihi");
                    }}
                  />
                  <MenuItem
                    label="My reservations"
                    onClick={() => {
                      console.log("ihihi");
                    }}
                  />
                  <MenuItem
                    label="My properties"
                    onClick={() => {
                      console.log("ihihi");
                    }}
                  />
                  <MenuItem
                    label="Airbnb my home"
                    onClick={() => {
                      console.log("ihihi");
                    }}
                  />
                  <hr />
                  <MenuItem
                    label="Log out"
                    onClick={() => {
                      signOut();
                    }}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    label="Login"
                    onClick={() => {
                      loginModal.onOpen();
                    }}
                  />
                  <MenuItem
                    label="Register"
                    onClick={() => {
                      registerModal.onOpen();
                    }}
                  />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
