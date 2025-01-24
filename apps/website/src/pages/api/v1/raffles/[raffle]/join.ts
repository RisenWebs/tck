import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { enterRaffle, getUserByAuthorization, validateAuthorization } from 'database';
import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  // Authorization
  const authorization = req.headers.authorization as string;
  if (!validateAuthorization(authorization)) {
    return res.status(401).end();
  }

  const user = await getUserByAuthorization(authorization);
  if (!user) {
    return res.status(401).end();
  }

  // Banned check
  if (user.isBanned) {
    return res.status(403).end();
  }

  // Extract raffle ID from query
  const { raffle } = req.query;
  if (!raffle) {
    return res.status(400).json({ error: 'No raffle ID provided' });
  }

  // Attempt to enter
  const ip = getIp(req);
  const success = await enterRaffle(user, raffle as string, ip);

  // If success is true => 200, else 500 (or 400 if you'd like)
  return res.status(success ? 200 : 500).end();
}

export default handler;
