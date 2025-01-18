// src/components/ClipRewardCard.tsx
import React from "react";
import ClipsBgDots from "@/images/clips/clips_bg_dots.png";

// Define the available styles
export enum Style {
  X = "x",
  YouTube = "youtube",
  TikTok = "tiktok",
  Instagram = "instagram",
}

// Interface for style configuration
interface StyleConfig {
  prizeGradientFrom: string;
  prizeGradientTo: string;
  buttonBgColor: string;
  uploadButtonTextColor: string;
}

// Mapping styles to their configurations
export const styleConfig: Record<Style, StyleConfig> = {
  [Style.YouTube]: {
    prizeGradientFrom: "#F81E1E", // YouTube red
    prizeGradientTo: "#FF4343",   // Slightly different red
    buttonBgColor: "#26263A",
    uploadButtonTextColor: "#989EAE",
  },
  [Style.TikTok]: {
    prizeGradientFrom: "#FF1F64", // TikTok pink
    prizeGradientTo: "#FF447E",   // TikTok pinkish
    buttonBgColor: "#26263A",
    uploadButtonTextColor: "#989EAE",
  },
  [Style.Instagram]: {
    prizeGradientFrom: "#EB1972", // Instagram pink
    prizeGradientTo: "#7C2EF6",   // Instagram purple
    buttonBgColor: "#26263A",
    uploadButtonTextColor: "#989EAE",
  },
  [Style.X]: {
    prizeGradientFrom: "#A5A5A5", // Twitter gray
    prizeGradientTo: "#FFFFFF",   // White
    buttonBgColor: "#26263A",
    uploadButtonTextColor: "#989EAE",
  },
};

// Interface for component props
interface ClipRewardCardProps {
  prizeAmount: string;
  style: Style;
  onViewClips?: () => void;
  onUploadClip?: () => void;
}

const ClipRewardCard: React.FC<ClipRewardCardProps> = ({
  prizeAmount,
  style,
  onViewClips,
  onUploadClip,
}) => {
  const config = styleConfig[style];

  return (
    <div className="bg-[#161625] rounded-lg px-4 py-8 relative">
      {/* Background Section */}
      <div
        className="text-center bg-cover bg-center py-6 rounded-lg"
        style={{
          backgroundImage: `url(${ClipsBgDots.src})`,
        }}
      >
        {/* Main Text */}
        <h2
          className="text-[74px] font-black bg-clip-text text-transparent leading-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${config.prizeGradientFrom}, ${config.prizeGradientTo})`,
          }}
        >
          {prizeAmount}
        </h2>
        <p className="text-[#989EAE] text-sm font-medium mt-2">
          The clip with the most upvotes and views wins a {prizeAmount} every
          month!
        </p>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full px-4 h-[95px]">
        <hr className="border-[#26263A] mb-3" />
        <button
          className="w-full rounded-md py-2 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: config.buttonBgColor }}
          onClick={onViewClips}
          aria-label="View Clips"
        >
          View Clips
        </button>
        <button
          className="w-full my-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ color: config.uploadButtonTextColor }}
          onClick={onUploadClip}
          aria-label="Upload your clip"
        >
          Upload your clips
        </button>
      </div>
    </div>
  );
};

export default ClipRewardCard;
