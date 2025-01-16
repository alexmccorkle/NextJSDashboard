"use client";

import React, { useState } from "react";

interface FlagSelectorProps {
  initialFlag?: string | null;
  analysisId: number;
  isAdmin: boolean;
}

const FlagSelector: React.FC<FlagSelectorProps> = ({
  initialFlag,
  analysisId,
  isAdmin,
}) => {
  const [selectedType, setSelectedType] = useState<string>(
    initialFlag || "default"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFlag = async (value: string) => {
    if (!isAdmin) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/analyze/flag`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          analysisId,
          flag: value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update flag");
      }

      setSelectedType(value);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error updating flag: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="flex space-x-4">
        <div className="text-sm font-medium text-gray-700"></div>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name={`flag-${analysisId}`}
              value="human"
              checked={selectedType === "human"}
              onChange={(e) => updateFlag(e.target.value)}
              className="appearance-none h-4 w-4 border border-gray-300 rounded-none checked:bg-teal-600 checked:border-white focus:outline-1 
              focus:ring-teal-500 focus:ring-offset-2"
            />
            <span className="ml-2 text-sm text-gray-300">Human</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name={`flag-${analysisId}`}
              value="ai"
              checked={selectedType === "ai"}
              onChange={(e) => updateFlag(e.target.value)}
              className="appearance-none h-4 w-4 border border-gray-300 rounded-none checked:bg-red-600 checked:border-white focus:outline-1 
              focus:ring-teal-500 focus:ring-offset-2"
            />
            <span className="ml-2 text-sm text-gray-300">Definitely AI! </span>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {isLoading && <p className="text-gray-500 text-sm">Loading...</p>}
      </div>
    );
  }
};

export default FlagSelector;
