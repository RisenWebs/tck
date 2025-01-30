export type huntData = {
	id: number;
	uuid: string;
	name: string;
	bonus_count_opened: number;
	bonus_count_remaining: number;
	bonus_count_total: number;
	date: string;
	x100_wins: number;
	avg_per_bonus: string;
	avg_betsize: string;
	avg_payout: string;
	info_start_cost: string;
	info_amount_won: string;
	info_highest_payout: string;
	info_highest_multi: string;
	info_running_average: string;
	info_required_average: string;
};


export type bonusData = {
	id: number;
	name: string;
	note: string | null;
	active: number;
	providerId: number;
	provider_name: string;
	bet_size: string;
	multiplier: string;
	payout: string;
	betSizeRaw: number;
	multiplierRaw: number;
	payoutRaw: number;
	timestamp: string;
}[];

export type HuntDataField = string | number;

export interface ProcessedHuntData {
    label: string;
    date: string;
    data: Record<string, HuntDataField>;
}

export const DEFAULT_HUNT_VALUES = {
    bonus_count_opened: '-',
    bonus_count_remaining: '-',
    bonus_count_total: '-',
    x100_wins: '-',
    avg_per_bonus: '-',
    avg_betsize: '-',
    avg_payout: '-',
    info_start_cost: '-',
    info_amount_won: '-',
    info_highest_payout: '-',
    info_highest_multi: '-',
    info_running_average: '-',
    info_required_average: '-',
};