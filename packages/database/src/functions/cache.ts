import { prisma } from '../client';
import { socket } from '../socket';
import { UnifiedCache, BestPayout, BestMulti, Bonus, Hunt, UnifiedCacheWithRelations } from 'types'

export const getUnifiedCache = async (): Promise<UnifiedCacheWithRelations | null> => {
  return prisma.unifiedCache.findFirst({
    include: {
      bestPayout: true, 
      bestMulti: true,   
      bonus: true,      
      hunt: true,    
    },
  });
};

export const createOrUpdateUnifiedCache = async (
  bestPayoutId: string,
  bestMultiId: string,
  bonusId: string,
  huntId: string
): Promise<UnifiedCache> => {
  const existingCache = await prisma.unifiedCache.findFirst();

  if (existingCache) {
    return prisma.unifiedCache.update({
      where: { id: existingCache.id },
      data: {
        bestPayout: { connect: { id: bestPayoutId } },
        bestMulti: { connect: { id: bestMultiId } },
        bonus: { connect: { id: bonusId } },
        hunt: { connect: { id: huntId } },
      },
    });
  } else {
    return prisma.unifiedCache.create({
      data: {
        bestPayout: { connect: { id: bestPayoutId } },
        bestMulti: { connect: { id: bestMultiId } },
        bonus: { connect: { id: bonusId } },
        hunt: { connect: { id: huntId } },
      },
    });
  }
};

export const createBestPayout = async (
  slotName: string,
  betSize: number,
  payout: number,
  multiplier: number,
  timestamp: Date
): Promise<BestPayout> => {
  return prisma.bestPayout.create({
    data: { slotName, betSize, payout, multiplier, timestamp },
  });
};

export const createBestMultiplier = async (
  slotName: string,
  betSize: number,
  payout: number,
  multiplier: number
): Promise<BestMulti> => {
  return prisma.bestMulti.create({
    data: { slotName, betSize, payout, multiplier },
  });
};

export const createBonus = async (
  name: string,
  note: string,
  active: boolean,
  providerId: number,
  providerName: string,
  betSize: number,
  multiplier: number,
  payout: number,
  betSizeRaw: number,
  multiplierRaw: number,
  payoutRaw: number
): Promise<Bonus> => {
  return prisma.bonus.create({
    data: {
      name,
      note,
      active,
      providerId,
      providerName,
      betSize,
      multiplier,
      payout,
      betSizeRaw,
      multiplierRaw,
      payoutRaw,
    },
  });
};

export const createHunt = async (
  name: string,
  date: Date,
  totalBets: number,
  totalWins: number,
  runningAvg: number,
  highestPayout: number,
  highestMultiplier: number
): Promise<Hunt> => {
  return prisma.hunt.create({
    data: {
      name,
      date,
      totalBets,
      totalWins,
      runningAvg,
      highestPayout,
      highestMultiplier,
    },
  });
}; 

export const deleteUnifiedCache = async (): Promise<any> => {
  return prisma.unifiedCache.deleteMany();
};