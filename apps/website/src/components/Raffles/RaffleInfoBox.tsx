import { ISafeRaffle } from 'types';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faBalanceScale, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { Image as MantineImage } from '@mantine/core';

import Button from '@/components/ui/Button/Button';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';
import IconBubble from '@/components/ui/IconBubble/IconBubble';
import { useAuth } from '@/hooks/auth';

import giveawayCoinImage from '@/images/giveaway-coin.png';
import EntryCounter from '../giveaway/EntryCounter/EntryCounter';

function getUrl() {
  if (process.env.NODE_ENV === 'production') {
    if (!window.location.hostname.includes('localhost')) {
      return 'https://tck.gg';
    }
    return 'http://localhost:8007';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return '';
}

function RaffleInfobox({ raffle }: { raffle: ISafeRaffle }) {
  const router = useRouter();
  const auth = useAuth();
  const [isEntered, setIsEntered] = useState(false);
  const [hasMaxEntries, setHasMaxEntries] = useState(
    raffle.entries.length === raffle.maxEntries
  );

  useEffect(() => {
    setIsEntered(
      raffle.entries
        .map((entry) => entry.username)
        .includes(auth.user?.username || '')
    );
  }, [auth, raffle.entries]);

  async function handleEnterRaffle() {
    if (!auth.user || isEntered || hasMaxEntries || auth.user.isBanned) {
      return;
    }
    
    const response = await axios.post(
      `${getUrl()}/api/v1/raffles/${raffle.id}/join`,
      {},
      {
        headers: { Authorization: auth.user?.apiKey },
        validateStatus: () => true
      }
    );

    if (response.status === 403) {
      notifications.show({
        title: 'Banned',
        message: 'You have been banned and cannot participate in raffles.',
        color: 'red',
        withBorder: true,
        icon: <IconX />
      });
      return;
    }

    if (response.status === 402) {
      notifications.show({
        title: 'Insufficient Balance',
        message: 'You do not have enough balance to enter this raffle.',
        color: 'yellow',
        withBorder: true,
        icon: <IconX />
      });
      return;
    }

    if (response.status !== 200) {
      notifications.show({
        title: 'Error entering raffle',
        message: 'There was an error entering the raffle, please try again later.',
        color: 'red',
        withBorder: true,
        icon: <IconX />
      });
      return;
    }

    router.replace(router.asPath);
  }

  return (
    <div className="rounded-lg bg-gradient-to-br from-[rgba(29,29,47,0.2)] from-0% via-transparent via-100% to-transparent bg-[#161625] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.33)] backdrop-blur-[45px]">
      <div className="flex items-center justify-between p-3">
        <Button
          leftIcon={faAngleLeft}
          onClick={() => router.push('/raffles')}
        >
          Back
        </Button>
        <Button>
          <FontAwesomeIcon icon={faBalanceScale} />
        </Button>
      </div>

      <div className="border-t border-b border-black flex flex-col items-center gap-6 p-6">
        <MantineImage
          width={268}
          height={136}
          src={`https://cdn.tck.gg/raffles/${raffle.image}`}
          alt={raffle.name}
          fit="contain"
        />

        <div className="text-center">
          <p className="text-white text-xl font-bold">{raffle.name}</p>
        </div>

        <div className="w-full space-y-4">
          <JaggedBackgroundItem fill="#26263A" withShadow>
            <div className="flex justify-center items-center gap-1.5 py-4">
              <Image src={giveawayCoinImage} alt="value" width={18} height={18} />
              <p className="text-white text-sm font-extrabold">
                {raffle.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </JaggedBackgroundItem>

          <div className="w-full bg-[rgba(3,3,11,0.33)] backdrop-blur-[45px] rounded-lg flex flex-col items-center gap-1 py-4">
            <div className="flex items-center gap-1">
              <IconBubble icon={faUser} size={16} />
              <EntryCounter count={raffle.entries.length} max={raffle.maxEntries} />
            </div>
            <p className="text-[#989EAE] text-xs font-medium">Raffle Entries</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 p-6">
        <Button
          variant={isEntered || !auth.user || auth.user.isBanned ? 'secondary' : 'gradient'}
          rightIcon={faAngleRight}
          onClick={handleEnterRaffle}
          fullWidth
          disabled={isEntered || !auth.user || auth.user.isBanned || hasMaxEntries}
        >
          {raffle.winners.length > 0
            ? 'Raffle Ended'
            : auth.user
            ? isEntered
              ? 'Already Entered'
              : hasMaxEntries
              ? 'Max Entries'
              : 'Enter Raffle'
            : 'Login to Enter'}
        </Button>
        <p className="text-[#989EAE] text-sm font-medium">
          End{raffle.winners.length > 0 ? 'ed' : 's'} {new Date(raffle.timestampEnd).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default RaffleInfobox;