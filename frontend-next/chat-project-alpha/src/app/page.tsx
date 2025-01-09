"use client";
import Image from "next/image";
import LoginPage from "./pages/LoginPage";
import { useAppSelector } from "./lib/reduxHooks";
import UserPage from "./userPage/page";
import { jwtDecode } from "jwt-decode";

export default function Home() {
 

  // const tokenData = jwtDecode(authStore?.userData|| '')
  // console.log('tokenData', tokenData);
  // console.log('date', tokenData);


  
  return (

    
    <div>
{/* {authStore.userData ? <UserPage/> : null} */}
 <LoginPage/> 
    
    </div>
  );
}
