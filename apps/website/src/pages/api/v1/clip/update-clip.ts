import { updateClip, getUserByAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

const REQUIRED_FIELDS = ['id', 'title', 'platform', 'videoClip', 'authorUser', 'authorPfp'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, { methods: ['PUT'], origin: '*', optionsSuccessStatus: 200 });

  const authorization = req.headers.authorization as string;
  const user = await getUserByAuthorization(authorization);

  if (!user) return res.status(401).end();
  if (!user.permissions.includes('MANAGE_CLIPS')) return res.status(403).end();

  const missingFields = REQUIRED_FIELDS.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  try {
    const { id, title, platform, videoClip, authorUser, authorPfp } = req.body;
    const success = await updateClip(id, title, platform, videoClip, authorUser, authorPfp);
    if (!success) return res.status(404).json({ error: 'Clip not found' });

    return res.status(200).json({ message: 'Clip updated successfully' });
  } catch {
    return res.status(500).json({ error: 'Failed to update clip' });
  }
};

export default handler;
