import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import GameCard from "@/components/Hunt/GameCard";
import axios from 'axios';
import { huntData, bonusData, ProcessedHuntData } from "types";

const DEFAULT_HUNT_VALUES = {
    bonus_count_opened: '-',
    bonus_count_remaining: '-',
    bonus_count_total: '-',
    x100_wins: '-',
    avg_per_bonus: '-',
    avg_betsize: '-',
    avg_payout: '-',
    info_start_cost: '-',
    info_amount_won: '-',
    info_highest_payout: '-',
    info_highest_multi: '-',
    info_running_average: '-',
    info_required_average: '-',
};

export default function HuntTracker() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [prediction, setPrediction] = useState<"yes" | "no">("yes");
	const [huntData, setHuntData] = useState<huntData[]>([]);
	const [bonusData, setBonusData] = useState<bonusData>([]);
	const [processedHunt, setProcessedHunt] = useState<ProcessedHuntData[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [activeDay, setActiveDay] = useState(0);

	const API_BASE = `https://bht.bet/api/n7wx3ERhW6MHM9sks59sJR2fzvDHpMP9`; //eg https://bht.bet/api/TOKEN
	const endpoints = [
		{ name: "bonuses", endpoint: "/bonuses", setter: setBonusData },
		{ name: "hunts", endpoint: "/hunts", setter: setHuntData }
	];

	const fetchData = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
		try {
			const { data } = await axios.get(`${API_BASE}${endpoint}`);
			setter(data);
		} catch (error: any) {
			console.error(`Error fetching data from ${endpoint}:`, error.message || error);
		}
	};

	useEffect(() => {
		endpoints.forEach(({ endpoint, setter }) => fetchData(endpoint, setter));
	}, []);

	useEffect(() => {
		const processHuntData = (hunts: huntData[]): ProcessedHuntData[] => {
			const groupedWeeks = hunts
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.reduce((acc: Record<string, huntData>, hunt) => {
					const weekday = new Date(hunt.date).toLocaleDateString('en-US', { weekday: 'short' })[0];
					acc[weekday] = hunt;
					return acc;
				}, {});

			return ['S', 'F', 'TH', 'W', 'T', 'M'].map(label => {
				const hunt = groupedWeeks[label] || {};
				const hasData = Boolean(hunt.date);

				return {
					label,
					date: hasData
						? new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' }).format(new Date(hunt.date))
						: '-',
					data: hasData
						? {
							bonus_count_opened: hunt.bonus_count_opened,
							bonus_count_remaining: hunt.bonus_count_remaining,
							bonus_count_total: hunt.bonus_count_total,
							x100_wins: hunt.x100_wins,
							avg_per_bonus: hunt.avg_per_bonus,
							avg_betsize: hunt.avg_betsize,
							avg_payout: hunt.avg_payout,
							info_start_cost: hunt.info_start_cost,
							info_amount_won: hunt.info_amount_won,
							info_highest_payout: hunt.info_highest_payout,
							info_highest_multi: hunt.info_highest_multi,
							info_running_average: hunt.info_running_average,
							info_required_average: hunt.info_required_average,
						}
						: DEFAULT_HUNT_VALUES
				};
			});
		};

		if (huntData.length) setProcessedHunt(processHuntData(huntData));
	}, [huntData]);

	//score of how much it matches based on length of substring matched compared to total length
	const getMatchScore = (field: string | null | undefined, query: string): number =>
		field?.toLowerCase().includes(query.toLowerCase()) ? query.length / field.length : 0;


	//if showSearch is true, filter the bonusData array based on the searchQuery if not return the bonusData if searchQury is empty it will return bonusData else return the filtered array
	const filteredBonusData = showSearch ? searchQuery.trim() ? bonusData.filter((bonus) => {
		const fieldsToCheck = [
			bonus.name,
			bonus.note,
			bonus.provider_name,
			bonus.bet_size,
			bonus.multiplier,
			bonus.payout,
			bonus.timestamp,
		];

		const totalScore = fieldsToCheck.reduce((score, field) => score + getMatchScore(field, searchQuery), 0);

		return totalScore > 0;
	}) : bonusData : bonusData;


	const yesVotes = 104;
	const noVotes = 486;
	const totalVotes = yesVotes + noVotes;
	const yesPercent = ((yesVotes / totalVotes) * 100).toFixed(1) + "%";
	const noPercent = ((noVotes / totalVotes) * 100).toFixed(1) + "%";

	const toggleModal = () => setIsModalOpen((prev) => !prev);

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
								onClick={toggleModal}
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
							{processedHunt.map((day, idx) => (
								<div
									key={idx}
									onClick={() => setActiveDay(idx)}
									className={`flex flex-col items-center justify-center w-10 h-14 rounded cursor-pointer ${idx === activeDay
										? "bg-gradient-to-b from-[#26263A] to-[#26263A00]"
										: ""
										}`}
								>
									<span className="text-xs font-semibold">{day.label}</span>
									<span className="text-[10px] text-gray-400">
										{day.date}
									</span>
								</div>
							))}
						</div>

						{/* Stats list */}
						<div className="flex flex-col space-y-2.5 max-h-[200px] overflow-y-auto scrollbar-hide">
							{processedHunt.length === 0 ? (
								Array.from({ length: 9 }).map((_, idx) => (
									<div key={idx} className="flex items-center justify-between animate-pulse">
										<span className="h-4 w-24 bg-[#2A2D3E] rounded"></span>
										<span className="h-4 w-16 bg-[#2A2D3E] rounded"></span>
									</div>
								))
							) : (
								<>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Total Bonuses</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.bonus_count_total}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Current Bonus</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.bonus_count_opened}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Total Win</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.info_amount_won}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Date</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].date}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Win/Bonus</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.avg_per_bonus}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">100x Wins</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.x100_wins}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Average Bet</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.avg_betsize}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Average Win</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.avg_payout}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[13px] font-medium">Average Multi</span>
										<span className="text-[13px] font-medium text-[#989EAE]">
											{processedHunt[activeDay].data.info_running_average}
										</span>
									</div>
								</>
							)}
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
								onChange={(e) => setSearchQuery(e.target.value)}
								value={searchQuery}
								placeholder="Search for a Slo..."
								className="bg-transparent text-white placeholder-[#989EAE54] text-sm p-2 rounded w-24 focus:outline-none 
                 block sm:hidden"
							/>

							{/* Desktop input (hidden on small screens, shown on sm+) */}
							<input
								type="text"
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search for a Slot or a Provider..."
								className="bg-transparent text-white placeholder-[#989EAE54] text-sm p-2 rounded w-60 focus:outline-none 
                 hidden sm:block"
							/>
						</div>

						{/* Right side: results toggle */}
						<div className="flex items-center space-x-2 text-sm text-[#989EAE]">
							<span>Results</span>
							<div onClick={() => setShowSearch(!showSearch)} className="relative inline-flex items-center">
								<input
									onChange={(e) => setShowSearch(e.target.checked)}
									checked={showSearch}
									type="checkbox"
									className="sr-only peer"
								/>
								<div className="w-10 h-5 cursor-pointer bg-[#0B0B13] peer-focus:ring-2 peer-focus:ring-[#1f1f1f] rounded-full peer-checked:bg-[#1f1f1f] transition-all"></div>
								<div className="absolute cursor-pointer left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
							</div>
						</div>
					</div>

					{/* Table Container (scrollable) */}
					<div className="flex-1 overflow-hidden">
						{/* Adjust max-height here if needed */}
						<div className="max-h-full overflow-x-auto overflow-y-auto scrollbar-hide">
							<table className="w-full text-sm text-left text-gray-200">
								<tbody>
									{bonusData.length <= 0
										? Array.from({ length: 10 }).map((_, idx) => {
											const rowBg = idx % 2 === 0 ? "#161625" : "#0B0B1780";
											return (
												<tr key={idx} style={{ backgroundColor: rowBg }}>
													<td className="px-4 py-3 hidden md:table-cell text-[#989EAE] animate-pulse">
														<div className="h-4 w-8 bg-[#2A2D3E] rounded"></div>
													</td>
													<td className="px-4 py-3 whitespace-nowrap animate-pulse">
														<div className="h-4 w-20 bg-[#2A2D3E] rounded"></div>
													</td>
													<td className="px-4 py-3 text-[#989EAE] animate-pulse">
														<div className="h-4 w-28 bg-[#2A2D3E] rounded"></div>
													</td>
													<td className="px-4 py-3 text-[#989EAE] animate-pulse">
														<div className="h-4 w-16 bg-[#2A2D3E] rounded"></div>
													</td>
													<td className="px-4 py-3 text-[#989EAE] animate-pulse">
														<div className="h-4 w-12 bg-[#2A2D3E] rounded"></div>
													</td>
												</tr>
											);
										})
										: filteredBonusData.map((row, idx) => {
											const rowBg = idx % 2 === 0 ? "#161625" : "#0B0B1780";
											return (
												<tr key={row.id} style={{ backgroundColor: rowBg }}>
													<td className="px-4 py-3 hidden md:table-cell text-[#989EAE] font-extrabold">
														{row.id}
													</td>
													<td className="px-4 py-3 whitespace-nowrap">{row.name}</td>
													<td className="px-4 py-3 text-[#989EAE]">{row.provider_name}</td>
													<td className="px-4 py-3 text-[#989EAE]">{row.bet_size}</td>
													<td className="px-4 py-3 text-[#989EAE]">{row.multiplier}</td>
													<td className="px-4 py-3">{row.payout}</td>
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
					onClick={toggleModal}
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
								onClick={toggleModal}
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
