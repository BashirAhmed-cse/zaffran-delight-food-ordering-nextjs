"use client";
import React, { useState, useEffect } from "react";
import GlightboxProvider from "@/components/GlightboxWrapper";
import "./hero.css";
import HeroBtn from "@/components/HeroBtn";

const Hero = () => {
  return (
    <section id="hero" className="flex items-center">
      <GlightboxProvider />
      <div className="w-full max-w-6xl mx-auto flex justify-center md:justify-between px-4 sm:px-6 lg:px-8 py-2">
        <div
          className="mx-auto px-4 py-20 text-center lg:text-left relative z-10"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3">
              <h1 className="text-4xl font-semibold leading-tight mb-4">
                We Serve Halal<span className="text-primary">Food</span>
              </h1>
              
              <div className="flex gap-4">
                <HeroBtn name="Our Menu" target="menu" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center mt-8 lg:mt-0"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <a
            href="https://youtu.be/Cq4CZJO6Myk"
            className="glightbox play-btn"
            data-glightbox="type: external; width: 80%; height: 80%"
          >
            <span className="text-3xl text-white">▶</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
