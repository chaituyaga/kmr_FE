import { Inter } from "next/font/google";
import "./globals.css";
import MuiAppBar from "./componenets/MuiAppBar";
import Providers from "./services/redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KMR Rice",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiAppBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
