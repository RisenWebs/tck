import { deleteClip, getUserByAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, { methods: ['DELETE'], origin: '*', optionsSuccessStatus: 200 });

  const authorization = req.headers.authorization as string;
  if (!authorization) return res.status(401).json({ error: `Missing valid authorization` });
  
  const user = await getUserByAuthorization(authorization);
  if (!user || !user.permissions.includes('MANAGE_CLIPS')) return res.status(user ? 403 : 401).end();

  const clipId = req.query.clipId;
  if (typeof clipId !== 'string') return res.status(400).json({ error: 'Invalid clipId' });

  try {
    const deleted = await deleteClip(clipId);
    res.status(deleted ? 200 : 404).json(deleted ? { message: 'Clip deleted successfully' } : { error: 'Clip not found' });
  } catch {
    res.status(500).json({ error: 'Failed to delete clip' });
  }
};
