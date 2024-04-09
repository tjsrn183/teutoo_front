"use client";
import { sendRequest } from "@/app/api/rootApi";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";
import Looading from "@/components/Loading";
interface User {
  data: {
    memberId: number;
    name: string;
    email: string;
    profileImagePath: string;
    address: string;
  };
}
export default function Kakao() {
  const router = useRouter();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    const fetchToken = async () => {
      if (code) {
        let token = await axios.get(
          `https://api.teutoo.site/login/kakao?code=${code}`,
        );
        setCookie("token", token.data.token);
        const user: User = await sendRequest("members/me", "get");
        if (!user.data.address) {
          router.replace("/kakaoJoin");
        } else {
          router.replace("/");
        }
      }
    };
    fetchToken();
  }, []);
  return (
    <div>
      <Looading />
    </div>
  );
}
