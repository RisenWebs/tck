import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ReactGA from 'react-ga4';
import { Notifications } from '@mantine/notifications';

import ReAuth from '@/components/ReAuth';
import BanBanner from '@/components/BanBanner/BanBanner';
import AgeVerification from '@/components/AgeVerification/AgeVerification';
import TheProviderProvider from '@/components/TheProviderProvider';
import ModalProfile from '@/components/profile/ModalProfile/ModalProfile';
import axios from "axios";

import IAmLiveImage from "@/images/iamlive.png";

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchLiveStatus = async () => {
      const response = await axios.get(
        `https://kick.com/api/v2/channels/tck/livestream`,
        {
          headers: {
            "x-kick-auth": process.env.KICK_AUTH,
          },
          validateStatus: () => {
            return true;
          },
        },
      );
      const data = response.data;
      setIsLive(!!data.data);
    };

    fetchLiveStatus();

    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('G-Q3TE3P2QCN');
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <TheProviderProvider>
        <AgeVerification />
        <BanBanner />
        <ModalProfile />
        <ReAuth>
          <Component {...pageProps} />
        </ReAuth>
      </TheProviderProvider>
      <Notifications />
      {isLive && (
          <div className="fixed bottom-[80px] right-[30px] z-[9999]">
            <div
              className="w-[230px] h-[150px] bg-cover relative"
              style={{
                backgroundImage: `url(${IAmLiveImage.src})`,
              }}
            ></div>
            <iframe
              src={`https://player.kick.com/tck`}
              allowFullScreen={true}
              style={{
                overflow: "hidden",
                border: 0,
              }}
              scrolling="no"
              className="w-[230px] h-[130px] mt-0 absolute top-[70px] rounded-lg"
            ></iframe>
          </div>
        )}
    </>
  );
}

export default App;