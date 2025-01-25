import Image from 'next/image';

import roobetIcon from '@/images/affiliate/roobet-mini.png';
import roobetLogo from '@/images/affiliate/roobet.png';
import Layout from '@/components/Layout/Layout';
import { useTheme } from '@/hooks/theme';
import { useEffect, useState, lazy } from 'react';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';
import roobetDemo from '@/images/affiliate/roobet/demo.png';
import clsx from 'clsx';
import Link from 'next/link';

type RewardProps = {
  tier: string;
  wager: string;
  reward: string;
  claimed: boolean;
  canClaim: boolean;
};

const rankToImageName = (rank: string) => {
  return `${rank.split(' ')[0].toLowerCase()}_${
    { I: '1', II: '2', III: '3', IV: '4' }[rank.split(' ')[1]] || '1'
  }`;
};
const rewards: Record<string, RewardProps[]> = {
  silver: [
    { tier: 'SILVER I', wager: '$5,000', reward: '5.00', claimed: false, canClaim: true },
    { tier: 'SILVER II', wager: '$10,000', reward: '10.00', claimed: false, canClaim: false },
    { tier: 'SILVER III', wager: '$25,000', reward: '20.00', claimed: false, canClaim: false },
    { tier: 'SILVER IV', wager: '$50,000', reward: '25.00', claimed: false, canClaim: false }
  ],
  gold: [
    { tier: 'GOLD I', wager: '$75,000', reward: '30.00', claimed: false, canClaim: false },
    { tier: 'GOLD II', wager: '$100,000', reward: '40.00', claimed: false, canClaim: false },
    { tier: 'GOLD III', wager: '$150,000', reward: '50.00', claimed: false, canClaim: false },
    { tier: 'GOLD IV', wager: '$200,000', reward: '60.00', claimed: false, canClaim: false }
  ],
  diamond: [
    { tier: 'DIAMOND I', wager: '$250,000', reward: '70.00', claimed: false, canClaim: false },
    { tier: 'DIAMOND II', wager: '$500,000', reward: '100.00', claimed: false, canClaim: false },
    { tier: 'DIAMOND III', wager: '$1,000,000', reward: '150.00', claimed: false, canClaim: false }
  ]
};

