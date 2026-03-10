import React from "react";
import videoFile from "../assets/video/video.mp4";

const Video = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      
      <div className="relative w-[80%] max-w-3xl">
        
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✕
        </button>

        <video
          src={videoFile}
          controls
          autoPlay
          className="w-full rounded-xl"
        />
      </div>

    </div>
  );
};

export default Video;