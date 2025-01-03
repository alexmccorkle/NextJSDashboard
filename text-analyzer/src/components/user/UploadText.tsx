"use client";

import React, { useState } from "react";

const UploadText: React.FC = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        setFileContent(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      {fileContent && (
        <div>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadText;
