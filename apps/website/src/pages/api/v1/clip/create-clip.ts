import { createClip, getUserByAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getIp } from '@/util/ip';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

const REQUIRED_FIELDS = ['title', 'platform', 'videoClip', 'authorUser', 'authorPfp'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {methods: ['POST'], origin: '*', optionsSuccessStatus: 200});

  const authorization = req.headers.authorization as string;
  if (!authorization) return res.status(401).json({ error: `Missing valid authorization` });
  
  const user = await getUserByAuthorization(authorization);

  if (!user) return res.status(401).end();
  if (!user.permissions.includes('MANAGE_CLIPS')) return res.status(403).end();

  const missingFields = REQUIRED_FIELDS.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  try {
    const { title, platform, videoClip, authorUser, authorPfp } = req.body;
    const clip = await createClip(title, platform, videoClip, authorUser, authorPfp);
    return res.status(200).json({ clip });
  } catch {
    return res.status(500).json({ error: 'Failed to create clip' });
  }
};

export default handler;
