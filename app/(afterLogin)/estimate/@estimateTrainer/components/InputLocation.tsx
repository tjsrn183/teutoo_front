"use client";
import SearchInput from "@/components/formElement/SearchInput";
import { UserDataType } from "@/app/(afterLogin)/myPage/@trainerMyPage/components/MyInfoChunk";
import { useEffect } from "react";
import { locationChunk } from "../lib/locationChunk";
import { useQueryClient } from "@tanstack/react-query";
import { useUserLocation } from "@/store/useUserLocation";

export default function InputLocation() {
  const queryClient = useQueryClient();
  const { location, setLocation } = useUserLocation();
  const userData: UserDataType | undefined = queryClient.getQueryData([
    "userData",
  ]);

  useEffect(() => {
    if (userData?.data.name) {
      setLocation(locationChunk(userData?.data.address));
    }
  }, []);

  return (
    <div className=" relative w-[60%] ">
      <SearchInput
        placeholder={location || "지역을 입력하세요.."}
        state={location}
        setState={setLocation}
      />
    </div>
  );
}