function Roobet() {
  const theme = useTheme();
  const [code] = useState('TCK');
  const [rank, setRank] = useState('Silver I');
  const [rankPath, setRankPath] = useState('');
  const [tier, setTier] = useState('silver');
  const [progress, setProgress] = useState(10);
  const [remaining, setRemaining] = useState(8000);
  const [amountWagered, setAmountWagered] = useState(0);
  const tierKeys = Object.keys(rewards);
  let currentIndex = tierKeys.indexOf(tier);

  const handleNavigation = (direction: 'up' | 'down') => {
    currentIndex = tierKeys.indexOf(tier);
    if (direction === 'up' && currentIndex > 0) {
      setTier(tierKeys[currentIndex - 1]);
    } else if (direction === 'down' && currentIndex < tierKeys.length - 1) {
      setTier(tierKeys[currentIndex + 1]);
    }
  };

  const RewardCard: React.FC<RewardProps> = ({ tier, wager, reward, claimed, canClaim }) => {
    return (
      <div className='flex items-center justify-between bg-[#202032] p-4 rounded-lg shadow-md'>
        <div className='flex items-center space-x-4'>
          <div className='w-10 h-10 bg-[#03030A54] rounded-lg flex items-center justify-center'>
            <Image
              src={`/img/roobeticons/${rankToImageName(tier)}.png`}
              className='w-[60%]'
              unoptimized
              width={100}
              height={100}
              alt='roobet rank image'
            ></Image>
          </div>
          <div>
            <h3 className='text-lg font-extrabold italic text-white'>{tier}</h3>
            <p className='text-sm text-gray-400'>Wager {wager}</p>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <p className='text-sm md:text-lg font-bold text-gray-200'>${reward}</p>
          {claimed ? (
            <button
              className='px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed'
              disabled
            >
              Claimed
            </button>
          ) : (
            <button
              className={clsx(
                'px-4 py-2 text-white font-bold rounded-lg',
                canClaim
                  ? 'bg-gradient-to-r from-[#DDB43F] to-[#9B7C25] hover:from-[#DDAA3F] hover:to-[#9A6A25]'
                  : 'bg-gradient-to-r from-[#DDB43F] to-[#9B7C25] opacity-40 shadow-inner'
              )}
            >
              Claim
            </button>
          )}
        </div>
      </div>
    );
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    setRankPath(`/img/roobethd/${rankToImageName(rank)}.png`);
  }, [rank]);

  useEffect(() => {
    theme.setTheme('roobet');
  }, []);

  return (
    <Layout title='Roobet'>
      <div className='flex px-2 flex-col items-center justify-start min-h-screen mt-[6%]'>
        <div>
          <div className='flex justify-center items-center mt-4'>
            <JaggedBackgroundItem fullWidth={false} fill='#52431d'>
              <Image
                className='w-[100px] sm:w-[100px]  h-[35px] sm:h-[30px] md:h-[26px]'
                src={roobetLogo}
                alt='Roobet'
              />
            </JaggedBackgroundItem>
          </div>

          <div className='text-center'>
            <p className='text-5xl md:text-[67px] font-bold mt-10'>VIP Rewards</p>
            <p className='text-base sm:text-lg md:text-[14px] text-gray-500 text-center md:mt-7'>
              This reward is available for 7 Days upon redemption.
            </p>
          </div>

          <div className='select-none'>
            <div className='absolute top-[10%] left-[30%] hidden md:block'>
              <Image className='w-[35px] h-[35px] -rotate-12' src={roobetIcon} alt='Roobet' />
            </div>
            <div className='absolute top-[23%] right-[28%] hidden md:block'>
              <Image className='w-[35px] h-[35px] rotate-12' src={roobetIcon} alt='Roobet' />
            </div>
            <div className='absolute top-[22%] left-[27%] opacity-20 hidden md:block'>
              <Image className='w-[20px] h-[20px] -rotate-12' src={roobetIcon} alt='Roobet' />
            </div>
            <div className='absolute top-[15%] right-[30%] opacity-20 hidden md:block'>
              <Image className='w-[20px] h-[20px]' src={roobetIcon} alt='Roobet' />
            </div>
          </div>
        </div>

        <div className='mt-[100px] w-full max-w-[1200px]'>
          <div className='flex items-center relative'>
            <svg
              className='absolute'
              width='68'
              height='51'
              viewBox='0 0 48 31'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g filter='url(#filter0_d_0_1)'>
                <path
                  d='M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z'
                  fill='url(#paint0_linear_0_1)'
                  fill-opacity='0.75'
                  shape-rendering='crispEdges'
                />
                <path
                  d='M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z'
                  fill='url(#paint1_linear_0_1)'
                  fill-opacity='0.15'
                  shape-rendering='crispEdges'
                />
              </g>
              <path
                d='M21.148 20.6522L22.0849 20.3801C22.2065 20.3452 22.3199 20.2851 22.4183 20.2035C22.5166 20.1219 22.5977 20.0204 22.6567 19.9054C22.7157 19.7904 22.7513 19.6641 22.7613 19.5344C22.7714 19.4047 22.7557 19.2743 22.7152 19.151C22.6215 18.8614 22.5278 18.5717 22.4256 18.2732C22.9083 18.3268 23.3963 18.2525 23.8435 18.0574C24.2906 17.8623 24.682 17.5528 24.9807 17.1583C25.3566 16.6961 25.7667 16.2647 26.2071 15.8678C26.6581 15.3858 26.9553 14.7731 27.0588 14.1121C27.0833 14.0142 27.0829 13.9115 27.0577 13.8138C27.0324 13.7161 26.9832 13.6268 26.9147 13.5544C26.8463 13.4821 26.7609 13.4292 26.6668 13.4007C26.5726 13.3723 26.473 13.3694 26.3775 13.3922C26.2077 13.4115 26.0363 13.4115 25.8665 13.3922C25.1486 13.3266 24.4417 13.1673 23.7628 12.9182C23.6299 12.8691 23.5162 12.7766 23.4391 12.6548C23.4391 12.6197 23.4391 12.6197 23.4391 12.5846C23.1736 11.8913 22.6577 11.3312 21.9997 11.022C21.7612 10.8639 21.6591 10.7674 21.6761 10.4777C21.6801 10.4222 21.6801 10.3664 21.6761 10.3109C21.6803 10.2554 21.6803 10.1996 21.6761 10.1441C21.6761 10.1441 21.6761 10.0826 21.6761 10.0475V9.56469C21.6768 8.98745 21.5515 8.41743 21.3099 7.89674L21.2077 7.7036V7.65093C21.2107 7.62763 21.2107 7.60401 21.2077 7.5807L21.1395 7.4578V7.39635L20.9351 7.24711L20.8755 7.1681L20.8244 7.09788L20.7307 7.01009L20.654 6.93986L20.5518 6.86963H20.4326C20.3958 6.86556 20.3587 6.86556 20.3219 6.86963H20.1941C19.879 6.86963 19.5127 7.54558 19.3424 7.9933C19.3424 8.04597 19.3424 8.09865 19.2828 8.1601C19.2864 8.20684 19.2864 8.25381 19.2828 8.30056C19.1976 8.58147 19.1125 8.8624 19.0443 9.17843V9.24866L18.9762 9.50324C18.9791 9.56173 18.9791 9.62033 18.9762 9.67881C18.9762 9.77538 18.9762 9.86317 18.9166 9.95095C18.9166 10.0387 18.9166 10.1177 18.8569 10.2055C18.7973 10.2933 18.7888 10.5567 18.7462 10.741V11.0307H18.4652L18.3033 10.9517H18.1841L18.0733 10.8903H18.0308L17.8945 10.8113L17.7668 10.7498L17.6305 10.6796L17.0002 10.7586L16.6084 10.6006H16.5488L16.4296 10.5567H15.5779C15.3274 10.5022 15.0744 10.4612 14.8199 10.4338H13.4656C13.159 10.4338 12.8524 10.4338 12.5373 10.4338C12.0177 10.4777 11.907 10.7235 12.0688 11.2502L12.1199 11.3731V11.5926L12.171 11.6979V11.8033L12.2222 11.8911L12.2733 11.9701V12.0227L12.3244 12.093L12.3755 12.1456V12.1895L12.418 12.2334C12.4391 12.2462 12.4567 12.2644 12.4691 12.2861L12.5202 12.3388L12.5969 12.4002C13.085 12.8343 13.6705 13.1361 14.3003 13.2781C14.7262 13.3834 15.152 13.4624 15.6205 13.5415L16.0463 13.6204C15.9697 14.0067 15.893 14.3579 15.8249 14.7178C15.7314 15.0192 15.7026 15.3379 15.7403 15.6519C15.7781 15.9659 15.8815 16.2677 16.0435 16.5365C16.2054 16.8053 16.4221 17.0346 16.6784 17.2086C16.9348 17.3827 17.2248 17.4973 17.5283 17.5446C17.9505 17.6103 18.3465 17.7964 18.6715 18.0819C18.9966 18.3672 19.2378 18.7406 19.368 19.1598L19.632 20.0377C19.6554 20.2066 19.7219 20.366 19.8246 20.4999C19.9272 20.6337 20.0625 20.7372 20.2165 20.7996C20.3706 20.862 20.538 20.8813 20.7016 20.8554C20.8652 20.8295 21.0192 20.7594 21.148 20.6522Z'
                fill='#DDB440'
              />
              <defs>
                <filter
                  id='filter0_d_0_1'
                  x='0.140625'
                  y='0'
                  width='47.834'
                  height='30.9575'
                  filterUnits='userSpaceOnUse'
                  color-interpolation-filters='sRGB'
                >
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dy='1' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0'
                  />
                  <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_0_1' />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_0_1'
                    result='shape'
                  />
                </filter>
                <linearGradient
                  id='paint0_linear_0_1'
                  x1='24'
                  y1='0'
                  x2='24'
                  y2='30'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#26263A' />
                  <stop offset='1' stop-color='#11111F' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_0_1'
                  x1='60'
                  y1='15'
                  x2='-10.5'
                  y2='15'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#DDB440' stop-opacity='0' />
                  <stop offset='1' stop-color='#DDB440' />
                </linearGradient>
              </defs>
            </svg>

            <h1 className='italic ml-12 mb-1 relative font-bold text-[20px]'>SIGN UP REWARD</h1>
          </div>

          <div className='w-full mt-6 flex flex-wrap gap-5 md:gap-0 relative justify-between items-center rounded-[8px] border border-[#25253A] bg-[#161625E5] px-9 py-7'>
            <div>
              <Image className='w-[105px] h-[27px]' src={roobetLogo} alt='Roobet' />

              <h1 className='font-bold mt-3 text-[20px]'>$15 Reload & Instant Rakeback</h1>
              <p className='text-[#989EAE] text-[13px]'>
                Click on the button below to register instantly.
              </p>
            </div>

            <div className='flex flex-wrap justify-between gap-4 items-center'>
              <JaggedBackgroundItem fullWidth={false} fill='#e5e7eb'>
                <div className='flex justify-between items-center w-[150px]'>
                  <h1 className='font-bold'>TCK</h1>

                  <div className='bg-[#989EAE54] w-[25px] h-[25px] flex rounded-full items-center justify-center'>
                    <svg
                      width='13'
                      height='13'
                      viewBox='0 0 6 7'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M0.742191 2.53506H3.48647C3.89466 2.53506 4.22866 2.84828 4.22866 3.23097V5.8041C4.22866 6.18683 3.89461 6.5 3.48647 6.5H0.742191C0.334001 6.5 0 6.18678 0 5.8041V3.23097C0 2.84823 0.334051 2.53506 0.742191 2.53506ZM2.51353 0.500058H5.25781C5.666 0.500058 6 0.813276 6 1.19596V3.76909C6 4.15183 5.66595 4.465 5.25781 4.465H4.54041V3.23091C4.54041 2.6875 4.06623 2.24289 3.48668 2.24289H1.77149V1.1959C1.77149 0.813171 2.10554 0.5 2.51368 0.5L2.51353 0.500058Z'
                        fill='#989EAE'
                      />
                    </svg>
                  </div>
                </div>
              </JaggedBackgroundItem>

              <button className='flex gap-2 items-center justify-center px-4 py-2 rounded-md font-semibold text-white bg-[#DAA520] hover:bg-[#c9991c] outline-none transition'>
                Claim Reward
                <svg
                  width='10px'
                  height='15px'
                  viewBox='0 0 9 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g filter='url(#filter0_d_2971_1731)'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M2.62792 10.3923C2.55824 10.4614 2.46502 10.5 2.36799 10.5C2.27095 10.5 2.17771 10.4614 2.10804 10.3923C2.07385 10.3583 2.04667 10.3176 2.02811 10.2727C2.00956 10.2278 2 10.1795 2 10.1307C2 10.0819 2.00956 10.0337 2.02811 9.98874C2.04667 9.94381 2.07385 9.90313 2.10804 9.86911L6.01976 5.93156L2.10923 2.13029C2.07517 2.09645 2.0481 2.05598 2.02961 2.01126C2.01112 1.96653 2.00158 1.91847 2.00158 1.86991C2.00158 1.82135 2.01112 1.77329 2.02961 1.72856C2.0481 1.68384 2.07517 1.64334 2.10923 1.6095C2.17834 1.53936 2.27179 1.5 2.36918 1.5C2.46656 1.5 2.56 1.53936 2.62911 1.6095L7 5.93156L2.62792 10.3923Z'
                      fill='white'
                      fill-opacity='0.75'
                      shape-rendering='crispEdges'
                    />
                  </g>
                  <defs>
                    <filter
                      id='filter0_d_2971_1731'
                      x='0'
                      y='0.5'
                      width='9'
                      height='13'
                      filterUnits='userSpaceOnUse'
                      color-interpolation-filters='sRGB'
                    >
                      <feFlood flood-opacity='0' result='BackgroundImageFix' />
                      <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                      />
                      <feOffset dy='1' />
                      <feGaussianBlur stdDeviation='1' />
                      <feComposite in2='hardAlpha' operator='out' />
                      <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'
                      />
                      <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_2971_1731'
                      />
                      <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_2971_1731'
                        result='shape'
                      />
                    </filter>
                  </defs>
                </svg>
              </button>
            </div>

            <svg
              className='absolute left-0'
              width='80%'
              height='100%'
              viewBox='0 0 1256 144'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g filter='url(#filter0_f_2971_1715)'>
                <ellipse
                  cx='193'
                  cy='166.5'
                  rx='193'
                  ry='22.5'
                  fill='url(#paint0_linear_2971_1715)'
                />
              </g>
              <defs>
                <filter
                  id='filter0_f_2971_1715'
                  x='-300'
                  y='-156'
                  width='986'
                  height='645'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='BackgroundImageFix'
                    result='shape'
                  />
                  <feGaussianBlur stdDeviation='150' result='effect1_foregroundBlur_2971_1715' />
                </filter>
                <linearGradient
                  id='paint0_linear_2971_1715'
                  x1='9.0619e-07'
                  y1='165.176'
                  x2='386'
                  y2='165.176'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#DDB43F' />
                  <stop offset='1' stopColor='#9B7C25' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className='mt-[130px] w-full max-w-[1200px] grid md:gap-5 gap-14 lg:grid-cols-2 '>
          <div>
            <div className='flex items-center relative'>
              <svg
                className='absolute'
                width='68'
                height='51'
                viewBox='0 0 48 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g filter='url(#filter0_d_0_1)'>
                  <path
                    d='M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z'
                    fill='url(#paint0_linear_0_1)'
                    fill-opacity='0.75'
                    shape-rendering='crispEdges'
                  />
                  <path
                    d='M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z'
                    fill='url(#paint1_linear_0_1)'
                    fill-opacity='0.15'
                    shape-rendering='crispEdges'
                  />
                </g>
                <path
                  d='M18.9997 13.8665C20.6105 13.8665 21.9163 12.5607 21.9163 10.9499C21.9163 9.33904 20.6105 8.0332 18.9997 8.0332C17.3888 8.0332 16.083 9.33904 16.083 10.9499C16.083 12.5607 17.3888 13.8665 18.9997 13.8665Z'
                  fill='#DDB440'
                />
                <path
                  d='M18.9998 15.3247C16.0773 15.3247 13.6973 17.2847 13.6973 19.6997C13.6973 19.863 13.8256 19.9914 13.9889 19.9914H24.0106C24.174 19.9914 24.3023 19.863 24.3023 19.6997C24.3023 17.2847 21.9223 15.3247 18.9998 15.3247Z'
                  fill='#DDB440'
                />
                <defs>
                  <filter
                    id='filter0_d_0_1'
                    x='0.140625'
                    y='0'
                    width='47.834'
                    height='30.9575'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='1' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_0_1'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect1_dropShadow_0_1'
                      result='shape'
                    />
                  </filter>
                  <linearGradient
                    id='paint0_linear_0_1'
                    x1='24'
                    y1='0'
                    x2='24'
                    y2='30'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#26263A' />
                    <stop offset='1' stop-color='#11111F' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_0_1'
                    x1='60'
                    y1='15'
                    x2='-10.5'
                    y2='15'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#DDB440' stop-opacity='0' />
                    <stop offset='1' stop-color='#DDB440' />
                  </linearGradient>
                </defs>
              </svg>

              <h1 className='italic ml-12 mb-1 relative font-bold text-[20px]'>YOUR RANK</h1>
            </div>

            <div
              style={{ backgroundImage: 'url(/img/img.png)', backgroundSize: 'contain' }}
              className='w-full flex flex-col lg:h-[500px] mt-6 gap-5 md:gap-0 relative rounded-[8px] border border-[#25253A] bg-[#161625E5] px-6 py-5'
            >
              <Image
                className='mx-auto mt-16'
                src={'/img/roobethd/silver_3.png'}
                width='200'
                height='100'
              />
              <h1 className='text-center mt-10 font-bold text-[24px] italic'>SILVER III</h1>
              <p className='text-[#989EAE] text-center mt-1'>$50,000.54 Wagered</p>

              <div className='mt-[50px]'>
                <div className='bg-[#202032] rounded-lg w-full px-5 py-4'>
                  <div className='flex justify-between items-center'>
                    <h1 className='font-bold italic text-[15px]'>YOUR PROGRESS</h1>
                    <h1 className='font-bold italic text-[15px]'>41.5%</h1>
                  </div>

                  <div className='relative w-full h-2.5 mt-3 bg-[#1A1A1A] rounded-full'>
                    <div
                      className='absolute left-0 top-0 h-2 bg-gradient-to-r from-[#dcb33f] to-[#9d7d26] rounded-full'
                      style={{ width: '40%' }}
                    ></div>
                    <div
                      className='absolute top-1/2 bg-white w-1.5 h-4 rounded-[10px] -translate-y-1/2'
                      style={{ left: '39%' }}
                    ></div>
                  </div>

                  <h1 className='text-[#989EAE] font-[600] text-[15px] mt-3'>
                    $50,000.54 Left for Next Rank
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='flex items-center relative'>
              <svg
                className='absolute'
                width='68'
                height='51'
                viewBox='0 0 48 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g filter='url(#filter0_d_0_1)'>
                  <path
                    d='M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z'
                    fill='url(#paint0_linear_0_1)'
                    fill-opacity='0.75'
                    shape-rendering='crispEdges'
                  />
                  <path
                    d='M6.96812 0.38548L0.154595 29.343C0.0776814 29.6699 0.338454 29.9781 0.673562 29.9564L47.5071 26.9284C47.7803 26.9108 47.9885 26.6767 47.9741 26.4033L46.6131 0.473792C46.5992 0.2082 46.3797 0 46.1138 0H7.45483C7.22281 0 7.02127 0.159622 6.96812 0.38548Z'
                    fill='url(#paint1_linear_0_1)'
                    fill-opacity='0.15'
                    shape-rendering='crispEdges'
                  />
                </g>
                <path
                  d='M17.8611 7.25036C17.766 7.24842 17.6719 7.2701 17.5872 7.31344C17.5025 7.35679 17.4299 7.42046 17.3759 7.49874C17.3218 7.57703 17.288 7.6675 17.2775 7.76204C17.267 7.85659 17.2801 7.95226 17.3156 8.0405L17.812 9.28172L17.0042 8.77618C16.8747 8.69531 16.7184 8.66919 16.5696 8.70357C16.4209 8.73796 16.2919 8.83002 16.211 8.95952C16.1301 9.08902 16.104 9.24534 16.1384 9.3941C16.1728 9.54285 16.2648 9.67186 16.3943 9.75273L16.995 10.1279H13.8222C13.4408 10.1283 13.0752 10.2799 12.8055 10.5496C12.5359 10.8192 12.3842 11.1849 12.3838 11.5662V12.1416C12.3838 12.9348 13.0289 13.5799 13.8222 13.5799H24.1784C24.5597 13.5795 24.9253 13.4279 25.195 13.1582C25.4647 12.8885 25.6163 12.5229 25.6167 12.1416V11.5662C25.6163 11.1849 25.4647 10.8192 25.195 10.5496C24.9253 10.2799 24.5597 10.1283 24.1784 10.1279H21.0055L21.6062 9.75196C21.6737 9.71369 21.7328 9.66215 21.7799 9.60043C21.827 9.53872 21.8611 9.46812 21.8802 9.39287C21.8993 9.31762 21.903 9.23929 21.891 9.16259C21.879 9.0859 21.8516 9.01242 21.8105 8.94658C21.7694 8.88074 21.7153 8.82391 21.6517 8.7795C21.588 8.73509 21.516 8.70403 21.44 8.68818C21.364 8.67233 21.2856 8.67203 21.2095 8.68728C21.1333 8.70254 21.0611 8.73304 20.9971 8.77695L20.1878 9.28325L20.6849 8.0405C20.7416 7.8988 20.7398 7.74035 20.6797 7.60001C20.6197 7.45967 20.5063 7.34894 20.3646 7.29217C20.2229 7.23541 20.0644 7.23726 19.9241 7.29733C19.7838 7.35739 19.673 7.47074 19.6163 7.61245L19.0003 9.15361L18.3835 7.61168C18.3415 7.50682 18.2696 7.41665 18.1767 7.3524C18.0838 7.28814 17.974 7.25266 17.8611 7.25036ZM13.2468 14.7299V18.1819C13.2468 19.4515 14.2794 20.4833 15.5482 20.4833H18.4249V14.7299H13.2468ZM19.5756 14.7299V20.4833H22.4523C23.7212 20.4833 24.7537 19.4515 24.7537 18.1819V14.7299H19.5756Z'
                  fill='#DDB440'
                />
                <path
                  d='M17.8611 7.25036C17.766 7.24842 17.6719 7.2701 17.5872 7.31344C17.5025 7.35679 17.4299 7.42046 17.3759 7.49874C17.3218 7.57703 17.288 7.6675 17.2775 7.76204C17.267 7.85659 17.2801 7.95226 17.3156 8.0405L17.812 9.28172L17.0042 8.77618C16.8747 8.69531 16.7184 8.66919 16.5696 8.70357C16.4209 8.73796 16.2919 8.83002 16.211 8.95952C16.1301 9.08902 16.104 9.24534 16.1384 9.3941C16.1728 9.54285 16.2648 9.67186 16.3943 9.75273L16.995 10.1279H13.8222C13.4408 10.1283 13.0752 10.2799 12.8055 10.5496C12.5359 10.8192 12.3842 11.1849 12.3838 11.5662V12.1416C12.3838 12.9348 13.0289 13.5799 13.8222 13.5799H24.1784C24.5597 13.5795 24.9253 13.4279 25.195 13.1582C25.4647 12.8885 25.6163 12.5229 25.6167 12.1416V11.5662C25.6163 11.1849 25.4647 10.8192 25.195 10.5496C24.9253 10.2799 24.5597 10.1283 24.1784 10.1279H21.0055L21.6062 9.75196C21.6737 9.71369 21.7328 9.66215 21.7799 9.60043C21.827 9.53872 21.8611 9.46812 21.8802 9.39287C21.8993 9.31762 21.903 9.23929 21.891 9.16259C21.879 9.0859 21.8516 9.01242 21.8105 8.94658C21.7694 8.88074 21.7153 8.82391 21.6517 8.7795C21.588 8.73509 21.516 8.70403 21.44 8.68818C21.364 8.67233 21.2856 8.67203 21.2095 8.68728C21.1333 8.70254 21.0611 8.73304 20.9971 8.77695L20.1878 9.28325L20.6849 8.0405C20.7416 7.8988 20.7398 7.74035 20.6797 7.60001C20.6197 7.45967 20.5063 7.34894 20.3646 7.29217C20.2229 7.23541 20.0644 7.23726 19.9241 7.29733C19.7838 7.35739 19.673 7.47074 19.6163 7.61245L19.0003 9.15361L18.3835 7.61168C18.3415 7.50682 18.2696 7.41665 18.1767 7.3524C18.0838 7.28814 17.974 7.25266 17.8611 7.25036ZM13.2468 14.7299V18.1819C13.2468 19.4515 14.2794 20.4833 15.5482 20.4833H18.4249V14.7299H13.2468ZM19.5756 14.7299V20.4833H22.4523C23.7212 20.4833 24.7537 19.4515 24.7537 18.1819V14.7299H19.5756Z'
                  fill='url(#paint2_linear_0_1)'
                />
                <defs>
                  <filter
                    id='filter0_d_0_1'
                    x='0.140625'
                    y='0'
                    width='47.834'
                    height='30.9575'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='1' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_0_1'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect1_dropShadow_0_1'
                      result='shape'
                    />
                  </filter>
                  <linearGradient
                    id='paint0_linear_0_1'
                    x1='24'
                    y1='0'
                    x2='24'
                    y2='30'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#26263A' />
                    <stop offset='1' stop-color='#11111F' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_0_1'
                    x1='60'
                    y1='15'
                    x2='-10.5'
                    y2='15'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#DDB440' stop-opacity='0' />
                    <stop offset='1' stop-color='#DDB440' />
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_0_1'
                    x1='12.3838'
                    y1='8.365'
                    x2='25.5515'
                    y2='20.2777'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#FFDB00' />
                    <stop offset='0.474' stop-color='#FFDB00' stop-opacity='0' />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className='italic ml-12 mb-1 relative font-bold text-[20px]'>LEVEL UP REWARDS</h1>
            </div>

            <div className='w-full lg:h-[500px] mt-6 gap-5 md:gap-0 relative  rounded-[8px] border border-[#25253A] bg-[#161625E5] px-6 py-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-[20px] font-bold italic'>SILVER</h1>
                  <p className='text-[14px] italic text-[#989EAE]'>REWARDS</p>
                </div>

                <div className='flex gap-1.5 items-center'>
                  <button
                    onClick={() => handleNavigation('up')}
                    className='bg-[#26263A] border-t border-t-[#989EAE]/50 py-2 px-3 rounded-xl'
                  >
                    <svg
                      width='12'
                      height='25'
                      viewBox='0 0 12 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M10.5332 5.35234L5.99987 0.819004M5.99987 0.819004L1.46654 5.35234M5.99987 0.819004L5.99987 11.1809'
                        stroke='#989EAE'
                        stroke-width='1.2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleNavigation('down')}
                    className='bg-[#26263A] border-t border-t-[#989EAE]/50 py-2 px-3 rounded-xl'
                  >
                    <svg
                      width='12'
                      height='25'
                      viewBox='0 0 12 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M10.5332 6.64766L5.99987 11.181M5.99987 11.181L1.46654 6.64766M5.99987 11.181L5.99987 0.819092'
                        stroke='#989EAE'
                        stroke-width='1.2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className='mt-3 flex flex-col gap-2 '>
                {rewards[tier].map((reward, index) => (
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

        <div className='max-w-[1200px] grid gap-10 lg:grid-cols-2 w-full mt-[100px] lg:mt-[150px]'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-[42px] font-bold'>
              Visit Roobet<span className='text-[#989EAE] text-[30px]'>.com</span>
            </h1>
            <p className='text-[#989EAE] lg:w-[450px]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <div className='w-[190px] mt-5 h-[50px]'>
              <JaggedBackgroundItem fullWidth={false} fill='#161622'>
                <div className='flex justify-between items-center py-4 '>
                  <h1 className='font-bold'>{code}</h1>

                  <div className='bg-[#989EAE54] w-[25px] h-[25px] flex rounded-full items-center justify-center'>
                    <svg
                      width='13'
                      height='13'
                      viewBox='0 0 6 7'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M0.742191 2.53506H3.48647C3.89466 2.53506 4.22866 2.84828 4.22866 3.23097V5.8041C4.22866 6.18683 3.89461 6.5 3.48647 6.5H0.742191C0.334001 6.5 0 6.18678 0 5.8041V3.23097C0 2.84823 0.334051 2.53506 0.742191 2.53506ZM2.51353 0.500058H5.25781C5.666 0.500058 6 0.813276 6 1.19596V3.76909C6 4.15183 5.66595 4.465 5.25781 4.465H4.54041V3.23091C4.54041 2.6875 4.06623 2.24289 3.48668 2.24289H1.77149V1.1959C1.77149 0.813171 2.10554 0.5 2.51368 0.5L2.51353 0.500058Z'
                        fill='#989EAE'
                      />
                    </svg>
                  </div>
                </div>
              </JaggedBackgroundItem>
            </div>

            <button className='flex w-[250px] gap-2 mt-10 items-center justify-center px-4 py-2 rounded-md font-medium text-white bg-[#DDB43F] hover:bg-[#9B7C25] outline-none transition'>
              Claim Reward

              <svg
                width='10px'
                height='15px'
                viewBox='0 0 9 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g filter='url(#filter0_d_2971_1731)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M2.62792 10.3923C2.55824 10.4614 2.46502 10.5 2.36799 10.5C2.27095 10.5 2.17771 10.4614 2.10804 10.3923C2.07385 10.3583 2.04667 10.3176 2.02811 10.2727C2.00956 10.2278 2 10.1795 2 10.1307C2 10.0819 2.00956 10.0337 2.02811 9.98874C2.04667 9.94381 2.07385 9.90313 2.10804 9.86911L6.01976 5.93156L2.10923 2.13029C2.07517 2.09645 2.0481 2.05598 2.02961 2.01126C2.01112 1.96653 2.00158 1.91847 2.00158 1.86991C2.00158 1.82135 2.01112 1.77329 2.02961 1.72856C2.0481 1.68384 2.07517 1.64334 2.10923 1.6095C2.17834 1.53936 2.27179 1.5 2.36918 1.5C2.46656 1.5 2.56 1.53936 2.62911 1.6095L7 5.93156L2.62792 10.3923Z'
                    fill='white'
                    fill-opacity='0.75'
                    shape-rendering='crispEdges'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_d_2971_1731'
                    x='0'
                    y='0.5'
                    width='9'
                    height='13'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='1' />
                    <feGaussianBlur stdDeviation='1' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_2971_1731'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect1_dropShadow_2971_1731'
                      result='shape'
                    />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>

          <div className='bg-gradient-to-b from-[#19182a] via-[#19182a] to-[transparent] p-2.5 rounded-lg'>
            <img src='/img/img_1.png' width='100%' height='200' />
          </div>
        </div>


        <div className="mt-[150px] flex flex-col items-center text-center">
          <h1 className="font-bold text-[36px]">
            High Roller Rewards
          </h1>

          <p className="md:w-[500px] text-[#989EAE]">
            Are you a High Roller? Make a ticket in our Discord and learn about our Exclusive VIP Rewards.
          </p>

          <button className="mt-7 font-medium px-5 py-3 rounded-lg flex items-center gap-3 bg-[#26263A]">
            <svg width="17" height="15" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.8519 1.41248C10.9441 0.983042 9.98619 0.676543 9.00205 0.500626C8.99314 0.499079 8.98398 0.500415 8.97583 0.504453C8.96768 0.508491 8.96095 0.515031 8.95655 0.523175C8.83318 0.748658 8.69668 1.04359 8.60131 1.27449C7.54048 1.10854 6.46142 1.10854 5.40059 1.27449C5.2942 1.01727 5.17385 0.766438 5.04009 0.523175C5.03561 0.51512 5.02886 0.508655 5.02074 0.504631C5.01261 0.500606 5.0035 0.49921 4.9946 0.500626C4.01023 0.675602 3.05212 0.982259 2.14475 1.41248C2.13699 1.41554 2.13049 1.42127 2.12638 1.42872C0.311645 4.22381 -0.186225 6.95036 0.0578972 9.64263C0.0587722 9.65526 0.0666471 9.66789 0.076272 9.676C1.13302 10.4829 2.31502 11.0989 3.57186 11.4979C3.58073 11.5008 3.59027 11.5007 3.59908 11.4976C3.60789 11.4945 3.61552 11.4886 3.62086 11.4808C3.89036 11.102 4.1301 10.7024 4.3366 10.2821C4.34091 10.2734 4.34238 10.2636 4.3408 10.254C4.33923 10.2444 4.33468 10.2356 4.32785 10.2289C4.32333 10.2245 4.31797 10.2211 4.3121 10.219C3.93512 10.0696 3.57002 9.8902 3.22011 9.68232C3.21034 9.67661 3.20307 9.66724 3.19981 9.65616C3.19656 9.64508 3.19756 9.63313 3.20261 9.62279C3.20559 9.61607 3.21009 9.6102 3.21574 9.60565C3.28924 9.54883 3.36274 9.4893 3.43274 9.42977C3.43892 9.42465 3.44634 9.42136 3.4542 9.42024C3.46206 9.41913 3.47007 9.42024 3.47736 9.42346C5.76896 10.5022 8.24956 10.5022 10.5132 9.42346C10.5207 9.42009 10.529 9.41889 10.5372 9.42C10.5454 9.42112 10.5531 9.42449 10.5595 9.42977C10.6295 9.4893 10.703 9.54883 10.7765 9.60565C10.7825 9.61014 10.7873 9.61608 10.7905 9.62294C10.7936 9.62979 10.7951 9.63736 10.7948 9.64495C10.7944 9.65255 10.7923 9.65994 10.7885 9.66646C10.7847 9.67298 10.7794 9.67843 10.773 9.68232C10.4239 9.8921 10.0584 10.0713 9.68017 10.2181C9.67414 10.2203 9.66866 10.2239 9.66412 10.2286C9.65959 10.2333 9.65611 10.2389 9.65392 10.2451C9.6519 10.2511 9.65109 10.2575 9.65154 10.2639C9.65199 10.2702 9.65369 10.2764 9.65655 10.2821C9.86654 10.7015 10.1072 11.102 10.3714 11.4808C10.3768 11.4886 10.3844 11.4945 10.3932 11.4976C10.402 11.5007 10.4115 11.5008 10.4204 11.4979C11.6794 11.1002 12.8633 10.484 13.9213 9.676C13.9266 9.67222 13.931 9.66726 13.9341 9.66148C13.9373 9.6557 13.9392 9.64926 13.9396 9.64263C14.2319 6.53006 13.4505 3.82606 11.8694 1.42962C11.8678 1.42566 11.8654 1.42209 11.8624 1.41914C11.8594 1.41619 11.8558 1.41392 11.8519 1.41248ZM4.67872 8.00291C3.98836 8.00291 3.42049 7.34992 3.42049 6.549C3.42049 5.74718 3.97786 5.09418 4.67872 5.09418C5.38484 5.09418 5.94746 5.75259 5.93696 6.549C5.93696 7.34992 5.37959 8.00291 4.67872 8.00291ZM9.33017 8.00291C8.64068 8.00291 8.07194 7.34992 8.07194 6.549C8.07194 5.74718 8.62931 5.09418 9.33017 5.09418C10.0363 5.09418 10.5998 5.75259 10.5884 6.549C10.5884 7.34992 10.0363 8.00291 9.33017 8.00291Z"
                fill="white" />
            </svg>
            Join Server
          </button>
        </div>

        <div className="mt-[100px]"></div>
      </div>
    </Layout>
  );
}

export default Roobet;
