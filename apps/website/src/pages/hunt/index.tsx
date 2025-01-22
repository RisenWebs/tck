import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

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
    { id: 1, slot: "Eye of Cleopatra", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 2, slot: "Book of Vikings", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 3, slot: "Bounty Gold", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 4, slot: "Heart of Rio", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 5, slot: "Mysterious Egypt", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 6, slot: "Joker King", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 7, slot: "Return of the Dead", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 8, slot: "Wild Walker", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 9, slot: "Vampires vs Wolves", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 10, slot: "Break Bones", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 11, slot: "Break Bones", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
    { id: 12, slot: "Break Bones", provider: "Pragmatic Play", bet: "$10", multi: "51.00x", win: "$800.39" },
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
              <div className="relative flex-1 h-1.5 rounded-full bg-gray-700 mr-3">
                <div
                  className="absolute h-1.5 rounded-full bg-gradient-to-r from-[#18A9FF] to-[#9229FF]"
                  style={{ width: "70%" }} // example
                />
              </div>
              <span className="text-sm text-[#989EAE] whitespace-nowrap">
                2h 45m
              </span>
            </div>

            {/* Yes/No Bars */}
            <div className="mt-4 space-y-2">
              {/* Yes row */}
              <div className="relative h-[52px] bg-[#0B0B1780] rounded flex items-center px-4 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-[#2D2D49]"
                  style={{ width: yesPercent }}
                />
                <div className="relative z-10 flex flex-col text-sm">
                  <span className="font-medium">Yes</span>
                  <span className="text-[#989EAE] text-xs">{yesVotes} Votes</span>
                </div>
              </div>
              {/* No row */}
              <div className="relative h-[52px] bg-[#0B0B1780] rounded flex items-center px-4 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-[#2D2D49]"
                  style={{ width: noPercent }}
                />
                <div className="relative z-10 flex flex-col text-sm">
                  <span className="font-medium">No</span>
                  <span className="text-[#989EAE] text-xs">{noVotes} Votes</span>
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
                className="bg-gradient-to-r from-[#18A9FF] to-[#7E06FF] text-white font-semibold py-2 px-5 rounded hover:opacity-90 transition"
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
                  className={`flex flex-col items-center justify-center w-10 h-14 rounded
                    ${day.active ? "bg-[#26263A]" : ""}`}
                >
                  <span className="text-xs font-semibold">{day.label}</span>
                  <span className="text-[10px] text-gray-400">{day.fraction}</span>
                </div>
              ))}
            </div>

            {/* Stats list */}
            <div className="flex flex-col space-y-2 max-h-[200px] overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Bonuses</span>
                <span className="text-sm text-gray-300">69</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Bonus</span>
                <span className="text-sm text-gray-300">69</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Win</span>
                <span className="text-sm text-gray-300">$3,150.500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Date</span>
                <span className="text-sm text-gray-300">19/06/2022</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Win/Bonus</span>
                <span className="text-sm text-gray-300">$548.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">100x Wins</span>
                <span className="text-sm text-gray-300">69</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Average Bet</span>
                <span className="text-sm text-white">$500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Average Win</span>
                <span className="text-sm text-white">$100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Average Multi</span>
                <span className="text-sm text-white">100.49x</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Table) */}
        <div className="flex-1 bg-[#161625] p-4 flex flex-col rounded-lg shadow-md h-[620px]">
        {/* Table Header */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <input
              type="text"
              placeholder="Search for a Slot or a Provider..."
              className="bg-[#0B0B1780] text-white placeholder-[#989EAE] text-sm p-2 rounded w-60 focus:outline-none"
            />
            <div className="flex items-center space-x-2 text-sm text-[#989EAE]">
              <span>Results</span>
              <input type="checkbox" className="form-checkbox text-[#18A9FF]" />
            </div>
          </div>

          {/* Table Container (scrollable) */}
          <div className="flex-1 overflow-hidden">
            {/* Adjust max-height here if needed */}
            <div className="max-h-full overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-200">
                <thead className="bg-[#161625] text-xs uppercase text-gray-400">
                  <tr>
                    <th className="px-4 py-3 font-normal">#</th>
                    <th className="px-4 py-3 font-normal">Slot</th>
                    <th className="px-4 py-3 font-normal">Provider</th>
                    <th className="px-4 py-3 font-normal">Bet</th>
                    <th className="px-4 py-3 font-normal">Multi</th>
                    <th className="px-4 py-3 font-normal">Win</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => {
                    const rowBg = idx % 2 === 0 ? "#161625" : "#0B0B1780";
                    return (
                      <tr
                        key={row.id}
                        style={{ backgroundColor: rowBg }}
                        className="border-b border-[#0B0B1780] hover:bg-[#161625] transition"
                      >
                        <td className="px-4 py-3">{row.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{row.slot}</td>
                        <td className="px-4 py-3">{row.provider}</td>
                        <td className="px-4 py-3">{row.bet}</td>
                        <td className="px-4 py-3">{row.multi}</td>
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
              <span className="text-sm font-semibold text-[#18A9FF]">Prediction</span>
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
                  <span className="text-gray-300 text-xs">{yesVotes} Votes</span>
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
                  <span className="text-gray-300 text-xs">{noVotes} Votes</span>
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
