export interface ISafeRaffle {
    id: string;
    name: string;
    value: number;
    maxEntries: number;
    maxWinners: number;
    image: string;
    timestampCreation: number;
    timestampEnd: number;
    entries: {
      id: string;
      username: string;
      slot: number;
    }[];
    winners: string[];
  }