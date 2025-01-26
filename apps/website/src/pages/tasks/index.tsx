import Image, { StaticImageData } from 'next/image';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';

import tckcoin from '@/images/coin.png';
import youtubeLogo from '@/images/youtube_logo.png';

interface CardProps {
  logoUrl: string;
  glowColor?: string;
  taskDescription: string;
  rewardAmount: string | number;
  rewardImage: StaticImageData;
  isCompleted?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Tasks() {
  // Updated tasks array to include 'isCompleted'
  const tasks: CardProps[] = [
    {
      logoUrl: youtubeLogo.src,
      glowColor: '#FF3D3D',
      taskDescription: 'Like a YouTube video to earn rewards',
      rewardAmount: '250,000',
      rewardImage: tckcoin,
      buttonText: 'Like',
      onButtonClick: () => {
        alert('You liked the video!');
      },
      isCompleted: false,
    },
    {
      logoUrl: youtubeLogo.src,
      glowColor: '#00FF86',
      taskDescription: 'Watch Livestream',
      rewardAmount: '250,000',
      rewardImage: tckcoin,
      // This one is "completed"
      isCompleted: true,
    },
  ];

  // TaskCard component
  const TaskCard: React.FC<CardProps> = ({
    logoUrl,
    glowColor = '#FF3D3D',
    taskDescription,
    rewardAmount,
    rewardImage,
    isCompleted = false,
    buttonText,
    onButtonClick,
  }) => {
    return (
      <div
        className={`bg-[#161625] ${isCompleted ? 'opacity-50' : '' } text-white w-full rounded-lg shadow-md 
        flex flex-col md:flex-row items-center justify-between gap-3 p-2`}
      >
        {/* Left: Logo with Glow */}
        <div className="relative flex items-center justify-center w-full md:w-[13%] h-[80px] md:h-[60px]">
          {/* Glow overlay */}
          <div
            className={`
              absolute inset-0 
              before:absolute before:inset-0 before:rounded-lg before:blur-md before:opacity-50 
              before:bg-gradient-to-t before:from-[${glowColor}] before:via-[${glowColor}]/30 before:to-transparent before:to-[60%] 
              overflow-hidden bg-[#03030A40]
            `}
          />
          <div className="absolute inset-0 flex justify-center items-center w-full h-full">
            <Image
              src={logoUrl}
              alt="Logo"
              width={80}
              height={60}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Middle: Title + Description */}
        <div className="flex flex-col justify-center gap-1 text-center md:text-left w-full md:w-[70%]">
          <h3 className="text-md font-medium">{taskDescription}</h3>
          <p className="text-xs text-gray-400">{taskDescription}</p>
        </div>

        {/* Right: Reward + Action (or Completed State) */}
        <div className="flex items-center z-0 w-full md:w-[22%] gap-5 justify-center md:justify-end mt-4 md:mt-0 pr-3">
          {/* Reward Display */}
          <JaggedBackgroundItem fill="#0A0A15A8">
            <div className="flex items-center justify-center px-3 rounded-md">
              <Image src={rewardImage} alt="coin" className="w-4 h-4 mr-2" />
              <span className="text-white font-semibold text-xs">
                {rewardAmount}
              </span>
            </div>
          </JaggedBackgroundItem>

          {/* If completed, show "DONE" with green tab; otherwise, show a button */}
          {isCompleted ? (
            <div className="relative flex items-center text-sm font-semibold text-[#00FF86]">
                {/* Green tab shape */}
                <svg
                    width="23"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 top-0"
                >
                    <path
                    d="M3.4 0 0 20l23-2-.7-18h-19Z"
                    fill="#00FF86"
                    fillOpacity="0.1"
                    />
                </svg>

                {/* Use a small left margin so the check is more centered inside the shape */}
                <div className="ml-[6px] flex items-center space-x-2">
                    {/* Checkmark */}
                    <svg width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.4.3a1 1 0 0 1 1.6.6c0 .2 0 .5-.2.7l-5 6.1a1 1 0 0 1-1.3 0L.3 4.5a1 1 0 0 1 1-1.6l.3.3 2.6 2.5L8.4.3Z"
                        fill="#00FF86"
                    />
                    </svg>
                    {/* DONE text */}
                    <span>DONE</span>
                </div>
            </div>
          ) : (
            <button
              className="
                bg-[#26263A] text-white flex items-center 
                px-3 py-2 text-sm font-semibold rounded-lg shadow-md
                hover:bg-[#2E2E48] transition-all duration-200 ease-in-out
                hover:shadow-[0px_1px_0px_0px_#FFFFFF08_inset]
                w-full md:w-auto
              "
              onClick={onButtonClick}
            >
              {buttonText}
              <svg
                className="ml-2 w-4 h-4 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout title="Tasks">
      <PageHeader title="Tasks" />
      <div className="flex flex-col justify-center items-center gap-3 mt-4 max-w-[80vw] mx-auto">
        {tasks.map((task, idx) => (
          <TaskCard key={idx} {...task} />
        ))}
      </div>
    </Layout>
  );
}
