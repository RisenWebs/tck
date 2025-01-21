import React from "react";
import StarBg from "../svg/Star"; // Adjust path as needed

interface ClipCardProps {
  thumbnailSrc: string;
  title: string;
  views: string;
  likes: number;
  dislikes: number;
  avatarSrc: string;
  username: string;
  position: number;
}

const ClipCard: React.FC<ClipCardProps> = ({
  thumbnailSrc,
  title,
  views,
  likes,
  dislikes,
  avatarSrc,
  username,
  position,
}) => {
  // Renders the position with star backgrounds for top 3
  const renderPosition = (pos: number) => {
    const isTopThree = pos >= 1 && pos <= 3;
    if (isTopThree) {
      return (
        <div className="relative inline-block">
          <StarBg position={pos} />
          <span className="absolute inset-0 right-0.5 flex justify-center items-center text-white text-sm font-semibold">
            {pos}
          </span>
        </div>
      );
    } else {
      // For positions 4+ (append suffix)
      const suffixes: { [key: number]: string } = { 1: "st", 2: "nd", 3: "rd" };
      const lastDigit = pos % 10;
      const lastTwoDigits = pos % 100;

      let suffix = "th";
      if (lastTwoDigits < 11 || lastTwoDigits > 13) {
        suffix = suffixes[lastDigit] || "th";
      }
      return <span>{`${pos}${suffix}`}</span>;
    }
  };

  return (
    <div className="bg-[#161625] rounded-lg shadow-md hover:-translate-y-1 transition-transform hover:cursor-pointer overflow-hidden flex flex-col">
      {/* Thumbnail with fixed aspect ratio (if you have Tailwind’s aspect-ratio plugin) */}
      <div className="relative aspect-w-16 aspect-h-9 w-full">
        <img
          src={thumbnailSrc}
          alt="Slot clip preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and views */}
      <div className="flex-grow p-3">
        <h3 className="text-white text-sm font-semibold line-clamp-1">{title}</h3>
        <span className="text-[#989EAE] text-xs font-medium">{views} Views</span>
      </div>

      {/* Bottom area */}
      <div className="px-3 pb-3">
        <div className="flex space-x-1 text-sm font-semibold">
          {/* Like button */}
          <button className="w-full rounded-l-md bg-[#26263A] bg-gradient-to-b from-[#2EFF691A] to-[#26263A1A] text-[#2EFF69] py-2 flex items-center justify-center gap-1 hover:brightness-90">
            {/* Like Icon */}
            <svg
              width="12"
              height="13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#a)">
                <path
                  d="M10.3 4.6L6.2.6a.4.4 0 0 0-.6 0L.5 4c-.3.3 0 .7.4.7l2.5-.5v5.3c0 .2.1.4.4.4h2.1c.3 0 .5-.2.5-.4V4.8l2.5.5c.4 0 .6-.4.4-.7Z"
                  fill="#2EFF69"
                />
              </g>
              <defs>
                <filter
                  id="a"
                  x="0.4"
                  y="0.5"
                  width="11"
                  height="12"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2634_3575"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2634_3575"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            {likes}
          </button>

          {/* Dislike button */}
          <button className="w-full rounded-r-md bg-[#161624] bg-gradient-to-b from-[#FF51261A] to-[#1616241A] text-[#FF5126] py-2 flex items-center justify-center gap-1 hover:brightness-90">
            {/* Dislike Icon */}
            <svg
              width="12"
              height="13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#b)">
                <path
                  d="M10.3 6.4 6.2 10.4h-.6l-4.1-4c-.3-.3 0-.7.4-.7l2.5.5V.9c0-.2.1-.4.4-.4h2.1c.3 0 .5.2.5.4v5.3l2.5-.5c.4 0 .6.4.4.7Z"
                  fill="#FF5126"
                />
              </g>
              <defs>
                <filter
                  id="b"
                  x="0.4"
                  y="0.5"
                  width="11"
                  height="12"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2634_3578"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2634_3578"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            {dislikes}
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={avatarSrc}
              alt={`${username} avatar`}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="ml-1.5 text-white text-sm font-semibold">
              {username}
            </span>
          </div>
          <div className="text-white text-sm">{renderPosition(position)}</div>
        </div>
      </div>
    </div>
  );
};

export default ClipCard;
