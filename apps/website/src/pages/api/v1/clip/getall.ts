import { getAllClips, getUserByAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, { methods: ['GET'], origin: '*', optionsSuccessStatus: 200 });

  try {
    const clips = await getAllClips();
    return res.status(200).json({ clips });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch clips' });
  }
};

export default handler;
