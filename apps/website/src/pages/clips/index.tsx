import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { faYoutube, fa } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Clips() {
  return (
    <Layout title="Clips">
      <PageHeader title="Video Clips" />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {/* STEP 01 */}
        <div className="flex flex-col rounded-lg bg-[#161625] p-4 text-white shadow-md h-full">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#989EAE] italic font-bold">STEP</span>
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
            <span className="text-sm text-[#989EAE] italic font-bold">STEP</span>
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
            <span className="text-sm text-[#989EAE] italic font-bold">STEP</span>
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
            <button className="w-full rounded-md bg-gradient-to-r from-[#18A9FF] to-[#7E06FF] px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90">
              Submit Clip
            </button>
          </div>
          <p className="mt-auto text-xs text-gray-400">
            Terms and Conditions apply. Strictly for 18+ users.
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mt-10">
        <div className="relative px-3 flex items-center">
          <img 
            src="https://cdn.discordapp.com/attachments/1327260674400714792/1329557035901128755/image.png?ex=678ac5fb&is=6789747b&hm=e90f4fe90a49a4da0c5b7e1720da21674594320c4e738fa954df84e549db3129&"
            alt="youtube"
            className="w-[48px] h-[30px] absolute inset-0"
          />
          <FontAwesomeIcon icon={faYoutube} className="w-[19px] h-[20px] text-[#F81E1E] brightness-125 relative" />
          <span className="ml-2 text-white font-medium italic z-[5]">YOUTUBE</span>
        </div>
        <button className="flex items-center bg-[#26263A] px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-5 md:grid-cols-4">
        <div className="bg-[#161625] rounded-lg px-4 py-3">
          <div
            className="text-center bg-cover bg-center p-6 rounded-lg"
            style={{
              backgroundImage: 'url(https://cdn.discordapp.com/attachments/1162174226380361859/1329571534351892540/image.png?ex=678ad37c&is=678981fc&hm=5f359cfaa9d6990d82a83956d4a9c88eca62e0b9fabd4e9fedb1d1d92a13c7b7&)',
            }}
          >
            {/* Gradient Text */}
            <h2 className="text-[74px] font-black bg-gradient-to-b from-[#F81E1E] to-[#FF4343] bg-clip-text text-transparent">
              $250
            </h2>
            <p className="text-[#989EAE] text-xs font-medium">
              The clip with the most upvotes and views wins a $250 every month!
            </p>
          </div>

          <hr className="border-[#26263A]"/>

          <button className="mt-3 w-full rounded-md bg-[#26263A] px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-90">
              View Clips
          </button>

          <button className="w-full px-4 mt-3 text-sm font-medium text-[#989EAE] hover:opacity-90">
            Upload your clips
          </button>
        </div>
      </div>
    </Layout>
  );
}