"use client"
import { motion } from 'framer-motion';
import "glightbox/dist/css/glightbox.css";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import GlightboxProvider from "@/components/GlightboxWrapper";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import About from "@/components/layout/About";
import Contact from "@/components/layout/Contact";
import Specials from "@/components/layout/Specials";

export default function Home() {
  return (
    <>
    <GlightboxProvider />
      <Hero />
      <HomeMenu />
      <main id="main">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Specials />
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Menu />
        </motion.div> */}

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
   
        </motion.div> */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Gallery />
        </motion.div> */}

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WhyUs />
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Contact />
        </motion.div>
      </main>
    </>
  )
}
