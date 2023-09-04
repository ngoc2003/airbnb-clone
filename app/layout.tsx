import Modal from "./components/modal";
import Navbar from "./components/navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

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
        <Modal isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
