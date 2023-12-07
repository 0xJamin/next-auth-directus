"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button 
      className="bg-indigo-700 px-5 py-2 m-4 text-white rounded-md"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}
