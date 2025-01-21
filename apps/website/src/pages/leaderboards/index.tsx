import { useEffect, useState } from "react";
import { Prisma, getAllLeaderboards } from "database";
import { LeaderboardType, ThemedLeaderboard } from "types";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import clsx from "clsx";
import { nextSunday } from "date-fns";

import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import Leaderboard from "@/components/leaderboard/Leaderboard/Leaderboard";
import LeaderboardPodiumBox from "@/components/leaderboard/LeaderboardPodiumBox/LeaderboardPodiumBox";
import CountdownTimer from "@/components/ui/CountdownTimer/CountdownTimer";
import TabPillSwitch from "@/components/TabPillSwitch/TabPillSwitch";
import OfferCard from "@/components/leaderboard/LeaderboardOfferCard";

import { useTheme } from "@/hooks/theme";
import { useCountdown } from "@/hooks/countdown";

import classes from "./leaderboards.module.scss";

// Logos
import roobetLogo from "../../images/affiliate/roobet.png";
import csgobigLogo from "../../images/affiliate/csgobig.png";
import packdrawLogo from "../../images/affiliate/packdraw.png";
// Icon
import bigcoinIcon from "@/images/affiliate/big-coin.png";

// Leaderboard prize constants
import { CSGOBIG_PRIZES_TOTAL, ROOBET_PRIZES_TOTAL } from "@/data/leaderboard";
import { commaNumber } from "custom-util";

const brandOfferConfig: Record<string, OfferCardProps> = {
  roobet: {
    brandLogo: roobetLogo.src,
    mainText: "Instant Roowards & $15 Reload",
    subText: "Click on the button below to register instantly.",
    code: "TCK",
    gradientFrom: "#DDB43F",
    gradientTo: "#9B7C25",
    buttonStyle: "gradient-roobet",
  },
  csgobig: {
    brandLogo: csgobigLogo.src,
    mainText: "Instant Roowards & $15 Reload",
    subText: "Click on the button below to register instantly.",
    code: "TCK",
    gradientFrom: "#E1B56F",
    gradientTo: "#94713B",
    buttonStyle: "gradient-csgobig",
  },
  packDraw: {
    brandLogo: packdrawLogo.src,
    mainText: "5% Deposit Bonus",
    subText: "Click on the button below to register instantly.",
    code: "TCK",
    gradientFrom: "#A744FF",
    gradientTo: "#6E28AC",
    buttonStyle: "gradient-packdraw",
  },
};

export type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

export async function getStaticProps() {
  return {
    props: {
      leaderboards: await getAllLeaderboards(),
    },
    revalidate: 3600,
  };
}

