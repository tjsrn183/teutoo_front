"use client";

import Carousel from "@/components/common/carousel";

export default function CardCarousel(): JSX.Element {
  return (
    <Carousel
      className="py-4"
      opts={{
        align: "center",
        containScroll: false,
      }}
    >
      <Carousel.Content className="p-2">
        {Array.from({
          length: 10,
        }).map((_, index) => (
          <Carousel.Item key={index}>
            <div className="w-full aspect-[3/2] bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center text-5xl text-white drop-shadow-md">
              Card {index + 1}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Dots />
    </Carousel>
  );
}
