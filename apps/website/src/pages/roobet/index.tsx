import Image from 'next/image';

import roobetIcon from '@/images/affiliate/roobet-mini.png';
import roobetLogo from '@/images/affiliate/roobet.png';
import Layout from '@/components/Layout/Layout';
import { useTheme } from '@/hooks/theme';
import { useEffect, useState, lazy } from 'react';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';
import clsx from 'clsx';


type RewardProps = {
  tier: string;
  wager: string;
  reward: string;
  claimed: boolean;
  canClaim: boolean;
};

const rankToImageName = (rank: string) => `${rank.split(' ')[0].toLowerCase()}_${{ I: "1", II: "2", III: "3", IV: "4" }[rank.split(' ')[1]] || "1"}`;
const rewards: RewardProps[] = [
  { tier: "SILVER I", wager: "$5,000", reward: "5.00", claimed: false, canClaim: true },
  { tier: "SILVER II", wager: "$10,000", reward: "10.00", claimed: false, canClaim: false },
  { tier: "SILVER III", wager: "$25,000", reward: "20.00", claimed: false, canClaim: false },
  { tier: "SILVER IV", wager: "$50,000", reward: "25.00", claimed: false, canClaim: false },
];

const RewardCard: React.FC<RewardProps> = ({ tier, wager, reward, claimed, canClaim }) => {
  return (
    <div className="flex items-center justify-between bg-[#202032] p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-[#03030A54] rounded-lg flex items-center justify-center">
          <Image src={`/img/roobeticons/${rankToImageName(tier)}.png`} className='w-[60%]' unoptimized width={100} height={100} alt='roobet rank image'></Image>
        </div>
        <div>
          <h3 className="text-lg font-extrabold italic text-white">{tier}</h3>
          <p className="text-sm text-gray-400">Wager {wager}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-lg font-bold text-gray-200">${reward}</p>
        {claimed ? (
          <button
            className="px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
            disabled
          >
            Claimed
          </button>
        ) : (
          <button className={clsx("px-4 py-2 text-white font-bold rounded-lg", canClaim
            ? 'bg-gradient-to-r from-[#DDB43F] to-[#9B7C25] hover:from-[#DDAA3F] hover:to-[#9A6A25]' 
            : 'bg-gradient-to-r from-[#DDB43F] to-[#9B7C25] opacity-40 shadow-inner')}>
            Claim
          </button>
        )}
      </div>
    </div>
  );
};

