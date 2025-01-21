import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import ClipCard from "@/components/Clips/ClipCard";
import ClipRewardCard, { Style } from "@/components/Clips/ClipRewardCard";
import ClipsBgTile from "@/images/clips/square_bg_tile.png";

// ----- STEP DATA & COMPONENTS -----
const stepsData = [
  {
    stepNumber: "01",
    title: "Use Our Codes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    stepNumber: "02",
    title: "Win a Bonus",
    description:
      "Test your luck on the featured sites, win and submit your clips to win even more!",
  },
  {
    stepNumber: "03",
    title: "Submit Clips",
    description:
      "Submit your clips and get rewarded! The clip from each platform with the biggest upvotes wins.",
  },
];

function StepCard({ stepNumber, title, description }) {
  return (
    <div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#989EAE] italic font-bold">STEP</span>
        <span className="text-sm font-bold text-white italic">{stepNumber}</span>
      </div>
      <hr className="my-2 border-[#1c2230]" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-[13px] text-[#989EAE] flex-grow font-medium">{description}</p>
      <div className="mt-4 h-16 w-full rounded bg-[#100F1C] self-end" />
    </div>
  );
}

function ParticipateCard() {
  return (
    <div className="md:col-span-2 flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm uppercase text-gray-400">PARTICIPATE</span>
      </div>
      <hr className="my-2 border-[#1c2230]" />
      <div className="mt-5 flex-grow">
        <label htmlFor="clipLink" className="mb-2 block text-sm font-medium">
          Clip Link
        </label>
        <input
          id="clipLink"
          type="text"
          placeholder="Clip Link..."
          className="mb-4 w-full rounded-md bg-[#100F1C] px-3 py-2 text-sm text-[#989E]/50 focus:border-blue-500 focus:outline-none"
        />
        <button className="w-full rounded-md bg-gradient-to-r from-[#18A9FF] to-[#7E06FF] px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90">
          Submit Clip
        </button>
      </div>
      <p className="mt-auto text-xs text-gray-400">
        Terms and Conditions apply. Strictly for 18+ users.
      </p>
    </div>
  );
}

// ----- SOCIAL PLATFORM DATA & COMPONENT -----
function SocialClipsSection({
  name,
  link,
  style,
  icon,
  iconColor,
  isCustomIcon = false,
}) {
  return (
    <>
      <div className="flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto px-4">
        {/* Section Title with Icon */}
        <div className="relative px-3 flex items-center">
          <img
            src={ClipsBgTile.src}
            alt={name}
            className="w-[48px] h-[30px] absolute inset-0"
          />
          {isCustomIcon ? (
            // Custom 'Twitter/X' Icon
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative"
            >
              <path
                d="M11.8072 0.667236H14.0964L9.09639 6.18501L15 13.6672H10.3614L6.74699 9.13168L2.59036 13.6672H0.301205L5.66265 7.7739L0 0.667236H4.75904L8.04217 4.82724L11.8072 0.667236ZM10.994 12.3383H12.259L4.06627 1.90946H2.68072L10.994 12.3383Z"
                fill={iconColor}
              />
            </svg>
          ) : (
            <FontAwesomeIcon
              icon={icon}
              className="w-[19px] h-[20px] brightness-125 relative"
              style={{ color: iconColor }}
            />
          )}
          <span className="ml-2 text-white font-medium italic z-[5]">
            {name.toUpperCase()}
          </span>
        </div>
        <Link
          href={link}
          className="flex items-center bg-[#26263A] px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90"
        >
          View All
        </Link>
      </div>

      {/* Clip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 max-w-[1200px] mx-auto px-4">
        {/* Prize Card */}
        <ClipRewardCard prizeAmount="$250" style={style} />

        {/* Example Clip Cards */}
        <ClipCard
          thumbnailSrc="https://i.imghippo.com/files/hiL8856NtE.png"
          title="Another Clip Title"
          views="15K"
          likes={123}
          dislikes={45}
          avatarSrc="https://i.imghippo.com/files/tBC8677YLs.png"
          username="LiveTCK"
          position={1}
        />
        <ClipCard
          thumbnailSrc="https://i.imghippo.com/files/hiL8856NtE.png"
          title="Another Clip Title"
          views="15K"
          likes={123}
          dislikes={45}
          avatarSrc="https://i.imghippo.com/files/tBC8677YLs.png"
          username="LiveTCK"
          position={2}
        />
        <ClipCard
          thumbnailSrc="https://i.imghippo.com/files/hiL8856NtE.png"
          title="Another Clip Title"
          views="15K"
          likes={123}
          dislikes={45}
          avatarSrc="https://i.imghippo.com/files/tBC8677YLs.png"
          username="LiveTCK"
          position={3}
        />
      </div>
    </>
  );
}

export default function Clips() {
  return (
    <Layout title="Clips">
      <PageHeader title="Video Clips" />

      {/* ----- Steps + Participation ----- */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5 max-w-[1200px] mx-auto px-4">
        {stepsData.map((step) => (
          <StepCard
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
          />
        ))}
        <ParticipateCard />
      </div>

      {/* ----- YOUTUBE ----- */}
      <SocialClipsSection
        name="YouTube"
        link="/clips/youtube"
        style={Style.YouTube}
        icon={faYoutube}
        iconColor="#F81E1E"
      />

      {/* ----- TIKTOK ----- */}
      <SocialClipsSection
        name="TikTok"
        link="/clips/tiktok"
        style={Style.TikTok}
        icon={faTiktok}
        iconColor="#FF1F64"
      />

      {/* ----- INSTAGRAM ----- */}
      <SocialClipsSection
        name="Instagram"
        link="/clips/instagram"
        style={Style.Instagram}
        icon={faInstagram}
        iconColor="#ffffff"
      />

      {/* ----- TWITTER / X (custom icon) ----- */}
      <SocialClipsSection
        name="Twitter"
        link="/clips/twitter"
        style={Style.X}
        iconColor="#ffffff"
        isCustomIcon
      />
    </Layout>
  );
}
