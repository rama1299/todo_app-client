import React from 'react'
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

function Logout() {
    const router = useRouter();

    function handleLogout() {
        Cookies.remove("token")
        Cookies.remove("id");
        Cookies.remove("username");
        delete axios.defaults.headers.common["Authorization"]; 
        router.push("/");
      }
    

  return (
        <div className="flex items-center ml-3 cursor-pointer" onClick={handleLogout} >
            <div>
                <svg class="h-8 w-8 text-gray-400 hover:text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
            </div>
        </div>
  )
}

export default Logout

  

  