function Roobet() {
  const theme = useTheme();
  const [code] = useState("TCK");
  const [rank, setRank] = useState("Silver I");
  const [rankPath, setRankPath] = useState("");
  const [progress, setProgress] = useState(10);
  const [remaining, setRemaining] = useState(8000);
  const [amountWagered, setAmountWagered] = useState(0);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    setRankPath(`/img/roobethd/${rankToImageName(rank)}.png`);
  }, [rank])

  useEffect(() => {
    theme.setTheme('roobet');
  }, []);

  return (
    <Layout title="Roobet">
      <div className="flex flex-col items-center justify-start min-h-screen mt-[6%]">
        <div>
          <div className="flex justify-center items-center mt-4">
            <JaggedBackgroundItem fullWidth={false} fill="#52431d">
              <Image
                className="w-[130px] sm:w-[100px] md:w-[130px] h-[35px] sm:h-[30px] md:h-[35px]"
                src={roobetLogo}
                alt="Roobet"
              />
            </JaggedBackgroundItem>
          </div>

          <div className="">
            <p className="text-4xl sm:text-6xl md:text-8xl font-bold mt-4">VIP Rewards</p>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center mt-4">
              This reward is available for 7 Days upon redemption.
            </p>
          </div>

          <div className="select-none">
            <div className="absolute top-[10%] left-[30%] hidden md:block">
              <Image
                className="w-[35px] h-[35px] -rotate-12"
                src={roobetIcon}
                alt="Roobet"
              />
            </div>
            <div className="absolute top-[23%] right-[28%] hidden md:block">
              <Image
                className="w-[35px] h-[35px] rotate-12"
                src={roobetIcon}
                alt="Roobet"
              />
            </div>
            <div className="absolute top-[22%] left-[27%] opacity-20 hidden md:block">
              <Image
                className="w-[20px] h-[20px] -rotate-12"
                src={roobetIcon}
                alt="Roobet"
              />
            </div>
            <div className="absolute top-[15%] right-[30%] opacity-20 hidden md:block">
              <Image
                className="w-[20px] h-[20px]"
                src={roobetIcon}
                alt="Roobet"
              />
            </div>
          </div>
        </div>

        <div className="relative flex flex-row justify-between items-center mt-5 max-w-[1200px] mx-auto px-4 w-[90%]">
          <div className="flex items-center w-[100%]">
            <svg
              className="w-[48px] h-[31px] sm:w-[60px] sm:h-[40px] lg:w-[70px] lg:h-[50px] relative z-0"
              viewBox="0 0 48 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_2971_1709)">
                <path
                  d="M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z"
                  fill="url(#paint0_linear_2971_1709)"
                  fillOpacity="0.75"
                  shapeRendering="crispEdges"
                />
                <path
                  d="M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z"
                  fill="url(#paint1_linear_2971_1709)"
                  fillOpacity="0.15"
                  shapeRendering="crispEdges"
                />
              </g>
              <defs>
                <filter id="filter0_d_2971_1709" x="0.140625" y="0" width="47.834" height="30.9575" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2971_1709" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2971_1709" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_2971_1709" x1="24" y1="0" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#26263A" />
                  <stop offset="1" stop-color="#11111F" />
                </linearGradient>
                <linearGradient id="paint1_linear_2971_1709" x1="60" y1="15" x2="-10.5" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#DDB440" stop-opacity="0" />
                  <stop offset="1" stop-color="#DDB440" />
                </linearGradient>
              </defs>

            </svg>

            <div className="absolute top-[8px] font-serif font-extrabold left-[3%] flex items-center z-10 gap-[2px]">
              <Image
                src={roobetIcon}
                alt="roobet icon"
                className="sm:w-[15px] sm:h-[15px] lg:w-[19px] lg:h-[20px] select-none"
              />
              <span className="ml-2 text-white font-extrabold italic text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Archivo, sans-serif' }}>
                SIGN UP REWARD
              </span>
            </div>
          </div>
        </div>

        <div className="relative bg-[#161625E5] w-[87.5%] border-2 border-transparent overflow-hidden rounded-lg flex justify-between h-[13vh]">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#ddb43f] to-[#9b7c25] blur-[40px] top-[20px] rounded-[5rem] w-[35%]" style={{ background: "linear-gradient(90deg, #DDB43F 0%, #9B7C25 100%)", filter: "blur(20px)", }}>
          </div>
          <div className='flex w-[100%] h-[100%] justify-between items-center'>
            <div className="flex flex-col items-baseline p-6 rounded-lg text-center">
              <Image src={roobetLogo} alt='roobet logo' className='w-[6vw] mb-2'></Image>
              <div>
                <h1 className="text-white text-xl font-bold text-left">$15 Reload & Instant Rakeback</h1>
                <p className=" text-gray-400 text-sm text-left">
                  Click on the button below to register instantly.
                </p>
              </div>
            </div>
          </div>

          <div className='h-[100%] w-[35%] flex items-center justify-center mr-8 gap-4'>
            <JaggedBackgroundItem fullWidth={false} fill="#52431d">
              <div className='flex w-[11vw] items-center h-[3vh] justify-start cursor-pointer' onClick={copyCode}>
                <span className='w-full text-white inline-block text-left font-bold'>
                  {code}
                </span>

                <div className="aspect-square w-[3vh] bg-[#989EAE54] rounded-full flex items-center justify-center sm:w-[4vh]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 6 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.742191 2.53506H3.48647C3.89466 2.53506 4.22866 2.84828 4.22866 3.23097V5.8041C4.22866 6.18683 3.89461 6.5 3.48647 6.5H0.742191C0.334001 6.5 0 6.18678 0 5.8041V3.23097C0 2.84823 0.334051 2.53506 0.742191 2.53506ZM2.51353 0.500058H5.25781C5.666 0.500058 6 0.813276 6 1.19596V3.76909C6 4.15183 5.66595 4.465 5.25781 4.465H4.54041V3.23091C4.54041 2.6875 4.06623 2.24289 3.48668 2.24289H1.77149V1.1959C1.77149 0.813171 2.10554 0.5 2.51368 0.5L2.51353 0.500058Z"
                      fill="#989EAE"
                    />
                  </svg>
                </div>

              </div>
            </JaggedBackgroundItem>

            <button className="flex items-center justify-center bg-gradient-to-r from-[#DDB43F] to-[#9B7C25] text-white py-2 px-4 sm:px-6 w-[150px] sm:w-[200px] h-10 rounded-lg cursor-pointer">
              <span className="text-[14px] sm:text-[16px] font-semibold text-nowrap">Claim Reward</span>
              <span className="ml-2">
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-200 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.62792 10.3923C2.55824 10.4614 2.46502 10.5 2.36799 10.5C2.27095 10.5 2.17771 10.4614 2.10804 10.3923C2.07385 10.3583 2.04667 10.3176 2.02811 10.2727C2.00956 10.2278 2 10.1795 2 10.1307C2 10.0819 2.00956 10.0337 2.02811 9.98874C2.04667 9.94381 2.07385 9.90313 2.10804 9.86911L6.01976 5.93156L2.10923 2.13029C2.07517 2.09645 2.0481 2.05598 2.02961 2.01126C2.01112 1.96653 2.00158 1.91847 2.00158 1.86991C2.00158 1.82135 2.01112 1.77329 2.02961 1.72856C2.0481 1.68384 2.07517 1.64334 2.10923 1.6095C2.17834 1.53936 2.27179 1.5 2.36918 1.5C2.46656 1.5 2.56 1.53936 2.62911 1.6095L7 5.93156L2.62792 10.3923Z"
                    fill="white"
                    fillOpacity="0.75"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className='relative flex flex-row justify-between items-center mt-10 max-w-[1200px] px-4 w-[94%] left-2'>
          <div className="relative flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto px-4 w-[50%]">
            <div className="flex items-center w-[100%]">
              <svg
                className="w-[48px] h-[31px] sm:w-[60px] sm:h-[40px] lg:w-[70px] lg:h-[50px] relative z-0"
                viewBox="0 0 48 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2971_1709)">
                  <path
                    d="M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z"
                    fill="url(#paint0_linear_2971_1709)"
                    fillOpacity="0.75"
                    shapeRendering="crispEdges"
                  />
                  <path
                    d="M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z"
                    fill="url(#paint1_linear_2971_1709)"
                    fillOpacity="0.15"
                    shapeRendering="crispEdges"
                  />
                </g>
                <defs>
                  <filter id="filter0_d_2971_1709" x="0.140625" y="0" width="47.834" height="30.9575" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2971_1709" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2971_1709" result="shape" />
                  </filter>
                  <linearGradient id="paint0_linear_2971_1709" x1="24" y1="0" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#26263A" />
                    <stop offset="1" stop-color="#11111F" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_2971_1709" x1="60" y1="15" x2="-10.5" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDB440" stop-opacity="0" />
                    <stop offset="1" stop-color="#DDB440" />
                  </linearGradient>
                </defs>

              </svg>

              <div className="absolute top-[8px] font-serif font-extrabold left-[6.8%] flex items-center z-10 gap-[2px]">
                <svg width="19" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.99967 7.86654C8.61049 7.86654 9.91634 6.5607 9.91634 4.94987C9.91634 3.33904 8.61049 2.0332 6.99967 2.0332C5.38885 2.0332 4.08301 3.33904 4.08301 4.94987C4.08301 6.5607 5.38885 7.86654 6.99967 7.86654Z" fill="#DDB440" />
                  <path d="M6.99979 9.32471C4.07727 9.32471 1.69727 11.2847 1.69727 13.6997C1.69727 13.863 1.8256 13.9914 1.98893 13.9914H12.0106C12.174 13.9914 12.3023 13.863 12.3023 13.6997C12.3023 11.2847 9.92229 9.32471 6.99979 9.32471Z" fill="#DDB440" />
                </svg>
                <span className="ml-2 text-white font-extrabold italic text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Archivo, sans-serif' }}>
                  YOUR RANK
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex flex-row justify-between items-center mt-10 max-w-[1200px] mx-auto px-4 w-[50%]">
            <div className="flex items-center w-[100%]">
              <svg
                className="w-[48px] h-[31px] sm:w-[60px] sm:h-[40px] lg:w-[70px] lg:h-[50px] relative z-0"
                viewBox="0 0 48 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2971_1709)">
                  <path
                    d="M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z"
                    fill="url(#paint0_linear_2971_1709)"
                    fillOpacity="0.75"
                    shapeRendering="crispEdges"
                  />
                  <path
                    d="M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z"
                    fill="url(#paint1_linear_2971_1709)"
                    fillOpacity="0.15"
                    shapeRendering="crispEdges"
                  />
                </g>
                <defs>
                  <filter id="filter0_d_2971_1709" x="0.140625" y="0" width="47.834" height="30.9575" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2971_1709" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2971_1709" result="shape" />
                  </filter>
                  <linearGradient id="paint0_linear_2971_1709" x1="24" y1="0" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#26263A" />
                    <stop offset="1" stop-color="#11111F" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_2971_1709" x1="60" y1="15" x2="-10.5" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDB440" stop-opacity="0" />
                    <stop offset="1" stop-color="#DDB440" />
                  </linearGradient>
                </defs>

              </svg>

              <div className="absolute top-[8px] font-serif font-extrabold left-[7%] flex items-center z-10 gap-[2px]">
                <svg width="19" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.86108 1.25036C5.76597 1.24842 5.67186 1.2701 5.58718 1.31344C5.50251 1.35679 5.4299 1.42046 5.37586 1.49874C5.32182 1.57703 5.28803 1.6675 5.27752 1.76204C5.26701 1.85659 5.28012 1.95226 5.31565 2.0405L5.81198 3.28172L5.0042 2.77618C4.8747 2.69531 4.71837 2.66919 4.56962 2.70357C4.42086 2.73796 4.29186 2.83002 4.21099 2.95952C4.13011 3.08902 4.10399 3.24534 4.13838 3.3941C4.17276 3.54285 4.26483 3.67186 4.39433 3.75273L4.99499 4.12786H1.82215C1.4408 4.12826 1.07518 4.27994 0.805524 4.54959C0.535867 4.81925 0.384195 5.18487 0.383789 5.56622V6.14157C0.383789 6.93477 1.02894 7.57993 1.82215 7.57993H12.1784C12.5597 7.57952 12.9253 7.42785 13.195 7.15819C13.4647 6.88854 13.6163 6.52292 13.6167 6.14157V5.56622C13.6163 5.18487 13.4647 4.81925 13.195 4.54959C12.9253 4.27994 12.5597 4.12826 12.1784 4.12786H9.00553L9.60619 3.75196C9.67373 3.71369 9.73282 3.66215 9.77992 3.60043C9.82701 3.53872 9.86113 3.46812 9.88021 3.39287C9.8993 3.31762 9.90296 3.23929 9.89098 3.16259C9.879 3.0859 9.85161 3.01242 9.81049 2.94658C9.76936 2.88074 9.71533 2.82391 9.65166 2.7795C9.58798 2.73509 9.51598 2.70403 9.43999 2.68818C9.36399 2.67233 9.28558 2.67203 9.20947 2.68728C9.13335 2.70254 9.06111 2.73304 8.99709 2.77695L8.18777 3.28325L8.68487 2.0405C8.74163 1.8988 8.73978 1.74035 8.67972 1.60001C8.61965 1.45967 8.5063 1.34894 8.36459 1.29217C8.22289 1.23541 8.06444 1.23726 7.9241 1.29733C7.78376 1.35739 7.67303 1.47074 7.61626 1.61245L7.00026 3.15361L6.38349 1.61168C6.34149 1.50682 6.26956 1.41665 6.17666 1.3524C6.08376 1.28814 5.97401 1.25266 5.86108 1.25036ZM1.24681 8.72985V12.1819C1.24681 13.4515 2.27936 14.4833 3.54819 14.4833H6.42491V8.72985H1.24681ZM7.5756 8.72985V14.4833H10.4523C11.7212 14.4833 12.7537 13.4515 12.7537 12.1819V8.72985H7.5756Z" fill="#DDB440" />
                  <path d="M5.86108 1.25036C5.76597 1.24842 5.67186 1.2701 5.58718 1.31344C5.50251 1.35679 5.4299 1.42046 5.37586 1.49874C5.32182 1.57703 5.28803 1.6675 5.27752 1.76204C5.26701 1.85659 5.28012 1.95226 5.31565 2.0405L5.81198 3.28172L5.0042 2.77618C4.8747 2.69531 4.71837 2.66919 4.56962 2.70357C4.42086 2.73796 4.29186 2.83002 4.21099 2.95952C4.13011 3.08902 4.10399 3.24534 4.13838 3.3941C4.17276 3.54285 4.26483 3.67186 4.39433 3.75273L4.99499 4.12786H1.82215C1.4408 4.12826 1.07518 4.27994 0.805524 4.54959C0.535867 4.81925 0.384195 5.18487 0.383789 5.56622V6.14157C0.383789 6.93477 1.02894 7.57993 1.82215 7.57993H12.1784C12.5597 7.57952 12.9253 7.42785 13.195 7.15819C13.4647 6.88854 13.6163 6.52292 13.6167 6.14157V5.56622C13.6163 5.18487 13.4647 4.81925 13.195 4.54959C12.9253 4.27994 12.5597 4.12826 12.1784 4.12786H9.00553L9.60619 3.75196C9.67373 3.71369 9.73282 3.66215 9.77992 3.60043C9.82701 3.53872 9.86113 3.46812 9.88021 3.39287C9.8993 3.31762 9.90296 3.23929 9.89098 3.16259C9.879 3.0859 9.85161 3.01242 9.81049 2.94658C9.76936 2.88074 9.71533 2.82391 9.65166 2.7795C9.58798 2.73509 9.51598 2.70403 9.43999 2.68818C9.36399 2.67233 9.28558 2.67203 9.20947 2.68728C9.13335 2.70254 9.06111 2.73304 8.99709 2.77695L8.18777 3.28325L8.68487 2.0405C8.74163 1.8988 8.73978 1.74035 8.67972 1.60001C8.61965 1.45967 8.5063 1.34894 8.36459 1.29217C8.22289 1.23541 8.06444 1.23726 7.9241 1.29733C7.78376 1.35739 7.67303 1.47074 7.61626 1.61245L7.00026 3.15361L6.38349 1.61168C6.34149 1.50682 6.26956 1.41665 6.17666 1.3524C6.08376 1.28814 5.97401 1.25266 5.86108 1.25036ZM1.24681 8.72985V12.1819C1.24681 13.4515 2.27936 14.4833 3.54819 14.4833H6.42491V8.72985H1.24681ZM7.5756 8.72985V14.4833H10.4523C11.7212 14.4833 12.7537 13.4515 12.7537 12.1819V8.72985H7.5756Z" fill="url(#paint0_linear_2971_2065)" />
                  <defs>
                    <linearGradient id="paint0_linear_2971_2065" x1="0.383789" y1="2.365" x2="13.5515" y2="14.2777" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FFDB00" />
                      <stop offset="0.474" stop-color="#FFDB00" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <span className="ml-2 text-white font-italic text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Archivo, sans-serif' }}>
                  LEVEL UP REWARDS
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='relative overflow-hidden flex flex-row justify-between items-center mt-10 max-w-[1200px] px-4 w-[92%] gap-5 left-2'>
          <div className='w-[50%] h-[50vh] bg-[#161625E5] rounded-lg flex flex-col justify-center items-center gap-[3%]'>
            <div className='h-[50%] w-[100%]'>
              <svg className='h-[150%] w-[100%]' style={{ aspectRatio: "xMidYMid meet" }} viewBox="0 0 619 550" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2973_2987" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="619" height="550">
                  <rect width="619" height="550" fill="url(#paint0_radial_2973_2987)" />
                </mask>
                <g mask="url(#mask0_2973_2987)">
                  <g filter="url(#filter0_d_2973_2987)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M759.036 572H-139.416C-139.725 572 -140 571.725 -140 571.382V-27.3824C-140 -27.7255 -139.725 -28 -139.416 -28H759.036C759.345 -28 759.62 -27.7255 759.62 -27.3824V571.382C759.62 571.725 759.345 572 759.036 572ZM-138.799 570.799H758.418V-26.799H-138.799V570.799Z" fill="#222236" />
                    <path d="M759.036 543.486H-139.416C-139.725 543.486 -140 543.211 -140 542.868C-140 542.525 -139.725 542.285 -139.416 542.285H759.036C759.345 542.285 759.62 542.525 759.62 542.868C759.62 543.211 759.345 543.486 759.036 543.486Z" fill="#222236" />
                    <path d="M759.036 514.971H-139.416C-139.725 514.971 -140 514.697 -140 514.354C-140 514.045 -139.725 513.771 -139.416 513.771H759.036C759.345 513.771 759.62 514.045 759.62 514.354C759.62 514.697 759.345 514.971 759.036 514.971Z" fill="#222236" />
                    <path d="M759.036 486.457H-139.416C-139.725 486.457 -140 486.183 -140 485.84C-140 485.531 -139.725 485.256 -139.416 485.256H759.036C759.345 485.256 759.62 485.531 759.62 485.84C759.62 486.183 759.345 486.457 759.036 486.457Z" fill="#222236" />
                    <path d="M759.036 457.943H-139.416C-139.725 457.943 -140 457.668 -140 457.325C-140 457.017 -139.725 456.742 -139.416 456.742H759.036C759.345 456.742 759.62 457.017 759.62 457.325C759.62 457.668 759.345 457.943 759.036 457.943Z" fill="#222236" />
                    <path d="M759.036 429.429H-139.416C-139.725 429.429 -140 429.154 -140 428.811C-140 428.502 -139.725 428.228 -139.416 428.228H759.036C759.345 428.228 759.62 428.502 759.62 428.811C759.62 429.154 759.345 429.429 759.036 429.429Z" fill="#222236" />
                    <path d="M759.036 400.915H-139.416C-139.725 400.915 -140 400.64 -140 400.297C-140 399.988 -139.725 399.714 -139.416 399.714H759.036C759.345 399.714 759.62 399.988 759.62 400.297C759.62 400.64 759.345 400.915 759.036 400.915Z" fill="#222236" />
                    <path d="M759.036 372.4H-139.416C-139.725 372.4 -140 372.126 -140 371.783C-140 371.474 -139.725 371.199 -139.416 371.199H759.036C759.345 371.199 759.62 371.474 759.62 371.783C759.62 372.126 759.345 372.4 759.036 372.4Z" fill="#222236" />
                    <path d="M759.036 343.886H-139.416C-139.725 343.886 -140 343.612 -140 343.268C-140 342.96 -139.725 342.685 -139.416 342.685H759.036C759.345 342.685 759.62 342.96 759.62 343.268C759.62 343.612 759.345 343.886 759.036 343.886Z" fill="#222236" />
                    <path d="M759.036 315.372H-139.416C-139.725 315.372 -140 315.097 -140 314.754C-140 314.445 -139.725 314.171 -139.416 314.171H759.036C759.345 314.171 759.62 314.445 759.62 314.754C759.62 315.097 759.345 315.372 759.036 315.372Z" fill="#222236" />
                    <path d="M759.036 286.858H-139.416C-139.725 286.858 -140 286.583 -140 286.24C-140 285.931 -139.725 285.657 -139.416 285.657H759.036C759.345 285.657 759.62 285.931 759.62 286.274C759.62 286.583 759.345 286.858 759.036 286.858Z" fill="#222236" />
                    <path d="M759.036 258.343H-139.416C-139.725 258.343 -140 258.069 -140 257.76C-140 257.417 -139.725 257.142 -139.416 257.142H759.036C759.345 257.142 759.62 257.417 759.62 257.76C759.62 258.069 759.345 258.343 759.036 258.343Z" fill="#222236" />
                    <path d="M759.036 229.829H-139.416C-139.725 229.829 -140 229.555 -140 229.246C-140 228.903 -139.725 228.628 -139.416 228.628H759.036C759.345 228.628 759.62 228.903 759.62 229.246C759.62 229.555 759.345 229.829 759.036 229.829Z" fill="#222236" />
                    <path d="M759.036 201.315H-139.416C-139.725 201.315 -140 201.04 -140 200.732C-140 200.388 -139.725 200.114 -139.416 200.114H759.036C759.345 200.114 759.62 200.388 759.62 200.732C759.62 201.04 759.345 201.315 759.036 201.315Z" fill="#222236" />
                    <path d="M759.036 172.801H-139.416C-139.725 172.801 -140 172.526 -140 172.217C-140 171.874 -139.725 171.6 -139.416 171.6H759.036C759.345 171.6 759.62 171.874 759.62 172.217C759.62 172.526 759.345 172.801 759.036 172.801Z" fill="#222236" />
                    <path d="M759.036 144.286H-139.416C-139.725 144.286 -140 144.012 -140 143.703C-140 143.36 -139.725 143.085 -139.416 143.085H759.036C759.345 143.085 759.62 143.36 759.62 143.703C759.62 144.012 759.345 144.286 759.036 144.286Z" fill="#222236" />
                    <path d="M759.036 115.772H-139.416C-139.725 115.772 -140 115.498 -140 115.189C-140 114.846 -139.725 114.571 -139.416 114.571H759.036C759.345 114.571 759.62 114.846 759.62 115.189C759.62 115.498 759.345 115.772 759.036 115.772Z" fill="#222236" />
                    <path d="M759.036 87.2579H-139.416C-139.725 87.2579 -140 86.9834 -140 86.6746C-140 86.3315 -139.725 86.057 -139.416 86.057H759.036C759.345 86.057 759.62 86.3315 759.62 86.6746C759.62 86.9834 759.345 87.2579 759.036 87.2579Z" fill="#222236" />
                    <path d="M759.036 58.7437H-139.416C-139.725 58.7437 -140 58.4692 -140 58.1603C-140 57.8172 -139.725 57.5427 -139.416 57.5427H759.036C759.345 57.5427 759.62 57.8172 759.62 58.1603C759.62 58.4692 759.345 58.7437 759.036 58.7437Z" fill="#222236" />
                    <path d="M759.036 30.2294H-139.416C-139.725 30.2294 -140 29.9549 -140 29.6461C-140 29.303 -139.725 29.0285 -139.416 29.0285H759.036C759.345 29.0285 759.62 29.303 759.62 29.6461C759.62 29.9549 759.345 30.2294 759.036 30.2294Z" fill="#222236" />
                    <path d="M759.036 1.71519H-139.416C-139.725 1.71519 -140 1.44069 -140 1.13187C-140 0.788742 -139.725 0.514231 -139.416 0.514231H759.036C759.345 0.514231 759.62 0.788742 759.62 1.13187C759.62 1.44069 759.345 1.71519 759.036 1.71519Z" fill="#222236" />
                    <path d="M730.033 572C729.724 572 729.449 571.725 729.449 571.382V-27.3824C729.449 -27.7255 729.724 -28 730.033 -28C730.376 -28 730.651 -27.7255 730.651 -27.3824V571.382C730.651 571.725 730.376 572 730.033 572Z" fill="#222236" />
                    <path d="M701.064 572C700.721 572 700.446 571.725 700.446 571.382V-27.3824C700.446 -27.7255 700.721 -28 701.064 -28C701.407 -28 701.647 -27.7255 701.647 -27.3824V571.382C701.647 571.725 701.407 572 701.064 572Z" fill="#222236" />
                    <path d="M672.095 572C671.752 572 671.477 571.725 671.477 571.382V-27.3824C671.477 -27.7255 671.752 -28 672.095 -28C672.404 -28 672.678 -27.7255 672.678 -27.3824V571.382C672.678 571.725 672.404 572 672.095 572Z" fill="#222236" />
                    <path d="M643.091 572C642.782 572 642.508 571.725 642.508 571.382V-27.3824C642.508 -27.7255 642.782 -28 643.091 -28C643.435 -28 643.709 -27.7255 643.709 -27.3824V571.382C643.709 571.725 643.435 572 643.091 572Z" fill="#222236" />
                    <path d="M614.122 572C613.779 572 613.505 571.725 613.505 571.382V-27.3824C613.505 -27.7255 613.779 -28 614.122 -28C614.431 -28 614.706 -27.7255 614.706 -27.3824V571.382C614.706 571.725 614.431 572 614.122 572Z" fill="#222236" />
                    <path d="M585.119 572C584.81 572 584.535 571.725 584.535 571.382V-27.3824C584.535 -27.7255 584.81 -28 585.119 -28C585.462 -28 585.737 -27.7255 585.737 -27.3824V571.382C585.737 571.725 585.462 572 585.119 572Z" fill="#222236" />
                    <path d="M556.15 572C555.807 572 555.566 571.725 555.566 571.382V-27.3824C555.566 -27.7255 555.807 -28 556.15 -28C556.493 -28 556.768 -27.7255 556.768 -27.3824V571.382C556.768 571.725 556.493 572 556.15 572Z" fill="#222236" />
                    <path d="M527.181 572C526.838 572 526.563 571.725 526.563 571.382V-27.3824C526.563 -27.7255 526.838 -28 527.181 -28C527.49 -28 527.764 -27.7255 527.764 -27.3824V571.382C527.764 571.725 527.49 572 527.181 572Z" fill="#222236" />
                    <path d="M498.177 572C497.869 572 497.594 571.725 497.594 571.382V-27.3824C497.594 -27.7255 497.869 -28 498.177 -28C498.521 -28 498.795 -27.7255 498.795 -27.3824V571.382C498.795 571.725 498.521 572 498.177 572Z" fill="#222236" />
                    <path d="M469.208 572C468.865 572 468.625 571.725 468.625 571.382V-27.3824C468.625 -27.7255 468.865 -28 469.208 -28C469.552 -28 469.792 -27.7255 469.792 -27.3824V571.382C469.792 571.725 469.552 572 469.208 572Z" fill="#222236" />
                    <path d="M440.239 572C439.896 572 439.621 571.725 439.621 571.382V-27.3824C439.621 -27.7255 439.896 -28 440.239 -28C440.548 -28 440.823 -27.7255 440.823 -27.3824V571.382C440.823 571.725 440.548 572 440.239 572Z" fill="#222236" />
                    <path d="M411.236 572C410.927 572 410.652 571.725 410.652 571.382V-27.3824C410.652 -27.7255 410.927 -28 411.236 -28C411.579 -28 411.854 -27.7255 411.854 -27.3824V571.382C411.854 571.725 411.579 572 411.236 572Z" fill="#222236" />
                    <path d="M382.267 572C381.924 572 381.649 571.725 381.649 571.382V-27.3824C381.649 -27.7255 381.924 -28 382.267 -28C382.61 -28 382.85 -27.7255 382.85 -27.3824V571.382C382.85 571.725 382.61 572 382.267 572Z" fill="#222236" />
                    <path d="M353.298 572C352.955 572 352.68 571.725 352.68 571.382V-27.3824C352.68 -27.7255 352.955 -28 353.298 -28C353.607 -28 353.881 -27.7255 353.881 -27.3824V571.382C353.881 571.725 353.607 572 353.298 572Z" fill="#222236" />
                    <path d="M324.294 572C323.985 572 323.711 571.725 323.711 571.382V-27.3824C323.711 -27.7255 323.985 -28 324.294 -28C324.638 -28 324.912 -27.7255 324.912 -27.3824V571.382C324.912 571.725 324.638 572 324.294 572Z" fill="#222236" />
                    <path d="M295.325 572C294.982 572 294.708 571.725 294.708 571.382V-27.3824C294.708 -27.7255 294.982 -28 295.325 -28C295.634 -28 295.909 -27.7255 295.909 -27.3824V571.382C295.909 571.725 295.634 572 295.325 572Z" fill="#222236" />
                    <path d="M266.322 572C266.013 572 265.738 571.725 265.738 571.382V-27.3824C265.738 -27.7255 266.013 -28 266.322 -28C266.665 -28 266.94 -27.7255 266.94 -27.3824V571.382C266.94 571.725 266.665 572 266.322 572Z" fill="#222236" />
                    <path d="M237.353 572C237.01 572 236.769 571.725 236.769 571.382V-27.3824C236.769 -27.7255 237.01 -28 237.353 -28C237.696 -28 237.971 -27.7255 237.971 -27.3824V571.382C237.971 571.725 237.696 572 237.353 572Z" fill="#222236" />
                    <path d="M208.384 572C208.041 572 207.766 571.725 207.766 571.382V-27.3824C207.766 -27.7255 208.041 -28 208.384 -28C208.693 -28 208.967 -27.7255 208.967 -27.3824V571.382C208.967 571.725 208.693 572 208.384 572Z" fill="#222236" />
                    <path d="M179.38 572C179.072 572 178.797 571.725 178.797 571.382V-27.3824C178.797 -27.7255 179.072 -28 179.38 -28C179.724 -28 179.998 -27.7255 179.998 -27.3824V571.382C179.998 571.725 179.724 572 179.38 572Z" fill="#222236" />
                    <path d="M150.411 572C150.068 572 149.828 571.725 149.828 571.382V-27.3824C149.828 -27.7255 150.068 -28 150.411 -28C150.755 -28 150.995 -27.7255 150.995 -27.3824V571.382C150.995 571.725 150.755 572 150.411 572Z" fill="#222236" />
                    <path d="M121.442 572C121.099 572 120.825 571.725 120.825 571.382V-27.3824C120.825 -27.7255 121.099 -28 121.442 -28C121.751 -28 122.026 -27.7255 122.026 -27.3824V571.382C122.026 571.725 121.751 572 121.442 572Z" fill="#222236" />
                    <path d="M92.439 572C92.1301 572 91.8555 571.725 91.8555 571.382V-27.3824C91.8555 -27.7255 92.1301 -28 92.439 -28C92.7822 -28 93.0568 -27.7255 93.0568 -27.3824V571.382C93.0568 571.725 92.7822 572 92.439 572Z" fill="#222236" />
                    <path d="M63.4699 572C63.1266 572 62.8521 571.725 62.8521 571.382V-27.3824C62.8521 -27.7255 63.1266 -28 63.4699 -28C63.8131 -28 64.0534 -27.7255 64.0534 -27.3824V571.382C64.0534 571.725 63.8131 572 63.4699 572Z" fill="#222236" />
                    <path d="M34.5008 572C34.1576 572 33.883 571.725 33.883 571.382V-27.3824C33.883 -27.7255 34.1576 -28 34.5008 -28C34.8098 -28 35.0843 -27.7255 35.0843 -27.3824V571.382C35.0843 571.725 34.8098 572 34.5008 572Z" fill="#222236" />
                    <path d="M5.49745 572C5.18855 572 4.91396 571.725 4.91396 571.382V-27.3824C4.91396 -27.7255 5.18855 -28 5.49745 -28C5.8407 -28 6.11528 -27.7255 6.11528 -27.3824V571.382C6.11528 571.725 5.8407 572 5.49745 572Z" fill="#222236" />
                    <path d="M-23.4716 572C-23.8148 572 -24.0894 571.725 -24.0894 571.382V-27.3824C-24.0894 -27.7255 -23.8148 -28 -23.4716 -28C-23.1627 -28 -22.8881 -27.7255 -22.8881 -27.3824V571.382C-22.8881 571.725 -23.1627 572 -23.4716 572Z" fill="#222236" />
                    <path d="M-52.475 572C-52.7839 572 -53.0585 571.725 -53.0585 571.382V-27.3824C-53.0585 -27.7255 -52.7839 -28 -52.475 -28C-52.1318 -28 -51.8572 -27.7255 -51.8572 -27.3824V571.382C-51.8572 571.725 -52.1318 572 -52.475 572Z" fill="#222236" />
                    <path d="M-81.4441 572C-81.7873 572 -82.0276 571.725 -82.0276 571.382V-27.3824C-82.0276 -27.7255 -81.7873 -28 -81.4441 -28C-81.1008 -28 -80.8262 -27.7255 -80.8262 -27.3824V571.382C-80.8262 571.725 -81.1008 572 -81.4441 572Z" fill="#222236" />
                    <path d="M-110.413 572C-110.756 572 -111.031 571.725 -111.031 571.382V-27.3824C-111.031 -27.7255 -110.756 -28 -110.413 -28C-110.104 -28 -109.83 -27.7255 -109.83 -27.3824V571.382C-109.83 571.725 -110.104 572 -110.413 572Z" fill="#222236" />
                  </g>
                </g>
                <defs>
                  <filter id="filter0_d_2973_2987" x="-144" y="-32" width="907.62" height="608" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2973_2987" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2973_2987" result="shape" />
                  </filter>
                  <radialGradient id="paint0_radial_2973_2987" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(310 175.5) rotate(90) scale(223.5 251.539)">
                    <stop stop-color="#201f32" />
                    <stop offset="1" stop-color="#201f32" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              <Image src={rankPath} className='relative top-[-130%] left-1/2 transform -translate-x-1/2 w-[40%]' unoptimized width={100} height={100} alt='roobet rank image'></Image>
            </div>

            <div className='h-[20%]'>
              <h1 className="text-white text-3xl font-bold text-center">{rank}</h1>
              <p className=" text-gray-400 text-sm text-center">
                ${amountWagered} Wagered
              </p>
            </div>

            <div className='bg-[#202032] w-[90%] h-[35%] mb-4 rounded-lg p-[5%]'>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">YOUR PROGRESS</span>
                <span className="text-sm font-semibold">{progress.toFixed(2)}%</span>
              </div>
              <div className="relative h-3 rounded-full bg-gray-700">
                <div
                  className="absolute top-0 left-0 h-3 rounded-full bg-yellow-500"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, #DDB43F 0%, #9B7C25 100%)` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-5 w-1.5 bg-white rounded-2xl"
                  style={{
                    left: `calc(${progress}% - 6px)`,
                  }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-2">
                ${remaining.toLocaleString()} Left for Next Rank
              </div>
            </div>
          </div>

          <div className='w-[50%] h-[50vh] bg-[#161625E5] rounded-lg' style={{
            borderRadius: "0.5rem",
            border: "2px solid transparent",
            background: `
              linear-gradient(#161625E5, #161625E5) padding-box, 
              linear-gradient(155.71deg, #25253A -0.11%, rgba(37, 37, 58, 0) 50.4%) border-box
            `,
            backgroundClip: "content-box, border-box",
          }}>

            <div className="py-4 px-4">
              <h1 className="text-3xl font-bold text-white mb-6">{rank.split(" ")[0]}</h1>
              <div className="space-y-4">
                {rewards.map((reward, index) => (
                  <RewardCard
                    key={index}
                    tier={reward.tier}
                    wager={reward.wager}
                    reward={reward.reward}
                    claimed={reward.claimed}
                    canClaim={reward.canClaim}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Roobet;
