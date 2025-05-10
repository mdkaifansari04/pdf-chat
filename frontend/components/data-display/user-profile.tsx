"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";

import { CUSTOM_PROFILE_URL } from "@/lib/constant";
import Profile from "../ui/profile";
import { FadeImg } from "../ui/fade-img";

function UserProfile() {
  const { user } = useUser();
  const userProfile = user?.hasImage ? user.imageUrl : CUSTOM_PROFILE_URL;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <FadeImg src={userProfile} alt="User avatar" width={28} height={28} className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg">
        <Profile avatar={userProfile} email={user?.emailAddresses[0].emailAddress ?? "No email"} name={user?.fullName ?? "No name"} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
