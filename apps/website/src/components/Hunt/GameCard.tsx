import React from "react";

interface GameCardProps {
  thumbnailSrc: string;
  altText: string;
  title: string;
  subtitle: string;
  label: string;
  value: string;
}

const GameCard: React.FC<GameCardProps> = ({
  thumbnailSrc,
  altText,
  title,
  subtitle,
  label,
  value,
}) => {
  return (
    <div className="flex items-end justify-between bg-[#161625] p-2 rounded-lg w-full">
      {/* Thumbnail Image */}
      <img
        src={thumbnailSrc}
        alt={altText}
        className="w-[100px] h-[100px] object-cover rounded-md flex-shrink-0"
      />

      {/* Text & Pill Container */}
      <div className="ml-4 flex flex-col justify-between w-full">
        {/* Title & Subtitle */}
        <div className="mb-2">
          <span className="text-white text-lg font-semibold block">{title}</span>
          <span className="text-[#989EAE] text-sm block">{subtitle}</span>
        </div>

        {/* Responsive Pill Container */}
        <div className="relative w-full max-w-[260px] aspect-[260/35] my-2">
          {/* Responsive SVG (fills the container) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 260 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#a)">
              <path
                d="M35 1 7 3c-4 0-7 3-7 7v26c0 1 1 4 3 4l11 1h8l8-1h33l9 1h84l11-2h13l13 1h33l27-2c4 0 7-3 7-7V5a3 3 0 0 0-3-4h-22l-7 1h-1l-15-1-15-1h-42l-51 1-8 1H83L67 1H35Z"
                fill="#26263A"
              />
            </g>
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="260"
                height="40"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                <feBlend
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2983_16717"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2983_16717"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.03 0" />
                <feBlend in2="shape" result="effect2_innerShadow_2983_16717" />
              </filter>
            </defs>
          </svg>

          {/* Text on top of SVG */}
          <div className="relative z-10 w-full h-full flex items-center justify-between px-2">
            <span className="text-[#989EAE] text-xs font-medium">{label}</span>
            <span className="text-white font-semibold">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
