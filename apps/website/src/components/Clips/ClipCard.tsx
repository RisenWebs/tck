// ClipCard.tsx
import React from 'react';
import StarBg from '../svg/Star'; // Ensure this path is correct based on your project structure

interface ClipCardProps {
  thumbnailSrc: string;
  title: string;
  views: string;
  likes: number;
  dislikes: number;
  avatarSrc: string;
  username: string;
  position: number; // Renamed from commentCount to position
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
  // Function to render position
  const renderPosition = (pos: number) => {
    const isTopThree = pos >= 1 && pos <= 3;

    if (isTopThree) {
      return (
        <div className="relative inline-block">
          <StarBg position={pos} /> {/* SVG background for positions 1-3 */}
          <span className="absolute inset-0 right-0.5 flex justify-center items-center text-white text-sm font-semibold">
            {pos}
          </span>
        </div>
      );
    } else {
      // For positions 4 and above, append the appropriate suffix
      const suffixes: { [key: number]: string } = {
        1: 'st',
        2: 'nd',
        3: 'rd',
      };
      const lastDigit = pos % 10;
      const lastTwoDigits = pos % 100;

      let suffix = 'th';
      if (lastTwoDigits < 11 || lastTwoDigits > 13) {
        suffix = suffixes[lastDigit] || 'th';
      }

      return <span>{`${pos}${suffix}`}</span>;
    }
  };

  return (
    <div className="bg-[#161625] rounded-lg px-4 py-3 relative hover:-translate-y-1 transition-transform">
      {/* Thumbnail */}
      <div className="w-full rounded-md overflow-hidden">
        <img
          src={thumbnailSrc}
          alt="Slot clip preview"
          className="w-full object-cover"
        />
      </div>

      {/* Title and Views */}
      <h3 className="text-white text-md font-semibold truncate mt-2">
        {title}
      </h3>

      <span className="text-[#989EAE] text-sm font-medium mt-1">
        {views} Views
      </span>

      <div className="absolute bottom-0 left-0 w-full px-4 h-[95px] bg-[#03030B54] outline-t-[1px] outline-black">
        <div className="flex justify-center items-center mt-3 text-sm font-semibold">
          <button className="w-full rounded-l-md bg-[#26263A]  bg-gradient-to-b from-[#2EFF691A] to-[#26263A1A] text-[#2EFF69] py-2 transition-opacity hover:brightness-90 flex items-center justify-center gap-1">
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
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
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
          <button 
            className="w-full rounded-r-md bg-[#161624] bg-gradient-to-b from-[#FF51261A] to-[#1616241A] text-[#FF5126] py-2 transition-opacity hover:brightness-90 flex items-center justify-center gap-1"
          >
            {/* Dislike Icon */}
            <svg
              width="12"
              height="13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#b)">
                <path
                  d="M10.3 6.4L6.2 10.4h-0.6L1.5 6.4c-0.3-0.3 0-0.7 0.4-0.7l2.5.5V0.9c0-0.2 0.1-0.4 0.4-0.4h2.1c0.3 0 0.5 0.2 0.5 0.4v5.3l2.5-0.5c0.4 0 0.6 0.4 0.4 0.7Z"
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
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
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
        <div className="my-2 mt-2.5 flex justify-between h-[25px]">
          <div className="flex items-center">
            <img
              src={avatarSrc}
              alt={`${username} avatar`}
              className="h-[22px] w-[22px] rounded-full"
            />
            <span className="ml-1.5 text-white text-sm font-semibold">
              {username}
            </span>
          </div>

          <div className="text-white text-sm">
            {renderPosition(position)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipCard;
