import React from "react";
import { FaCopy } from "react-icons/fa6";
import { toast } from "sonner";

const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);

  toast.success("Copied to clipboard");
};

const Thread = ({ thread }) => {
  return (
    <div className="border-2 border-white rounded-lg p-2">
      <p className="text-white text-xl">{thread}</p>;
      <FaCopy
        onClick={() => copyToClipboard(thread)}
        className="text-2xl text-white cursor-pointer float-end mt-6"
      />
    </div>
  );
};

export default Thread;
