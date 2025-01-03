import React, { useState } from "react";
import { useSession } from "next-auth/react";
import TextAnalyzer from "../TextAnalyzer";
import UploadTextButton from "./UploadTextButton";
import UploadText from "./UploadText";
import WriteTextButton from "./WriteTextButton";

const UserDashboard = () => {
  const currentUser = useSession().data?.user;
  const [showUploadText, setShowUploadText] = useState(false);
  const [showTextAnalyzer, setShowTextAnalyzer] = useState(false);

  const handleWriteTextClick = () => {
    setShowTextAnalyzer((prevState) => !prevState);
    setShowUploadText(false);
  };

  const handleUploadTextClick = () => {
    setShowUploadText((prevState) => !prevState);
    setShowTextAnalyzer(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold">User Dashboard</h1>
      <p className="my-4">Welcome, {currentUser?.name} !</p>
      <p className="my-4">
        Would you like to write or upload text to be analysed?
      </p>
      <div className="flex space-x-4">
        <WriteTextButton onClick={handleWriteTextClick} />
        <UploadTextButton onClick={handleUploadTextClick} />
      </div>
      {showTextAnalyzer && <TextAnalyzer />}
      {showUploadText && <UploadText />}
    </div>
  );
};
export default UserDashboard;
