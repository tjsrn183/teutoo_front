"use client";
import { useEffect, useRef, useState } from "react";
import LocationInputField from "./LocationInputField";
import Button from "../../../components/Button";
import { locationStore } from "@/store/locationStore";
import { useRouter } from "next/navigation";
interface IAddress {
  address_name: string;
  x: string;
  y: string;
}
export default function Map() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [map, setMap] = useState<any>();
  const { location, setLocation } = locationStore();
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      setMap(map);
    });
  }, []);

  const searchAddress = () => {
    if (!map) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: IAddress[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        const coords = new window.kakao.maps.LatLng(y, x);
        const marker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });
        map.setCenter(coords);
      } else {
        alert("주소 검색 결과가 없습니다.");
      }
    });
  };
  const onClickLocation = () => {
    setLocation(address);
    router.back();
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div ref={mapRef} className="w-full flex-1"></div>
      <div className="w-full flex-1 flex flex-col h-full justify-evenly">
        <div>
          <LocationInputField
            setAddress={setAddress}
            searchAddress={searchAddress}
          />
        </div>
        <Button onClick={onClickLocation}>위치 수정하기</Button>
      </div>
    </div>
  );
}
