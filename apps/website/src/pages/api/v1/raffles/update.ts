import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { getUserByAuthorization, updateRaffle } from 'database';
import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS configuration
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  // Extract IP
  const ip = getIp(req);

  // Authorization check
  const authorization = req.headers.authorization as string;
  const user = await getUserByAuthorization(authorization);
  if (!user) {
    return res.status(401).end();
  }

  // Permission check
  if (!user.permissions.includes('MANAGE_RAFFLES')) {
    return res.status(403).end();
  }

  // Grab data from request body
  const { id, name, value, maxEntries, maxWinners, timestampEnd } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing raffle ID' });
  }

  // Attempt update
  const response = await updateRaffle(
    id,
    name,
    value,
    maxEntries,
    maxWinners,
    timestampEnd,
    user.id,
    ip
  );

  if (!response) {
    // If updateRaffle returns false, raffle was not found or no update occurred
    return res.status(404).end();
  }

  return res.status(200).end();
}

export default handler;
