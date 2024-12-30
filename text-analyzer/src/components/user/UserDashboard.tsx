"use client"; // This tells Next.js this component needs to run on the client side

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import TextAnalyzer from "../TextAnalyzer";

const UserDashboard = () => {
  const currentUser = useSession().data?.user;
  return (
    <div>
      <h1>User Dashboard</h1>
      <p className="my-4">Welcome, {currentUser?.name} !</p>
      <TextAnalyzer />
    </div>
  );
};

export default UserDashboard;
