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
  title: "Zaffran Delight",
  description: "FINE  HALAL CUISINE",
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
