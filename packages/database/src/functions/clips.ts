import { prisma } from '../client';
import { socket } from '../socket';

type Clip = {
    id: string;
    title: string;
    platform: 'YOUTUBE' | 'TIKTOK' | 'TWITTER' | 'INSTAGRAM' | 'KICK';
    videoClip: string;
    authorUser: string;
    authorPfp: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getAllClips = async (): Promise<Clip[]> => {
    return prisma.clip.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            votes: true,
        },
    });
};

export const createClip = async (title: string, platform: 'YOUTUBE' | 'TIKTOK' | 'TWITTER' | 'INSTAGRAM' | 'KICK', videoClip: string, authorUser: string, authorPfp: string): Promise<Clip> => {
    const clip = await prisma.clip.create({
        data: { title, platform, videoClip, authorUser, authorPfp },
    });

    socket.emit('newClip', clip);
    return clip;
};

export const updateClip = async (id: string, title: string, platform: 'YOUTUBE' | 'TIKTOK' | 'TWITTER' | 'INSTAGRAM' | 'KICK', videoClip: string, authorUser: string, authorPfp: string): Promise<boolean> => {
    const clip = await prisma.clip.findUnique({ where: { id } });
    if (!clip) return false;

    await prisma.clip.update({
        where: { id },
        data: { title, platform, videoClip, authorUser, authorPfp },
    });

    socket.emit('updateClip', { id });
    return true;
};

export const deleteClip = async (id: string): Promise<boolean> => {
    const clip = await prisma.clip.findUnique({ where: { id } });
    if (!clip) return false;

    await prisma.vote.deleteMany({ where: { clipId: id } });
    await prisma.clip.delete({ where: { id } });

    socket.emit('deleteClip', { id });
    return true;
};


export const getClip = async (id: string): Promise<Clip | null> => {
    return prisma.clip.findUnique({ where: { id } });
};

const updateVote = (voteId: string, voteType: 'UPVOTE' | 'DOWNVOTE') => prisma.vote.update({ where: { id: voteId }, data: { voteType } });
const createVote = (userId: string, clipId: string, voteType: 'UPVOTE' | 'DOWNVOTE') => prisma.vote.create({ data: { userId, clipId, voteType } });

export const voteOnClip = async (userId: string, clipId: string, voteType: 'UPVOTE' | 'DOWNVOTE'): Promise<boolean> => {
    const clip = await prisma.clip.findUnique({ where: { id: clipId } });
    if (!clip) return false;

    const existingVote = await prisma.vote.findUnique({ where: { userId_clipId: { userId, clipId } } });

    if (existingVote?.voteType === voteType) return false;

    existingVote
        ? await updateVote(existingVote.id, voteType)
        : await createVote(userId, clipId, voteType);

    socket.emit('voteOnClip', { userId, clipId, voteType });

    return true;
};


export const getVotesForClip = async (clipId: string) => {
    const [upvotes, downvotes] = await Promise.all([
        prisma.vote.count({ where: { clipId, voteType: 'UPVOTE' } }),
        prisma.vote.count({ where: { clipId, voteType: 'DOWNVOTE' } }),
    ]);

    return { upvotes, downvotes };
};
