"use client";
import JoinForm from "./JoinForm";
import ButtonBundle from "./ButtonBundle";
import { useForm } from "react-hook-form";
import { JoinFormData } from "./JoinForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodJoinSchema } from "../zodJoinSchema";
import { locationStore } from "@/store/locationStore";
import { useState } from "react";
import { useSignup } from "../api/useSignup";
export default function JoinComponent() {
  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const { location } = locationStore();
  const [imgTarget, setImageTarget] = useState<File | null>();
  const mutation = useSignup();
  const [selectedImage, setSelectedImage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(zodJoinSchema),
  });
  const onSubmit = (data: JoinFormData) => {
    setClickSubmit(true);
    if (location) {
      const { email, name, password, sortRole } = data;
      const formdata = new FormData();
      formdata.append("address", location);
      formdata.append("email", email);
      formdata.append("name", name);
      formdata.append("password", password);
      formdata.append("sortRole", sortRole.toString());
      if (imgTarget) {
        formdata.append("profileImage", imgTarget);
      }

      mutation.mutate(formdata);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1  my-5 w-screen px-4 md:w-full"
    >
      <JoinForm
        register={register}
        errors={errors}
        location={location}
        clickSubmit={clickSubmit}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setImageTarget={setImageTarget}
      />
      <ButtonBundle />
    </form>
  );
}
