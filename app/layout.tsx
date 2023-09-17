import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ToasterProvider } from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeUser } from "./types";
import RentModal from "./components/modal/RentModal";
import SearchModal from "./components/modal/SearchModal";
import Client from "./components/client/Client";
import Head from "next/head";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb website cloned by Bui Ngoc",
  icons: {
    icon: "/icon.png",
  },
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
      <Head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" sizes="any" />
        <link rel="image_src" href="/images/logo.png" sizes="any" />
      </Head>
      <body className={font.className}>
        <Client>
          <ToasterProvider />
          <RegisterModal />
          <SearchModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div>
        </Client>
      </body>
    </html>
  );
}
