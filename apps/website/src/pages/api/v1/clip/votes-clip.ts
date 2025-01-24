import { getVotesForClip, getUserByAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, { methods: ['GET'], origin: '*', optionsSuccessStatus: 200 });

  const user = await getUserByAuthorization(req.headers.authorization as string);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { clipId } = req.query;
  if (typeof clipId !== 'string') return res.status(400).json({ error: 'Invalid or missing clipId' });

  try {
    const votes = await getVotesForClip(clipId);
    return res.status(200).json({ votes });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch votes for the clip' });
  }
};

export default handler;
