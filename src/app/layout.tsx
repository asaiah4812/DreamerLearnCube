import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RecoidContextProvider from "@/providers/recoilContextProvider";
import Web3ContextProvider from "@/providers/web3ReactProvider";
import Navbar from "@/components/navbar";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamerKahoot",
  description: "Generated by DreamerWebdev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <RecoidContextProvider>
          <Web3ContextProvider>
          <main className="min-h-screen"
           style={{ backgroundImage: `url('/bg.svg')`, backgroundPosition:'center', backgroundSize: 'cover' }}
          >
          <Navbar/>
          {children}
        </main>
          </Web3ContextProvider>
        </RecoidContextProvider>
      </body>
    </html>
  );
}
