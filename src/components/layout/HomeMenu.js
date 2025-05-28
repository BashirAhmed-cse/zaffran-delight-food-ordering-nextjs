'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section
      id="specials"
      className="relative py-16 bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/images/about-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Our Specials" subtitle="Order your favorite" />

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {bestSellers?.length > 0 && bestSellers.map(item => (
            <div
              key={item._id}
              className=""
            >
              <MenuItem {...item} />
              
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
