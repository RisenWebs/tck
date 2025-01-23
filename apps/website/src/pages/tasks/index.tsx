import JaggedBackgroundItem from "@/components/JaggedBackgroundItem/JaggedBackgroundItem";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import tckcoin from "@/images/coin.png"
import Image from "next/image";

interface CardProps {
    logoSvg: JSX.Element;
    glowColor?: string;
    taskDescription: string;
    rewardAmount: string | number;
    buttonText?: string;
    onButtonClick: () => void;
    rewardImage: string;
}



export default function Tasks() {
    const TaskCard: React.FC<CardProps> = ({
        logoSvg,
        glowColor = "#FF3D3D",
        taskDescription,
        rewardAmount,
        buttonText,
        onButtonClick,
        rewardImage,
    }) => {
        return (
            <div className="bg-[#161625] text-white w-full max-w-[80vw] h-auto rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative flex items-center justify-center w-full md:w-[13%] h-[120px] md:h-[80px] mb-4 md:mb-0">
                    <div
                        className={`absolute inset-0 before:absolute before:inset-0 before:rounded-lg before:blur-md before:opacity-50 before:bg-gradient-to-t before:from-[${glowColor}] before:via-[${glowColor}]/30 before:to-transparent before:to-[60%] overflow-hidden bg-[#03030A40]`}
                    />
                    <div className="absolute inset-0 flex justify-center items-center w-full h-full">
                        {logoSvg}
                    </div>
                </div>
    
                <div className="flex flex-col justify-center gap-2 text-center md:text-left md:ml-4 w-full md:w-[70%]">
                    <h3 className="text-lg font-semibold">{taskDescription}</h3>
                    <p className="text-sm text-gray-400">{taskDescription}</p>
                </div>
    
                <div className="flex items-center z-0 w-full md:w-[22%] gap-5 justify-center md:justify-end mt-4 md:mt-0 pr-3">
                    <JaggedBackgroundItem fill="#0A0A15A8">
                        <div className="flex items-center px-4 rounded-md">
                            <Image src={rewardImage} alt="coin" className="w-5 h-5 mr-2" />
                            <span className="text-white font-semibold text-sm">{rewardAmount}</span>
                        </div>
                    </JaggedBackgroundItem>
                    <button
                        className="bg-[#26263A] text-white flex items-center px-5 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-[#2E2E48] transition-all duration-200 ease-in-out  hover:shadow-[0px_1px_0px_0px_#FFFFFF08_inset]"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                        <svg
                            className="ml-2 w-5 h-5 fill-current text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };
    

    const handleButtonClick = () => {

    }

    return (
        <Layout title="Tasks">
            <PageHeader title="Tasks" />

            <div className="min-h-screen flex items-center justify-center">
                <TaskCard
                    logoSvg={(<svg className="" width="72" height="16" viewBox="0 0 72 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.875 12.9865C36.0007 12.6598 36.0638 12.1259 36.0638 11.3849V8.2627C36.0638 7.54355 36.0007 7.0179 35.875 6.68543C35.7491 6.35314 35.5274 6.18684 35.21 6.18684C34.9034 6.18684 34.687 6.35314 34.5613 6.68543C34.4354 7.0179 34.3725 7.54355 34.3725 8.2627V11.3849C34.3725 12.1259 34.4326 12.6598 34.5532 12.9865C34.6734 13.3136 34.8923 13.4769 35.21 13.4769C35.5274 13.4769 35.7491 13.3136 35.875 12.9865ZM33.3299 14.5558C32.8753 14.251 32.5523 13.7767 32.361 13.1336C32.1694 12.4909 32.0737 11.6354 32.0737 10.5675V9.11273C32.0737 8.03397 32.183 7.16755 32.402 6.5138C32.6209 5.85999 32.9628 5.38337 33.4284 5.0836C33.8935 4.78403 34.5039 4.6341 35.2593 4.6341C36.0037 4.6341 36.6002 4.78676 37.0491 5.09175C37.4978 5.39683 37.8263 5.87374 38.0344 6.52196C38.2422 7.17041 38.3463 8.03397 38.3463 9.11273V10.5675C38.3463 11.6354 38.245 12.4937 38.0426 13.142C37.8399 13.7903 37.5114 14.2644 37.0572 14.5639C36.6029 14.8636 35.9872 15.0135 35.21 15.0135C34.4107 15.0135 33.7839 14.8608 33.3299 14.5558Z" fill="white" />
                        <path d="M68.494 6.37417C68.3793 6.51579 68.3023 6.74744 68.2641 7.06878C68.2256 7.3903 68.2069 7.87786 68.2069 8.53168V9.2509H69.8651V8.53168C69.8651 7.88889 69.8432 7.40125 69.7995 7.06878C69.7557 6.73649 69.6765 6.50234 69.5615 6.36601C69.4464 6.22975 69.2686 6.16155 69.0278 6.16155C68.7868 6.16155 68.6089 6.23261 68.494 6.37417ZM68.2069 10.5913V11.0981C68.2069 11.7411 68.2256 12.2233 68.2641 12.5446C68.3023 12.8661 68.3815 13.1004 68.5023 13.2476C68.6227 13.3945 68.8085 13.4683 69.0606 13.4683C69.3997 13.4683 69.6326 13.3374 69.7585 13.0758C69.8842 12.8143 69.9526 12.3785 69.9636 11.7681L71.9178 11.8826C71.9287 11.9701 71.9342 12.0899 71.9342 12.2421C71.9342 13.1686 71.6798 13.8606 71.1706 14.3182C70.6618 14.7757 69.9416 15.0047 69.0113 15.0047C67.8948 15.0047 67.1119 14.6561 66.6632 13.9585C66.2141 13.2614 65.9897 12.1825 65.9897 10.7221V8.97303C65.9897 7.46925 66.2224 6.3716 66.6878 5.67935C67.1529 4.98746 67.9494 4.64145 69.0771 4.64145C69.8541 4.64145 70.4508 4.78315 70.8669 5.0664C71.2827 5.34994 71.5757 5.79128 71.7454 6.39041C71.9151 6.98983 72 7.81813 72 8.87499V10.5913H68.2069Z" fill="white" />
                        <path d="M27.8118 10.4037L25.2337 1.1356H27.4833L28.3864 5.33649C28.6165 6.37195 28.786 7.25457 28.8954 7.98445H28.9612C29.0378 7.46146 29.2075 6.58435 29.4702 5.35287L30.4062 1.1356H32.6559L30.045 10.4037V14.85H27.8118V10.4037Z" fill="white" />
                        <path d="M45.663 4.83011V14.85H43.8895L43.6924 13.6241H43.6432C43.1614 14.5503 42.4388 15.0133 41.4756 15.0133C40.8078 15.0133 40.3153 14.7956 39.9977 14.3595C39.6802 13.9239 39.5216 13.2426 39.5216 12.3164V4.83011H41.7877V12.1856C41.7877 12.6326 41.837 12.9512 41.9355 13.1417C42.034 13.3327 42.1982 13.4278 42.4281 13.4278C42.6252 13.4278 42.814 13.3681 42.9945 13.2479C43.1752 13.1281 43.3092 12.9759 43.3969 12.7905V4.83011H45.663Z" fill="white" />
                        <path d="M57.2866 4.83011V14.85H55.5131L55.316 13.6241H55.267C54.7848 14.5503 54.0624 15.0133 53.0992 15.0133C52.4314 15.0133 51.9389 14.7956 51.6213 14.3595C51.3038 13.9239 51.1452 13.2426 51.1452 12.3164V4.83011H53.4113V12.1856C53.4113 12.6326 53.4604 12.9512 53.5589 13.1417C53.6576 13.3327 53.8218 13.4278 54.0516 13.4278C54.2488 13.4278 54.4376 13.3681 54.6181 13.2479C54.7988 13.1281 54.9328 12.9759 55.0205 12.7905V4.83011H57.2866Z" fill="white" />
                        <path d="M51.8207 2.95033H49.5711V14.85H47.3543V2.95033H45.1047V1.1359H51.8207V2.95033Z" fill="white" />
                        <path d="M62.7094 10.5189C62.7094 11.2491 62.679 11.8212 62.6189 12.2352C62.5588 12.6495 62.4575 12.9437 62.3151 13.1178C62.1728 13.2922 61.981 13.3793 61.7405 13.3793C61.5542 13.3793 61.3818 13.336 61.2232 13.2485C61.0642 13.1614 60.9359 13.0307 60.8372 12.8562V7.16798C60.9138 6.89576 61.0452 6.67226 61.2313 6.49779C61.4175 6.32375 61.6197 6.23636 61.8388 6.23636C62.0688 6.23636 62.2465 6.32633 62.3726 6.50601C62.4983 6.68578 62.586 6.98821 62.6353 7.41331C62.6847 7.83818 62.7094 8.44298 62.7094 9.22754V10.5189ZM64.7865 6.43179C64.6495 5.79995 64.4277 5.3423 64.1213 5.05876C63.8148 4.77566 63.3933 4.63389 62.857 4.63389C62.441 4.63389 62.0524 4.75111 61.6912 4.98525C61.33 5.21963 61.0506 5.52751 60.8537 5.90887H60.837L60.8372 0.629145H58.6534V14.8497H60.5252L60.7552 13.9019H60.8043C60.9794 14.2396 61.2421 14.5066 61.5925 14.7028C61.9428 14.8988 62.3316 14.997 62.7586 14.997C63.5246 14.997 64.0885 14.6454 64.4499 13.9427C64.8111 13.2397 64.9918 12.142 64.9918 10.649V9.06349C64.9918 7.94123 64.9231 7.064 64.7865 6.43179Z" fill="white" />
                        <path d="M22.4824 2.4984C22.2184 1.51504 21.4404 0.740472 20.4524 0.477649C18.6616 4.71006e-07 11.4811 0 11.4811 0C11.4811 0 4.30064 4.71006e-07 2.50989 0.477649C1.522 0.740472 0.743872 1.51504 0.479843 2.4984C0 4.28095 0 7.99993 0 7.99993C0 7.99993 0 11.7191 0.479843 13.5015C0.743872 14.4848 1.522 15.2595 2.50989 15.5222C4.30064 16 11.4811 16 11.4811 16C11.4811 16 18.6616 16 20.4524 15.5222C21.4404 15.2595 22.2184 14.4848 22.4824 13.5015C22.9621 11.7191 22.9621 7.99993 22.9621 7.99993C22.9621 7.99993 22.9621 4.28095 22.4824 2.4984Z" fill="#FF3D3D" />
                        <path d="M9.18489 11.4286V4.57141L15.1505 8.00003L9.18489 11.4286Z" fill="white" />
                    </svg>)}
                    glowColor="#FF3D3D"
                    taskDescription="Like YouTube video to earn rewards"
                    rewardAmount="250,000"
                    rewardImage={tckcoin}
                    buttonText="Like"
                    onButtonClick={handleButtonClick}
                />
            </div>
        </Layout>
    )
}