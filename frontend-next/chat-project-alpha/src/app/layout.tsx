
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import {SocketContext} from "./lib/context/Socket";
// import { getChats } from "./lib/actions/chats";
// import { useAppDispatch, useAppSelector } from "./lib/reduxHooks";
// import useAuth from "./hooks/useAuth";
import RootComponent from "./lib/components/RootComponent";
import SocketProvider from "./lib/context/Socket";
import StoreProvider from "./StoreProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         {/* <InitColorSchemeScript attribute="class" /> */}
           {/* <ThemeProvider defaultMode='dark' theme={createTheme()}> */}
           <StoreProvider> 
          

      <RootComponent children={children} />
         
         
           </StoreProvider>
           {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
