"use client";
import React, { useRef } from "react";
import "./about.css";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { specials } from "@/data/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/SectionTitle";

const Specials = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section
      id="specials"
      className="about"
      style={{ backgroundImage: 'url("/assets/images/about-bg.jpg")' }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle title="Specials" subtitle="Check Our Specials" />

        <div className="flex justify-center md:justify-between">
          <div className="w-full relative">
            <Carousel
              opts={{ align: "start" }}
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {specials.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="bg-[#1a1814]">
                        <CardContent className="flex aspect-square items-center justify-center p-4">
                          <img
                            className="rounded-xl h-74 w-full object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        </CardContent>
                        <div className="text-center p-4">
                          <h3 className="text-lg text-white font-semibold">
                            {item.name}
                          </h3>
                          <p className="text-md text-gray-300">{item.price}</p>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel Controls */}
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-700 z-10">
                <span className="text-2xl">←</span>
              </CarouselPrevious>
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-900 z-10">
                <span className="text-2xl">→</span>
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specials;
