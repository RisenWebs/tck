import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import ReactGA from "react-ga4";
import { Notifications } from "@mantine/notifications";

import ReAuth from "@/components/ReAuth";
import BanBanner from "@/components/BanBanner/BanBanner";
import AgeVerification from "@/components/AgeVerification/AgeVerification";
import TheProviderProvider from "@/components/TheProviderProvider";
import ModalProfile from "@/components/profile/ModalProfile/ModalProfile";
import axios from "axios";

import IAmLiveImage from "@/images/iamlive.png";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
	const [isLive, setIsLive] = useState(false);
	const [showLiveModal, setShowLiveModal] = useState(true);

	useEffect(() => {
		const fetchLiveStatus = async () => {
			const response = await axios.get(
				`https://kick.com/api/v2/channels/tck/livestream`,
				{
					headers: {
						"x-kick-auth": process.env.KICK_AUTH,
					},
					validateStatus: () => {
						return true;
					},
				},
			);
			const data = response.data;
			setIsLive(!!data.data);
		};

		fetchLiveStatus();

		if (process.env.NODE_ENV === "production") {
			ReactGA.initialize("G-Q3TE3P2QCN");
			ReactGA.send({
				hitType: "pageview",
				page: window.location.pathname,
			});
		}
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<TheProviderProvider>
				<AgeVerification />
				<BanBanner />
				<ModalProfile />
				<ReAuth>
					<Component {...pageProps} />
				</ReAuth>
			</TheProviderProvider>
			<Notifications />

			{/* IF the channel is live AND showLiveModal is true, show the player widget. */}
			{isLive && showLiveModal && (
				<div className="fixed bottom-[80px] right-[30px] z-[9999]">
					<div
						className="w-[230px] h-[150px] bg-cover relative"
						style={{
							backgroundImage: `url(${IAmLiveImage.src})`,
						}}
					>
						{/* 
              Small “Close” button in top-right 
              (just a small square with an X).
            */}
						<div
							className="absolute top-2 right-2 w-6 h-6
                          flex items-center justify-center
                          bg-gray-700 text-white
                          rounded cursor-pointer
                          hover:bg-gray-500"
							onClick={() => setShowLiveModal(false)}
						>
							X
						</div>
					</div>
					<iframe
						src={`https://player.kick.com/tck`}
						allowFullScreen={true}
						style={{
							overflow: "hidden",
							border: 0,
						}}
						scrolling="no"
						className="w-[230px] h-[130px] mt-0 absolute top-[70px] rounded-lg"
					/>
				</div>
			)}

			{/* IF the channel is live AND showLiveModal is false, show the round blue button. */}
			{isLive && !showLiveModal && (
				<div
					onClick={() => setShowLiveModal(true)}
					className="fixed bottom-[20px] right-[30px] w-12 h-12
                     bg-blue-500 z-[9999] 
                     rounded-full cursor-pointer"
				>
					{/* Empty inside, just a colored circle */}
				</div>
			)}
		</>
	);
}

export default App;