function Leaderboards({
  leaderboards,
}: {
  leaderboards: { [key in LeaderboardType]: ILeaderboard };
}) {
  const now = new Date();
  const sunday = nextSunday(now);

  // Countdown to first day of next month
  const [days, hours, minutes] = useCountdown(
    new Date(now.getFullYear(), now.getMonth() + 1, 1)
  );

  const [selectedLeaderboard, setSelectedLeaderboard] =
    useState<ThemedLeaderboard>("roobet");

  const theme = useTheme();

  // On mount, default theme to "roobet"
  useEffect(() => {
    theme.setTheme("roobet");
  }, []);

  // Update theme when switching tabs
  useEffect(() => {
    theme.setTheme(selectedLeaderboard);
  }, [selectedLeaderboard]);

  const spots = leaderboards[selectedLeaderboard]?.spots || [];

  return (
    <Layout title="Leaderboards">
      <div className={classes.root}>
        <PageHeader title="Leaderboards" />

        {/* Tab Switch */}
        <div className={classes.top}>
          <TabPillSwitch
            tabs={[
              { image: roobetLogo, name: "roobet" },
              { image: csgobigLogo, name: "csgobig" },
            ]}
            activeTab={selectedLeaderboard}
            setActiveTab={(name: string) =>
              setSelectedLeaderboard(name as ThemedLeaderboard)
            }
          />

          {/* Leaderboard title/promo */}
          {selectedLeaderboard === "roobet" && (
            <p className={classes.leaderboardsPromo}>
              ${commaNumber(ROOBET_PRIZES_TOTAL)} LEADERBOARD
            </p>
          )}
          {selectedLeaderboard === "csgobig" && (
            <p className={classes.leaderboardsPromo}>
              <>
                <Image
                  src={bigcoinIcon}
                  alt="Big Coin"
                  width={48}
                  height={48}
                  style={{ verticalAlign: "middle", marginRight: "4px" }}
                />
                {commaNumber(CSGOBIG_PRIZES_TOTAL)} LEADERBOARD
              </>
            </p>
          )}

          {/* Code Promo */}
          <p className={classes.codePromo}>
            {selectedLeaderboard === "csgobig" ? "Deposit" : "Wager"} Under Code{" "}
            <span
              className={clsx(
                classes.code,
                selectedLeaderboard === "roobet" && classes.roobetText,
                selectedLeaderboard === "csgobig" && classes.csgobigText
              )}
            >
              TCK
            </span>
          </p>
        </div>

        {/* If no spots, show message */}
        {spots.length === 0 && (
          <p>There are no published leaderboards for this site.</p>
        )}

        {/* If we have data, show podium + leaderboard */}
        {spots.length > 0 && (
          <>
            {/* Top 3 Podium (desktop) */}
            <div className={clsx(classes.tiltGroup, classes.hideOnMobile)}>
              {/* 2nd place */}
              {spots[1] && (
                <Tilt
                  tiltAngleXInitial={5}
                  tiltAngleYInitial={-7}
                  glareEnable
                  glareMaxOpacity={0.08}
                  glarePosition="bottom"
                  className={classes.tiltItem}
                  style={{ top: 50 }}
                >
                  <LeaderboardPodiumBox
                    leaderboardSpot={spots[1]}
                    position={2}
                    rewardType={selectedLeaderboard}
                  />
                </Tilt>
              )}
              {/* 1st place */}
              {spots[0] && (
                <Tilt
                  tiltAngleXInitial={5}
                  tiltAngleYInitial={9}
                  glareEnable
                  glareMaxOpacity={0.08}
                  glarePosition="bottom"
                  className={classes.tiltItem}
                  style={{ top: 0 }}
                >
                  <LeaderboardPodiumBox
                    leaderboardSpot={spots[0]}
                    position={1}
                    rewardType={selectedLeaderboard}
                  />
                </Tilt>
              )}
              {/* 3rd place */}
              {spots[2] && (
                <Tilt
                  tiltAngleXInitial={9}
                  tiltAngleYInitial={9}
                  glareEnable
                  glareMaxOpacity={0.08}
                  glarePosition="bottom"
                  className={classes.tiltItem}
                  style={{ top: 75 }}
                >
                  <LeaderboardPodiumBox
                    leaderboardSpot={spots[2]}
                    position={3}
                    rewardType={selectedLeaderboard}
                  />
                </Tilt>
              )}
            </div>

            {/* Timer (desktop) */}
            <div className={clsx(classes.timerWrapper, classes.hideOnMobile)}>
              {/* Both use the same monthly countdown here */}
              <CountdownTimer
                days={days}
                hours={hours}
                minutes={minutes}
              />
            </div>

            {/* NEW: Generic OfferCard below timer */}
            <div className="w-full max-w-3xl mx-auto mb-5">
              <OfferCard {...brandOfferConfig[selectedLeaderboard]} />
            </div>

            {/* Full leaderboard table */}
            {spots.length > 0 && (
              <Leaderboard leaderboard={leaderboards[selectedLeaderboard]} />
            )}

            {/* Disclaimer only for roobet */}
            {selectedLeaderboard === "roobet" && (
              <p className={classes.disclaimer}>
                Any table game wager abuse that Roobet detects is subject to disqualification. 
                For example: $5-$100 wager per Blackjack hand and throughout the 
                leaderboard the user performed 100,000+ bets, opposite betting on 
                roulette/baccarat, etc.
              </p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Leaderboards;
