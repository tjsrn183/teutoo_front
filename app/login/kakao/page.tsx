"use client";
import { sendRequest } from "@/app/api/rootApi";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";
import Looading from "@/components/Loading";

export default function Kakao() {
  const router = useRouter();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    const fetchToken = async () => {
      if (code) {
        let token = await axios.get(
          `http://43.201.184.37/login/kakao?code=${code}`,
        );

        setCookie("token", token.data.token);
        router.replace("/");
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
