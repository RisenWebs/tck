export type UnifiedCache = {
    id: string;
    bestPayoutId: string;
    bestMultiId: string;
    updatedAt: Date;
};

export type UnifiedCacheWithRelations = UnifiedCache & {
    bestPayout: BestPayout;
    bestMulti: BestMulti;
    bonus: Bonus[];
    hunt: Hunt[];
};

export type BestPayout = {
    id: string;
    slotName: string;
    betSize: number;
    payout: number;
    multiplier: number;
    timestamp: Date;
};

export type BestMulti = {
    id: string;
    slotName: string;
    betSize: number;
    payout: number;
    multiplier: number;
};

export type Bonus = {
    id: string;
    name: string;
    note: string;
    active: boolean;
    providerId: number;
    providerName: string;
    betSize: number;
    multiplier: number;
    payout: number;
    betSizeRaw: number;
    multiplierRaw: number;
    payoutRaw: number;
};

export type Hunt = {
    id: string;
    name: string;
    date: Date;
    totalBets: number;
    totalWins: number;
    runningAvg: number;
    highestPayout: number;
    highestMultiplier: number;
};
