import Modal from "./components/modal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ToasterProvider } from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb website cloned by Bui Ngoc",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
