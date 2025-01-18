import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import ClipCard from "@/components/Clips/ClipCard";
import { Style } from "@/components/Clips/ClipRewardCard";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInstagram,
	faTiktok,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const TwitterIcon = () => (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8072 0.667236H14.0964L9.09639 6.18501L15 13.6672H10.3614L6.74699 9.13168L2.59036 13.6672H0.301205L5.66265 7.7739L0 0.667236H4.75904L8.04217 4.82724L11.8072 0.667236ZM10.994 12.3383H12.259L4.06627 1.90946H2.68072L10.994 12.3383Z" fill="#FFFFFf"/>
    </svg>
  );

export enum Platform {
	YouTube = "youtube",
	TikTok = "tiktok",
	Twitter = "twitter",
	Instagram = "instagram",
}

const platformIcons = {
	[Platform.YouTube]: faYoutube,
	[Platform.TikTok]: faTiktok,
	[Platform.Twitter]: TwitterIcon(),
	[Platform.Instagram]: faInstagram,
};

function ClipsPlatform() {
	const router = useRouter();
	const { platform } = router.query;

	if (
		!platform ||
		typeof platform !== "string" ||
		!Object.values(Platform).includes(platform as Platform)
	) {
		return null; // Return null while redirecting
	}

	const platformIcon = platformIcons[platform as Platform];

	let clips = Array.from({ length: 20 }).map((_, index) => ({
		thumbnailSrc: "https://i.imghippo.com/files/hiL8856NtE.png",
		title: `Clip Title ${index + 1}`,
		views: `${(index + 1) * 1000} views`,
		likes: index * 10 + 1,
		dislikes: index * 2 + 1,
		avatarSrc: "https://i.imghippo.com/files/tBC8677YLs.png",
		username: `User${index + 1}`,
		position: index + 1,
	}));

	clips.sort((a, b) => b.likes - a.likes);

	clips = clips.map((clip, index) => ({
		...clip,
		position: index + 1,
	}));

	return (
		<Layout title="Clips">
			<div className="flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto">
				<div className="flex">
					<Link href={"/clips"} className="flex items-center bg-[#26263A] px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90">
						Back
					</Link>
					<div className="relative px-3 flex items-center justify-center ml-1">
						<FontAwesomeIcon
							icon={platformIcon}
							className="w-[19px] h-[20px] text-white brightness-125 relative"
						/>
						<span className="ml-2 text-white font-semibold italic z-[5]">
							{Object.keys(Platform).find(
								(key) => Platform[key as Platform] === platform,
							)}
						</span>
					</div>
				</div>
				<button className="my-2.5 text-sm font-medium transition-opacity text-[#989EAE] hover:opacity-90 flex items-center gap-1.5">
                    <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#a)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Zm2.7-7.1L6.3 2.5a.4.4 0 0 0-.6 0L3.3 4.9c-.3.2 0 .7.3.7h1.5v3.2a.9.9 0 0 0 1.8 0V5.6h1.5c.4 0 .6-.5.3-.7Z" fill="#989EAE"/>
                        </g>
                        <defs>
                            <clipPath id="a">
                            <path fill="#fff" d="M0 0h12v12H0z"/>
                            </clipPath>
                        </defs>
                    </svg>
					Upload your clips
				</button>
			</div>

			<div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto">
				{clips.map((clip, index) => (
					<ClipCard
						key={index}
						thumbnailSrc={clip.thumbnailSrc}
						title={clip.title}
						views={clip.views}
						likes={clip.likes}
						dislikes={clip.dislikes}
						avatarSrc={clip.avatarSrc}
						username={clip.username}
						position={clip.position}
					/>
				))}
			</div>
		</Layout>
	);
}

export default ClipsPlatform;
