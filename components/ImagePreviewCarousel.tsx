"use client";
import Carousel, { CarouselApi } from "@/components/common/carousel";
import React, { useEffect, useState } from "react";

interface ImagePreviewCarouselProps {
  images: string[];
}

export default function ImagePreviewCarousel({
  images,
}: ImagePreviewCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="w-full">
      <Carousel.Content className="">
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="w-full">
              <img src={image} className="w-full" />
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <div className="absolute right-4 bottom-4 px-2 py-1 rounded-full text-sm text-white bg-neutral-900/40">
        {current}
        <span className="text-neutral-700"> / {count}</span>
      </div>
    </Carousel>
  );
}
