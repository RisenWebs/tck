import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { faInstagram, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import ClipCard from "@/components/Clips/ClipCard";
import ClipRewardCard, { Style } from "@/components/Clips/ClipRewardCard";

import ClipsBgTile from "@/images/clips/square_bg_tile.png";

export default function Clips() {
	return (
		<Layout title="Clips">
			<PageHeader title="Video Clips" />

			<div className="grid grid-cols-1 gap-3 md:grid-cols-5 max-w-[1200px] mx-auto">
				{/* STEP 01 */}
				<div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md h-full">
					<div className="flex items-center justify-between">
						<span className="text-sm text-[#989EAE] italic font-bold">
							STEP
						</span>
						<span className="text-sm font-bold text-white italic">01</span>
					</div>
					<hr className="my-2 border-[#1c2230]" />
					<h2 className="text-lg font-semibold">Use Our Codes</h2>
					<p className="mt-2 text-[13px] text-[#989EAE] flex-grow font-medium">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<div className="mt-4 h-16 w-full rounded bg-[#100F1C] self-end" />
				</div>

				{/* STEP 02 */}
				<div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md h-full">
					<div className="flex items-center justify-between">
						<span className="text-sm text-[#989EAE] italic font-bold">
							STEP
						</span>
						<span className="text-sm font-bold text-white italic">02</span>
					</div>
					<hr className="my-2 border-[#1c2230]" />
					<h2 className="text-lg font-semibold">Win a Bonus</h2>
					<p className="mt-2 text-[13px] text-[#989EAE] flex-grow font-medium">
						Test your luck on the featured sites, win and submit your clips to
						win even more!
					</p>
					<div className="mt-4 h-16 w-full rounded bg-[#100F1C] self-end" />
				</div>

				{/* STEP 03 */}
				<div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md h-full">
					<div className="flex items-center justify-between">
						<span className="text-sm text-[#989EAE] italic font-bold">
							STEP
						</span>
						<span className="text-sm font-bold text-white italic">03</span>
					</div>
					<hr className="my-2 border-[#1c2230]" />
					<h2 className="text-lg font-semibold">Submit Clips</h2>
					<p className="mt-2 text-[13px] text-[#989EAE] flex-grow font-medium">
						Submit your clips and get rewarded! The clip from each platform with
						the biggest upvotes wins.
					</p>
					<div className="mt-4 h-16 w-full rounded bg-[#100F1C] self-end" />
				</div>

				{/* PARTICIPATE (spans 2 columns) */}
				<div className="md:col-span-2 flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md w-full h-full">
					<div className="flex items-center justify-between">
						<span className="text-sm uppercase text-gray-400">PARTICIPATE</span>
					</div>
					<hr className="my-2 border-[#1c2230]" />

					<div className="mt-5 flex-grow">
						<label
							htmlFor="clipLink"
							className="mb-2 block text-sm font-medium"
						>
							Clip Link
						</label>
						<input
							id="clipLink"
							type="text"
							placeholder="Clip Link..."
							className="mb-4 w-full rounded-md bg-[#100F1C] px-3 py-2 text-sm text-[#989E]/50 focus:border-blue-500 focus:outline-none"
						/>
						<button className="w-full rounded-md bg-gradient-to-r from-[#18A9FF] to-[#7E06FF] px-4 py-2 text-sm font-semibold transition-colors h  over:opacity-90">
							Submit Clip
						</button>
					</div>
					<p className="mt-auto text-xs text-gray-400">
						Terms and Conditions apply. Strictly for 18+ users.
					</p>
				</div>
			</div>

			<div className="flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto">
				<div className="relative px-3 flex items-center">
					<img
            src={ClipsBgTile.src}
            alt="youtube"
						className="w-[48px] h-[30px] absolute inset-0"
					/>
					<FontAwesomeIcon
						icon={faYoutube}
						className="w-[19px] h-[20px] text-[#F81E1E] brightness-125 relative"
					/>
					<span className="ml-2 text-white font-medium italic z-[5]">
						YOUTUBE
					</span>
				</div>
				<Link href={"/clips/youtube"} className="flex items-center bg-[#26263A] px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90">
					View All
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto h-[320px]">
        <ClipRewardCard prizeAmount="$250" style={Style.YouTube} />

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

      <div className="flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto">
				<div className="relative px-3 flex items-center">
					<img
            src={ClipsBgTile.src}
            alt="tiktok"
						className="w-[48px] h-[30px] absolute inset-0"
					/>
					<FontAwesomeIcon
						icon={faTiktok}
						className="w-[19px] h-[20px] text-[#FF1F64] brightness-125 relative"
					/>
					<span className="ml-2 text-white font-medium italic z-[5]">
						TIKTOK
					</span>
				</div>
				<Link href={"/clips/tiktok"} className="flex items-center bg-[#26263A] px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90">
					View All
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto h-[320px]">
        <ClipRewardCard prizeAmount="$250" style={Style.TikTok} />

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

      <div className="flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto">
				<div className="relative px-3 flex items-center">
					<img
            src={ClipsBgTile.src}
            alt="instagram"
						className="w-[48px] h-[30px] absolute inset-0"
					/>
					<FontAwesomeIcon
						icon={faInstagram}
						className="w-[19px] h-[20px] text- brightness-125 relative"
					/>
					<span className="ml-2 text-white font-medium italic z-[5]">
						INSTAGRAM
					</span>
				</div>
				<Link href={"/clips/instagram"} className="flex items-center bg-[#26263A] px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90">
					View All
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto h-[320px]">
        <ClipRewardCard prizeAmount="$250" style={Style.Instagram} />

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

      <div className="flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto">
				<div className="relative px-3 flex items-center">
					<img
            src={ClipsBgTile.src}
            alt="twitter"
						className="w-[48px] h-[30px] absolute inset-0"
					/>

          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.8072 0.667236H14.0964L9.09639 6.18501L15 13.6672H10.3614L6.74699 9.13168L2.59036 13.6672H0.301205L5.66265 7.7739L0 0.667236H4.75904L8.04217 4.82724L11.8072 0.667236ZM10.994 12.3383H12.259L4.06627 1.90946H2.68072L10.994 12.3383Z" fill="#FFFFFf"/>
          </svg>

					<span className="ml-2 text-white font-medium italic z-[5]">
            TWITTER
					</span>
				</div>
				<Link href={"/clips/twitter"} className="flex items-center bg-[#26263A] px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90">
					View All
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto h-[320px]">
        <ClipRewardCard prizeAmount="$250" style={Style.X} />

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
		</Layout>
	);
}
