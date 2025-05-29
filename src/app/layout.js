import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import TopBar from "@/components/TopBar";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import BackToTopBtn from "@/components/BackToTopBtn";
import Footer from "@/components/Footer";


const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Zaffran Delight | Authentic Halal Indian Cuisine in San Antonio",
  description:
    "Welcome to Zaffran Delight in San Antonio, TX – your destination for fine halal Indian cuisine. Enjoy flavorful curries, sizzling tandoori, and aromatic biryanis made with passion. Order online for pickup or delivery!",
  keywords: [
    "Zaffran Delight",
    "Halal Indian restaurant San Antonio",
    "Indian food delivery San Antonio",
    "best biryani San Antonio",
    "tandoori chicken San Antonio",
    "halal food San Antonio",
    "authentic Indian cuisine",
    "order Indian food online",
    "Indian restaurant near Main Plaza",
    "fine halal dining"
  ],
  icons: {
   icon: "/logo_icon.png"
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      
      <body className="antialiased flex flex-col">
        <TopBar />
        <AppProvider>
          <Toaster />
          <Header />
          <div className="flex-grow pt-[60px]">
            {children}
          </div>
          <BackToTopBtn />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
