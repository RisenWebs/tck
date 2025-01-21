import React from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button/Button";
import AffiliateBoxCodeBox from "@/components/AffiliateBoxCodeBox/AffiliateBoxCodeBox";

export interface OfferCardProps {
  brandLogo: string;
  mainText: string;
  subText: string;
  code: string;
  gradientFrom: string;
  gradientTo: string;
  buttonStyle: string; // color/style variant for the "Claim" button
}

const OfferCard: React.FC<OfferCardProps> = ({
  brandLogo,
  mainText,
  subText,
  code,
  gradientFrom,
  gradientTo,
  buttonStyle,
}) => {
  return (
    <div
      className="
        relative
        flex flex-col sm:flex-row
        w-full max-w-3xl
        items-start sm:items-center
        rounded-lg p-5
        bg-[#161625]
        overflow-hidden
      "
    >
      {/* Blurred Gradient Ellipse */}
      <div
        className="
          absolute 
          -left-[120px] 
          -bottom-[70px]
          w-[700px] 
          h-[50px]
          blur-[80px]
          bg-gradient-to-r
        "
        style={{
          backgroundImage: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      />

      {/* Left: Logo, Main Text, Sub Text */}
      <div className="z-10">
        <img src={brandLogo} alt="logo" className="h-6 w-[115px]" />

        <p className="text-white text-sm font-semibold mt-2">{mainText}</p>
        <p className="text-gray-300 text-xs">{subText}</p>
      </div>

      {/* Right: Code + Claim (stack below text on small screens) */}
      <div
        className="
          z-10 w-full sm:w-auto
          flex flex-col sm:flex-row
          items-start sm:items-center
          sm:ml-auto
          space-y-3 sm:space-y-0
          sm:space-x-3
          mt-4 sm:mt-0
        "
      >
        {/* Code box */}
        <div className="w-full h-[45px]">
          <AffiliateBoxCodeBox>{code}</AffiliateBoxCodeBox>
        </div>

        {/* Claim button */}
        <Button
          rightIcon={faAngleRight}
          variant={buttonStyle}
          onClick={() => {
            // handle code or link...
          }}
        >
          Claim
        </Button>
      </div>
    </div>
  );
};

export default OfferCard;
