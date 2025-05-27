import React from "react";
import "./about.css";
import aboutImage from "../../../public/assets/images/about-bg.jpg";
import Image from "next/image";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { motion } from "framer-motion"; // Import motion from framer-motion

const About = () => {
  return (
    <motion.section
      id="about"
      className="about"
      style={{ backgroundImage: 'url("/assets/images/about-bg.jpg")' }}
      initial={{ opacity: 0 }} // Start with 0 opacity
      whileInView={{ opacity: 1 }} // Trigger opacity animation when in view
      transition={{ duration: 1 }} // Transition duration
    >
      <div
        className="w-full max-w-6xl mx-auto flex justify-center md:justify-between px-4 sm:px-6 lg:px-8 py-2"
        data-aos="fade-up"
      >
        <div className="flex flex-wrap">
          {/* Left side with image */}
          <motion.div
            className="lg:w-1/2 order-1 lg:order-2 p-4"
            data-aos="zoom-in"
            data-aos-delay="100"
            initial={{ x: -100, opacity: 0 }} // Start with left offset and hidden
            whileInView={{ x: 0, opacity: 1 }} // Animate to default position and visible when in view
            transition={{ duration: 1 }} // Transition duration
          >
            <div className="about-img">
              <Image src={aboutImage} alt="about image" />
            </div>
          </motion.div>

          {/* Right side with text */}
          <motion.div
            className="lg:w-1/2 pt-4 lg:pt-0 order-2 lg:order-1 content"
            initial={{ x: 100, opacity: 0 }} // Start with right offset and hidden
            whileInView={{ x: 0, opacity: 1 }} // Animate to default position and visible when in view
            transition={{ duration: 1 }} // Transition duration
          >
            <h3 className="text-xl font-semibold">
            Welcome to Zaffran Delight – We Serve HALAL food
            </h3>
            <p className="italic mt-4">
            At Zaffran Delight, we bring the heart of Indian cuisine to your plate. Our passion lies in crafting dishes that celebrate the rich heritage, bold spices, and diverse flavors of India. From slow-cooked curries and aromatic biryanis to sizzling tandoori favorites, every dish is a tribute to time-honored recipes passed down through generations.
            </p>
            <ul className="list-none pl-0 mt-4">
              {[
                "We believe food is not just about taste—it’s about experience.",
                "Fine & Halal Cuisine.",
                "Zaffran Delight promises a dining experience that’s flavorful. ",
              ].map((text, index) => (
                <motion.li
                  key={index}
                  className="pb-2 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }} // Trigger opacity animation when in view
                  transition={{ delay: index * 0.2, duration: 1 }} // Delay each list item
                >
                  <IoIosCheckmarkCircleOutline className="text-[#cda45e]" size={24} />
                  {text}
                </motion.li>
              ))}
            </ul>

            
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
