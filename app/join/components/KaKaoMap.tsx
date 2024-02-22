"use client";
import { useEffect, useRef } from "react";
import LocationInputField from "./LocationInputField";
import Button from "../../../components/Button";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div ref={mapRef} className="w-full flex-1"></div>
      <div className="w-full flex-1 flex flex-col h-full justify-evenly">
        <div>
          <LocationInputField />
        </div>
        <Button>위치 수정하기</Button>
      </div>
    </div>
  );
}
