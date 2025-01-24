import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { deleteRaffle, getUserByAuthorization, validateAuthorization } from 'database';
import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS configuration
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const ip = getIp(req);
  const authorization = req.headers.authorization as string;

  // Basic authorization checks
  if (!validateAuthorization(authorization)) {
    return res.status(401).end();
  }

  const user = await getUserByAuthorization(authorization);
  if (!user) {
    return res.status(401).end();
  }

  // Permission check
  if (!user.permissions.includes('MANAGE_RAFFLES')) {
    return res.status(403).end();
  }

  // Grab Raffle ID from body
  const { id } = req.body;
  if (!id) {
    return res.status(400).end();
  }

  // Attempt to delete
  const success = await deleteRaffle(id, user.id, ip);
  if (!success) {
    // If it fails, likely the raffle was not found or image deletion failed
    return res.status(500).end();
  }
  return res.status(200).end();
}

export default handler;
