import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function Clips() {
    return (
        <Layout title="Clips">
            <PageHeader title="Video Clips" />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                {/* STEP 01 */}
                <div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#989EAE] italic font-bold">
                            STEP
                        </span>
                        <span className="text-sm font-black text-white italic">
                            01
                        </span>
                    </div>
                    <hr className="my-2 border-[#1c2230]" />
                    <h2 className="text-lg font-semibold">Use Our Codes</h2>
                    <p className="mt-2 text-[13px] text-[#989EAE] flex-grow font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <div className="mt-4 h-16 w-full rounded bg-[#100F1C] self-end" />
                </div>

                {/* STEP 02 */}
                <div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md h-full">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#989EAE] italic font-bold">
                            STEP
                        </span>
                        <span className="text-sm font-black text-white italic">
                            02
                        </span>
                    </div>
                    <hr className="my-2 border-[#1c2230]" />
                    <h2 className="text-lg font-semibold">Win a Bonus</h2>
                    <p className="mt-2 text-[13px] text-[#989EAE] flex-grow font-medium">
                        Test your luck on the featured sites, win and submit
                        your clips to win even more!
                    </p>
                    <div className="mt-4 h-16 w-full rounded bg-[#100F1C] self-end" />
                </div>

                {/* STEP 03 */}
                <div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md h-full">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#989EAE] italic font-bold">
                            STEP
                        </span>
                        <span className="text-sm font-black text-white italic">
                            03
                        </span>
                    </div>
                    <hr className="my-2 border-[#1c2230]" />
                    <h2 className="text-lg font-semibold">Submit Clips</h2>
                    <p className="mt-2 text-[13px] text-[#989EAE] flex-grow font-medium">
                        Submit your clips and get rewarded! The clip from each
                        platform with the biggest upvotes wins.
                    </p>
                    <div className="mt-4 h-16 w-full rounded bg-[#100F1C] self-end" />
                </div>

                {/* PARTICIPATE (spans 2 columns) */}
                <div className="md:col-span-2 flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md w-full max-w-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-sm uppercase text-gray-400">
                            PARTICIPATE
                        </span>
                    </div>
                    <hr className="my-2 border-[#1c2230]" />

                    <div className="mt-5">
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
                        <button className="w-full rounded-md bg-gradient-to-r from-[#18A9FF] to-[#7E06FF] px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90">
                            Submit Clip

                        </button>
                    </div>
                    <p className="mt-auto text-xs text-gray-400">
                        Terms and Conditions apply. Strictly for 18+ users.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
