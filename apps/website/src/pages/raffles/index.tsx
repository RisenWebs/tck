import { getAllRaffles } from 'database'; // updated import
import { IconHistoryToggle } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import RaffleBox from '@/components/Raffles/RaffleBox';
import { ISafeRaffle } from 'types';

export const getServerSideProps: GetServerSideProps = async () => {
  const raffles = await getAllRaffles();
  return {
    props: {
      raffles
    },
  };
}

function Raffles({
  raffles,
}: {
  raffles: {
    currentRaffles: ISafeRaffle[];
    pastRaffles: ISafeRaffle[];
  };
}) {

  console.log(raffles)
  return (
    <Layout title="Raffles">
      {/* Root container (was .root) */}
      <div className="flex flex-col gap-[42px]">

        {/* Current Raffles */}
        <div>
          <PageHeader title="Raffles" />
          <div className="flex flex-row flex-wrap gap-[8px]">
            {raffles.currentRaffles.length > 0 ? (
              raffles.currentRaffles.map((raffle) => (
                <RaffleBox raffle={raffle} key={raffle.id} />
              ))
            ) : (
              <p className="m-auto">There are no active raffles.</p>
            )}
          </div>
        </div>

        {/* Past Raffles */}
        {raffles.pastRaffles.length > 0 && (
          <div>
            <div className="text-[22px] font-bold mb-[16px] flex gap-[8px]">
              <IconHistoryToggle color="#989eae" />
              <p>Finished Raffles</p>
            </div>
            <div className="flex flex-row flex-wrap gap-[8px]">
              {raffles.pastRaffles.map((raffle) => (
                <RaffleBox raffle={raffle} key={raffle.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Raffles;
