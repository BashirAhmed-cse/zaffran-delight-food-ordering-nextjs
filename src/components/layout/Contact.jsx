"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./about.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    const templateParams = {
      to_name: "Zaffran Delight", // Or dynamically set this if needed
      from_name: formData.name,
      message: `Phone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
    };

    try {
      await emailjs.send(
        "service_ae0upcq", // Replace with your service ID
        "template_h13so9v", // Replace with your template ID
        templateParams,
        "wOcqkpRjU6W9Mvndi" // Replace with your public key
      );
      setSuccessMessage("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
    
      if (error?.text) {
        console.error("Error Text:", error.text);
      }
      if (error?.status) {
        console.error("Status Code:", error.status);
      }
      setError("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      {/* Google Map Section */}
      <motion.div
        className="map-container w-full relative h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d111205.26260101376!2d-98.57558600687582!3d29.423989472457023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x865c596c320eb195%3A0x16bc1ead164dcb99!2s136%20Main%20Plaza%2C%20San%20Antonio%2C%20TX%2078205%2C%20United%20States!3m2!1d29.4238653!2d-98.49318339999999!5e0!3m2!1sen!2sbd!4v1746199475461!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map Location"
        ></iframe>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            className="contact-form w-full bg-[#1A1814] rounded-lg p-6"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-medium text-[#cda45e] mb-4">
              Contact Us
            </h3>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-100">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#cda45e]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-100">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#cda45e]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-100">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#cda45e]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-100">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#cda45e]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#cda45e] text-white font-semibold rounded-md focus:outline-none hover:bg-[#b28f4b]"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="contact-details w-full bg-[#1A1814] rounded-lg p-6"
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium text-[#cda45e]">Our Address</h3>
            <p className="mt-1 text-gray-100 text-lg lowercase">
              136 MAIN PLAZA, SAN ANTONIO, TX 78205
            </p>

            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-[#cda45e]">Hours</h3>
              <p className="mt-1 text-gray-100">Sunday - Saturday: 11am - 10pm</p>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-[#cda45e]">Contact</h3>
              <p className="mt-1 text-gray-100">Email: zaffrandelight@gmail.com</p>
              <p className="mt-1 text-gray-100">Phone: +1 210-888-1235</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
