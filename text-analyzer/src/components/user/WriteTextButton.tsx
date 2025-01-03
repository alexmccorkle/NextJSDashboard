"use client";

import React from "react";
import { useSession } from "next-auth/react";

interface WriteTextButtonProps {
  onClick: () => void;
}

const WriteTextButton: React.FC<WriteTextButtonProps> = ({ onClick }) => {
  const currentUser = useSession().data?.user;
  return (
    <div>
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
              text-sm font-bold rounded-md text-white bg-teal-600 hover:bg-teal-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={onClick}
      >
        Write Text
      </button>
    </div>
  );
};

export default WriteTextButton;
