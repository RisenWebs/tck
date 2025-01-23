import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import GameCard from "@/components/Hunt/GameCard";

export default function HuntTracker() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [prediction, setPrediction] = useState<"yes" | "no">("yes");

	const yesVotes = 104;
	const noVotes = 486;
	const totalVotes = yesVotes + noVotes;
	const yesPercent = ((yesVotes / totalVotes) * 100).toFixed(1) + "%";
	const noPercent = ((noVotes / totalVotes) * 100).toFixed(1) + "%";

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	// Example table data
	const tableData = [
		{
			id: 1,
			slot: "Eye of Cleopatra",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 2,
			slot: "Book of Vikings",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 3,
			slot: "Bounty Gold",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 4,
			slot: "Heart of Rio",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 5,
			slot: "Mysterious Egypt",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 6,
			slot: "Joker King",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 7,
			slot: "Return of the Dead",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 8,
			slot: "Wild Walker",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 9,
			slot: "Vampires vs Wolves",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 10,
			slot: "Break Bones",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 11,
			slot: "Break Bones",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 12,
			slot: "Break Bones",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 13,
			slot: "Break Bones",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
		{
			id: 14,
			slot: "Break Bones",
			provider: "Pragmatic Play",
			bet: "$10",
			multi: "51.00x",
			win: "$800.39",
		},
	];

	const days = [
		{ label: "S", fraction: "6/6", active: true },
		{ label: "F", fraction: "5/6", active: false },
		{ label: "T", fraction: "4/6", active: false },
		{ label: "W", fraction: "3/6", active: false },
		{ label: "T", fraction: "2/6", active: false },
		{ label: "M", fraction: "1/6", active: false },
	];

	return (
		<Layout title="Hunt">
			<PageHeader title="Hunt Tracker" />

			{/* Main container: two columns with full height */}
			<div className="flex flex-col lg:flex-row items-stretch gap-6 px-4 py-8">
				{/* LEFT COLUMN: Split top/bottom each taking half (flex-1) */}
				<div className="w-full lg:w-1/4 flex flex-col gap-4">
					{/* Prediction Card */}
					<div className="flex-1 bg-[#161625] rounded-lg p-4 text-white shadow-md flex flex-col">
						<div className="text-xl font-semibold mb-2">
							Will we make any profit on this Bonus Hunt?
						</div>

						{/* Progress Bar + Time */}
						<div className="flex items-center justify-between">
							<div className="relative flex-1 h-1.5 rounded-full bg-[#03040B54] mr-3">
								<div
									className="absolute h-1 rounded-full bg-gradient-to-r from-[#18A9FF] to-[#9229FF]"
									style={{ width: "70%" }} // example
								/>
							</div>
							<span className="text-sm text-[#989EAE] whitespace-nowrap">
								2h 45m
							</span>
						</div>

						{/* Yes/No Bars */}
						<div className="mt-3 space-y-2">
							{/* Yes row */}
							<div className="relative h-[52px] bg-[#1F1F33A8] rounded flex items-center px-4 overflow-hidden">
								<div
									className="absolute left-0 top-0 h-full bg-[#2D2D49]"
									style={{ width: yesPercent }}
								/>
								<div className="relative z-10 flex flex-col text-sm">
									<span className="font-medium">Yes</span>
									<span className="text-[#989EAE] text-xs">
										{yesVotes} Votes
									</span>
								</div>
							</div>
							{/* No row */}
							<div className="relative h-[52px] bg-[#1F1F33A8] rounded flex items-center px-4 overflow-hidden">
								<div
									className="absolute left-0 top-0 h-full bg-[#2D2D49]"
									style={{ width: noPercent }}
								/>
								<div className="relative z-10 flex flex-col text-sm">
									<span className="font-medium">No</span>
									<span className="text-[#989EAE] text-xs">
										{noVotes} Votes
									</span>
								</div>
							</div>
						</div>

						{/* Avatars + Predict button */}
						<div className="mt-4 flex items-center justify-between">
							<div className="flex -space-x-3">
								<div className="w-8 h-8 rounded-full border-2 border-[#161625] overflow-hidden">
									<img
										className="w-full h-full object-cover"
										src="https://via.placeholder.com/32"
										alt="User1"
									/>
								</div>
								<div className="w-8 h-8 rounded-full border-2 border-[#161625] overflow-hidden">
									<img
										className="w-full h-full object-cover"
										src="https://via.placeholder.com/32"
										alt="User2"
									/>
								</div>
								<div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0B0B1780] text-xs text-[#989EAE]">
									+238
								</div>
							</div>

							<button
								onClick={openModal}
								className="bg-gradient-to-r from-[#18A9FF] to-[#7E06FF] text-white font-medium py-1.5 px-6 rounded hover:opacity-90 transition"
							>
								Predict
							</button>
						</div>
					</div>

					{/* Stats Card */}
					<div className="flex-1 bg-[#161625] text-white rounded-lg p-4 shadow-md w-full">
						{/* Day Buttons */}
						<div className="flex space-x-2 mb-4">
							{days.map((day, idx) => (
								<div
									key={idx}
									className={`flex flex-col items-center justify-center w-10 h-14 rounded ${
										day.active
											? "bg-gradient-to-b from-[#26263A] to-[#26263A00]"
											: ""
									}`}
								>
									<span className="text-xs font-semibold">{day.label}</span>
									<span className="text-[10px] text-gray-400">
										{day.fraction}
									</span>
								</div>
							))}
						</div>

						{/* Stats list */}
						<div className="flex flex-col space-y-2.5 max-h-[200px] overflow-y-auto scrollbar-hide">
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Total Bonuses</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									69
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Current Bonus</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									69
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Total Win</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									$3,150.500
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Date</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									19/06/2022
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Win/Bonus</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									$548.00
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">100x Wins</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									69
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Average Bet</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									$500
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Average Win</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									$100
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-[13px] font-medium">Average Multi</span>
								<span className="text-[13px] font-medium text-[#989EAE]">
									100.49x
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN (Table) */}
				<div className="flex-1 bg-[#161625] pt-2 flex flex-col rounded-lg shadow-md h-[620px]">
					{/* Table Header */}
					<div className="flex items-center justify-between mb-0 flex-shrink-0 px-4">
						{/* Left side: icon + search input(s) */}
						<div className="flex items-center">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2"
							>
								<path
									d="M15 15L11.6166 11.6167M13.4448 7.22222C13.4448 10.6587 10.659 13.4444 7.22242 13.4444C3.78587 13.4444 1 10.6587 1 7.22222C1 3.78578 3.78587 1 7.22242 1C10.659 1 13.4448 3.78578 13.4448 7.22222Z"
									stroke="#989EAE"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							{/* Mobile input (shown on small screens) */}
							<input
								type="text"
								placeholder="Search for a Slo..."
								className="bg-transparent text-white placeholder-[#989EAE] text-sm p-2 rounded w-24 focus:outline-none 
                 block sm:hidden"
							/>

							{/* Desktop input (hidden on small screens, shown on sm+) */}
							<input
								type="text"
								placeholder="Search for a Slot or a Provider..."
								className="bg-transparent text-white placeholder-[#989EAE] text-sm p-2 rounded w-60 focus:outline-none 
                 hidden sm:block"
							/>
						</div>

						{/* Right side: results toggle */}
						<div className="flex items-center space-x-2 text-sm text-[#989EAE]">
							<span>Results</span>
							<input type="checkbox" className="form-checkbox text-[#18A9FF]" />
						</div>
					</div>

					{/* Table Container (scrollable) */}
					<div className="flex-1 overflow-hidden">
						{/* Adjust max-height here if needed */}
						<div className="max-h-full overflow-x-auto overflow-y-auto scrollbar-hide">
							<table className="w-full text-sm text-left text-gray-200">
								<tbody>
									{tableData.map((row, idx) => {
										const rowBg = idx % 2 === 0 ? "#161625" : "#0B0B1780";
										return (
											<tr key={row.id} style={{ backgroundColor: rowBg }}>
												<td className="px-4 py-3 hidden md:table-cell text-[#989EAE] font-[800]">
													{row.id}
												</td>
												<td className="px-4 py-3 whitespace-nowrap">
													{row.slot}
												</td>
												<td className="px-4 py-3 text-[#989EAE]">
													{row.provider}
												</td>
												<td className="px-4 py-3 text-[#989EAE]">{row.bet}</td>
												<td className="px-4 py-3 text-[#989EAE]">
													{row.multi}
												</td>
												<td className="px-4 py-3">{row.win}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
				<GameCard
					thumbnailSrc="https://i.imghippo.com/files/hEDn8429AP.png"
					altText="Sugar Rush"
					title="Sugar Rush"
					subtitle="Pragmatic Play"
					label="Highest Multi"
					value="240x"
				/>

				<GameCard
					thumbnailSrc="https://i.imghippo.com/files/hEDn8429AP.png"
					altText="Sugar Rush"
					title="Sugar Rush"
					subtitle="Pragmatic Play"
					label="Highest Multi"
					value="240x"
				/>

				<GameCard
					thumbnailSrc="https://i.imghippo.com/files/hEDn8429AP.png"
					altText="Sugar Rush"
					title="Sugar Rush"
					subtitle="Pragmatic Play"
					label="Highest Multi"
					value="240x"
				/>
			</div>

			{/* MODAL */}
			{isModalOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
					onClick={closeModal}
				>
					<div
						className="relative w-[420px] max-w-full bg-[#161625] rounded-lg p-5"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between mb-3">
							<span className="text-sm font-semibold text-[#18A9FF]">
								Prediction
							</span>
							<button
								onClick={closeModal}
								className="text-gray-400 hover:text-gray-200"
								aria-label="Close Modal"
							>
								✕
							</button>
						</div>

						<h4 className="text-white text-base font-semibold">
							Will we make any profit on this Bonus Hunt?
						</h4>

						<div className="mt-4 space-y-3">
							{/* Yes Bar */}
							<div
								className={`relative h-[52px] rounded flex items-center px-4 overflow-hidden cursor-pointer
                  ${prediction === "yes" ? "border-2 border-[#18A9FF]" : "border border-transparent"}`}
								style={{ backgroundColor: "#0B0B1780" }}
								onClick={() => setPrediction("yes")}
							>
								<div
									className="absolute left-0 top-0 h-full bg-[#2D2D49] transition-all"
									style={{ width: yesPercent }}
								/>
								<div className="relative z-10 flex flex-col text-sm">
									<span className="font-medium">Yes</span>
									<span className="text-[#989EAE] text-xs">
										{yesVotes} Votes
									</span>
								</div>
							</div>

							{/* No Bar */}
							<div
								className={`relative h-[52px] rounded flex items-center px-4 overflow-hidden cursor-pointer
                  ${prediction === "no" ? "border-2 border-[#18A9FF]" : "border border-transparent"}`}
								style={{ backgroundColor: "#0B0B1780" }}
								onClick={() => setPrediction("no")}
							>
								<div
									className="absolute left-0 top-0 h-full bg-[#2D2D49] transition-all"
									style={{ width: noPercent }}
								/>
								<div className="relative z-10 flex flex-col text-sm">
									<span className="font-medium">No</span>
									<span className="text-[#989EAE] text-xs">
										{noVotes} Votes
									</span>
								</div>
							</div>
						</div>

						<p className="mt-4 text-sm text-gray-400">
							You are currently placing a bet on the answer “
							<span className="text-white font-medium">
								{prediction === "yes" ? "Yes" : "No"}
							</span>
							”.
						</p>

						<div className="mt-4 flex items-center space-x-3 w-full">
							{/* Bet Display */}
							<div className="flex items-center bg-[#03030A40] px-3 py-2 rounded w-full">
								<div className="w-5 h-5 rounded-full bg-yellow-300 mr-2" />
								<span className="text-white text-sm font-medium">250 000</span>
							</div>

							{/* Place Prediction Button */}
							<button
								className="ml-auto bg-gradient-to-r from-[#18A9FF] to-[#7E06FF] text-white w-full
                  font-semibold py-2 px-5 rounded hover:opacity-90 transition"
							>
								Place Prediction
							</button>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
}
