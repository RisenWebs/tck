import { voteOnClip, getUserByAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } };

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, { methods: ['POST'], origin: '*', optionsSuccessStatus: 200 });

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const authorization = req.headers.authorization as string;
    if (!authorization) return res.status(401).json({ error: `Missing valid authorization` });
    
    const user = await getUserByAuthorization(authorization);
    if (!user) return res.status(401).end();

    const { clipId, voteType } = req.body;
    if (typeof clipId !== 'string' || !['UPVOTE', 'DOWNVOTE'].includes(voteType)) {
        return res.status(400).json({ error: 'Invalid clipId or voteType' });
    }

    try {
        const success = await voteOnClip(user.id, clipId, voteType as 'UPVOTE' | 'DOWNVOTE');
        res.status(success ? 200 : 400).json(
            success ? { message: 'Vote registered successfully' } : { error: 'Failed to register vote' }
        );
    } catch {
        res.status(500).json({ error: 'Failed to process vote' });
    }
};
