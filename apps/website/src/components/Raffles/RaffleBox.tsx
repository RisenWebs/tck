/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { faAngleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { Image } from '@mantine/core';
import NextImage from 'next/image';

import Button from '@/components/ui/Button/Button';
import IconBubble from '@/components/ui/IconBubble/IconBubble';
import Jagged from '@/components/svg/Jagged';
import BoxBadge from '@/components/BoxBadge/BoxBadge';

import { useAuth } from '@/hooks/auth';
import { ISafeRaffle } from '../../types/raffles';

import raffleCoinImage from '@/images/giveaway-coin.png';

interface RaffleBoxProps {
  raffle: ISafeRaffle;
}

function RaffleBox({ raffle }: RaffleBoxProps) {
  const router = useRouter();
  const auth = useAuth();
  const [isEntered, setIsEntered] = useState(false);

  // Check if there is at least one winner
  const hasWinners = raffle.winners && raffle.winners.length > 0;

  useEffect(() => {
    setIsEntered(
      raffle.entries
        .map((entry) => entry.username)
        .includes(auth.user?.username || '')
    );
  }, [auth, raffle.entries]);

  // Number of days from now until raffle.timestampEnd
  const daysDifference = Math.floor(
    (raffle.timestampEnd - Date.now()) / 1000 / 60 / 60 / 24
  );

  return (
    <div className="relative w-[308px] rounded-[8px]">
      {/* Show 'ENTERED' badge if user is in raffle and there are no winners yet */}
      {isEntered && !hasWinners && (
        <BoxBadge>ENTERED</BoxBadge>
      )}

      {/* TOP SECTION */}
      <div
        className="
          flex flex-col items-center justify-between
          rounded-t-[8px]
          h-[335px]
          px-[20px] pt-[26px] pb-[10px]
          bg-[radial-gradient(94.58%_94.58%_at_50%_5.42%,_rgba(29,_29,_47,_0.20)_0%,_rgba(0,_0,_0,_0)_100%),_rgba(22,_22,_37,_0.80)]
          backdrop-blur-[45px]
        "
      >
        <Image
          width={268}
          height={136}
          src={`https://cdn.tck.gg/raffles/${raffle.image}`}
          alt={raffle.name}
          fit="contain"
        />

        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-bold text-white">
            {raffle.name}
          </p>
          <p className="text-sm text-gray-400">
            {raffle.brand}
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-[10px]">
          <Button
            rightIcon={faAngleRight}
            variant={hasWinners ? 'secondary' : 'gradient'}
            fullWidth
            onClick={() => router.push(`/raffles/${raffle.id}`)}
          >
            View Raffle
          </Button>
          <p className="text-sm text-gray-400 uppercase">
            end
            {hasWinners ? 'ed' : 's'} {!hasWinners && 'in'}{' '}
            {hasWinners
              ? Math.abs(daysDifference)
              : daysDifference}{' '}
            day{Math.abs(daysDifference) !== 1 && 's'}
            {hasWinners && ' ago'}
          </p>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div
        className="
          border-t-2 border-black
          bg-[rgba(3,3,11,0.33)]
          backdrop-blur-[45px]
          h-[42px]
          flex items-center justify-between
          mb-[22px] px-[14px]
          rounded-b-[8px]
        "
      >
        <div className="flex gap-[5px] items-center">
          <IconBubble icon={faUser} size={16} />
          <p className="text-[14px] font-semibold text-gray-500">
            Spots
          </p>
        </div>

        {/* Inline EntryCounter */}
        <p>
          <span
            className="
              font-extrabold text-[15px]
              shadow-[0px_4px_4px_rgba(0,0,0,0.05)]
            "
          >
            {raffle.entries.length}
          </span>
          <span
            className="
              font-extrabold text-[11px] ml-[2px]
              text-[#989eae] shadow-[0px_4px_4px_rgba(0,0,0,0.05)]
            "
          >
            /{raffle.maxEntries.toLocaleString()}
          </span>
        </p>
      </div>

      {/* VALUE WRAPPER */}
      <div className="absolute top-[15px] left-[15px] h-[42px]">
        <div className="absolute inset-0 w-full h-full fill-[rgba(10,10,21,0.66)]">
          <Jagged />
        </div>
        <div
          className="
            relative h-full
            flex justify-center items-center
            gap-[7px]
            text-[14px] font-extrabold
            px-[10px]
            z-[1]
          "
        >
          <NextImage
            src={raffleCoinImage}
            alt="value"
            width={18}
            height={18}
          />
          <p>
            {raffle.value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RaffleBox;
