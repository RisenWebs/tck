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