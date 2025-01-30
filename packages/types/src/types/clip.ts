export type Vote = {
    id: string;
    userId: string;
    clipId: string;
    voteType: 'UPVOTE' | 'DOWNVOTE';
    createdAt: Date;
};

export type Clip = {
    id: string;
    title: string;
    platform: 'YOUTUBE' | 'TIKTOK' | 'TWITTER' | 'INSTAGRAM' | 'KICK';
    videoClip: string;
    authorUser: string;
    authorPfp: string;
    createdAt: Date;
    updatedAt: Date;
    votes?: Vote[];
};