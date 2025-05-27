"use client";
import React, { useState, useEffect, useContext } from "react";
// import {CartContext} from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import "./header.css";
import Link from "next/link";
import AppBtn from "./AppBtn";
import Nav from "./Nav";

const Header = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      id="header"
      className={`flex items-center fixed w-full  z-50 transition-all duration-300 ${
        scroll > 100 ? "header-scrolled" : ""
      }`}
    >
      <div className="w-full max-w-6xl mx-auto flex justify-center md:justify-between px-4 sm:px-6 lg:px-8 py-2">
         <h1 className="logo me-auto me-lg-0">
            <a href="/">Zaffran Delight</a>
         </h1>
          <Nav/>
        
         <div className="flex gap-8 items-center">
           <AppBtn name="Login"/>
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
         
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
       
          </span>
         
          </Link>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
