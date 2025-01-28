/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getRaffle } from 'database';
import { ISafeRaffle } from 'types';
import { faChevronLeft, faTicket } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mantine/core';

import Layout from '@/components/Layout/Layout';
import GiveawayInfobox from '@/components/giveaway/GiveawayInfobox/GiveawayInfobox';
import GiveawayEntry from '@/components/giveaway/GiveawayEntry/GiveawayEntry';
import IconBubble from '@/components/ui/IconBubble/IconBubble';
import JaggedBackgroundItem from '@/components/JaggedBackgroundItem/JaggedBackgroundItem';
import { useAuth } from '@/hooks/auth';
import RaffleInfobox from '@/components/Raffles/RaffleInfoBox';

export async function getServerSideProps(ctx: any) {
  const { raffle } = ctx.params;
  const fetchedRaffle = await getRaffle(raffle);

  if (!fetchedRaffle) 
    return { redirect: { destination: '/raffles' } };

  return { props: { raffle: fetchedRaffle } };
}

export default function RafflesPage({ raffle }: { raffle: ISafeRaffle }) {
  const auth = useAuth();
  const [myEntry, setMyEntry] = useState(-1);
  const [winnerOverlayOpen, setWinnerOverlayOpen] = useState(raffle.winners.length > 0);

  useEffect(() => {
    const userEntry = raffle.entries.find(e => e.username === auth.user?.username);
    setMyEntry(userEntry ? userEntry.slot + 1 : -1);
  }, [auth.user?.username, raffle.entries]);

  return (
    <Layout className="flex gap-4 flex-col lg:flex-row">
      <div className="w-full lg:w-[308px] flex flex-col gap-4">
        <RaffleInfobox raffle={raffle} />
        {myEntry > -1 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-[#989eae] font-extrabold text-[14px] [text-shadow:0_4px_4px_rgba(0,0,0,0.05)]">
              <IconBubble icon={faTicket} size={22} />
              <p>My Entry</p>
            </div>

            <div className="text-[#989eae] font-bold text-[14px] rounded-[55px] bg-[rgba(152,158,174,0.15)] px-[15px] py-[8px]">
              <p>#{myEntry}</p>
            </div>
          </div>
        )}
      </div>

      <div
        className={clsx(
          "scrollbar-hide relative flex-grow rounded-lg min-h-[300px] max-h-[900px] overflow-y-scroll bg-[radial-gradient(94.58%_94.58%_at_50%_5.42%,_rgba(29,29,47,0.20)_0%,_rgba(0,0,0,0)_100%,_rgba(22,22,37,0)_100%),_rgba(22,22,37,0.50)] shadow-[0_2px_0_0_rgba(0,0,0,0.33)] backdrop-blur-[45px] lg:max-h-[500px]",
           winnerOverlayOpen && raffle.winners.length > 0 && "overflow-y-hidden"
        )}
      >
        {winnerOverlayOpen && raffle.winners.length > 0 && (
          <div className="absolute z-[1] w-full h-[900px] flex flex-col items-center justify-center gap-16 bg-[rgba(22,22,37,0.66)] backdrop-blur-[10px] overflow-hidden">
           <div className="flex flex-wrap justify-center gap-8">
                {raffle.winners.map((winner, index) => {
                  const winnerEntry = raffle.entries.find(entry => entry.username === winner);
                  return (
                    <div key={winner} className="flex flex-col items-center gap-2">
                      <Avatar 
                        style={{ 
                          border: '4px solid #131320', 
                          backgroundColor: 'rgba(38, 38, 58, 0.75)', 
                          borderRadius: '50%' 
                        }} 
                        h={100} 
                        w={100}
                      >
                        {winner.toUpperCase().charAt(0)}
                      </Avatar>
                      <p className="text-white font-extrabold text-[18px]">{winner}</p>
                      <JaggedBackgroundItem fill="#26263A">
                        <p className="text-[#9391C9] font-bold text-[14px]">
                          Ticket #{(winnerEntry?.slot ?? -1 + 1).toLocaleString('en-US')}
                        </p>
                      </JaggedBackgroundItem>
                    </div>
                  );
                })}
              </div>
            
            <div onClick={() => setWinnerOverlayOpen(false)} className="flex items-center justify-center gap-2 cursor-pointer">
              <FontAwesomeIcon icon={faChevronLeft} className="[width:9px] [height:9px] text-[rgba(147,145,201,0.75)] [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.04))]" />
              <p className="text-[#9391C9] [text-shadow:0_1px_2px_rgba(0,0,0,0.04)] text-[14px] font-semibold">View All Entries</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-start justify-center gap-[10px] p-[22px]">
          {Array(raffle.maxEntries).fill(0).map((_, index) => {
            const theEntry = raffle.entries.find(entry => entry.slot === index);

            return <GiveawayEntry key={index} position={index + 1} display={theEntry ? theEntry.username.toUpperCase().charAt(0) : ''} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
