"use client";

import React, { useState } from "react";
import AnalysisResults from "./AnalysisResults";

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface AnalysisModalProps {
  text: string;
  createdAt: string;
  user?: User;
  wordCount?: number;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  text,
  createdAt,
  user,
  wordCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-teal-500 text-white px-4 py-2 rounded-lg 
          hover:bg-teal-600 disabled:bg-teal-950
          disabled:cursor-not-allowed transition-colors"
      >
        View Text
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">
                Analysis from {new Date(createdAt).toLocaleString()}
              </h2>
              <h2 className="text-lg font-semibold">
                {user ? `User: ${user.name || user.email}` : "Anonymous"}
              </h2>
              <h2>
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="mt-4">
            <div className="max-h-96 overflow-y-auto">
              <p className="text-sm whitespace-pre-wrap">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
