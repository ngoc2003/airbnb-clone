import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ToasterProvider } from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeUser } from "./types";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb website cloned by Bui Ngoc",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = (await getCurrentUser()) as unknown as SafeUser;

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
