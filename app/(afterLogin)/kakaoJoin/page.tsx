"use client";
import { useState, FormEventHandler, useEffect } from "react";
import EditTextField from "../editInfo/components/EditTextField";
import { locationStore } from "@/store/locationStore";
import LightButton from "@/components/LightButton";
import ProfileImg from "./components/ProfileImg";
import { useKakaoJoin } from "./api/useKakaoJoin";
export default function KakaoJoinPage() {
  const [imgTarget, setImageTarget] = useState<File | null>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [trainer, setTrainer] = useState<boolean>(false);
  const { location, setLocation } = locationStore();
  const mutation = useKakaoJoin();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (location) {
      const formdata = new FormData();
      formdata.append("address", location);
      formdata.append("role", trainer.toString());
      formdata.append("password", "");
      if (imgTarget) {
        formdata.append("profileImage", imgTarget);
      }
      mutation.mutate(formdata);
    } else {
      alert("주소를 입력하세요");
    }
  };
  useEffect(() => {
    alert("소셜 회원가입 유저는 추가적인 정보를 입력 바랍니다.");
  }, []);
  return (
    <div className="bg-white w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col flex-1  my-5 w-screen px-4 md:w-full"
      >
        <ProfileImg
          selectedImage={selectedImage}
          setImageTarget={setImageTarget}
          setSelectedImage={setSelectedImage}
        />
        <EditTextField
          title="주소"
          placeholder="주소를 입력하세요"
          state={location}
          setState={setLocation}
        />
        <div>
          <input
            type="checkbox"
            id="isTrainer"
            checked={trainer}
            onChange={(e) => setTrainer(e.target.checked)}
          />
          <label htmlFor="isTrainer" className="text-[#323232]">
            트레이너 입니다.
          </label>
        </div>
        <LightButton type="submit">회원가입</LightButton>
      </form>
    </div>
  );
}
