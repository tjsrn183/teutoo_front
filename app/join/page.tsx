"use client";
import JoinForm from "./components/JoinForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodJoinSchema } from "./zodJoinSchema";
import { JoinFormData } from "./components/JoinForm";
import { useState } from "react";
import { useSignup } from "./api/useSignup";
import ButtonBundle from "./components/ButtonBundle";
import { locationStore } from "@/store/locationStore";

export default function Join() {
  const mutation = useSignup();
  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const { location } = locationStore();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [imgTarget, setImageTarget] = useState<File | null>();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(zodJoinSchema),
  });
  return (
    <div className="flex flex-col bg-white items-center">
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
      <div className=" pb-10" />
    </div>
  );
}
