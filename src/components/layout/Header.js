"use client";

import React, { useState, useEffect, useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Link from "next/link";
import Nav from "./Nav";
import "./header.css";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <div className="flex gap-4 items-center">
        <Link href="/profile" className="text-white text-sm font-medium whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white text-sm px-4 py-2 hover:bg-opacity-80 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex gap-4 items-center">
        <Link href="/login" className="bg-primary rounded-full text-white text-sm px-4 py-2 hover:bg-opacity-80 transition">
          Sign in
        </Link>
        {/* <Link
          href="/register"
          className="bg-primary rounded-full text-white text-sm px-4 py-2 hover:bg-opacity-80 transition"
        >
          Register
        </Link> */}
      </div>
    );
  }

  return null;
}

const Header = () => {
  const { data: session, status } = useSession();
  const userData = session?.user;
  const { cartProducts } = useContext(CartContext);

  let userName = userData?.name || userData?.email || "";
  if (userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scroll > 100 ? "backdrop-blur-lg bg-black/70 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl">
          Zaffran Delight
        </Link>

        {/* Navigation */}
        <Nav />

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <AuthLinks status={status} userName={userName} />

          <Link href="/cart" className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
