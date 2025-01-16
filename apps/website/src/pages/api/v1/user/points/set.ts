import { getUserByAuthorization, getUserById, setPoints, validateAuthorization } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const ip = getIp(req);

  const authorization = req.headers.authorization;
  if (!authorization || !validateAuthorization(authorization)) {
    res.status(401).end();
    return;
  }

  const user = await getUserByAuthorization(authorization);
  if (!user) {
    res.status(401).end();
    return;
  }

  if (!user.permissions.includes('USER_POINTS_SET')) {
    res.status(403).end();
    return;
  }

  const { userId, points } = req.body;
  if (typeof userId !== 'string' || typeof points !== 'number') {
    res.status(400).end();
    return;
  }

  const target = await getUserById(userId);
  if (!target) {
    res.status(404).end();
    return;
  }

  await setPoints(userId, points, ip, user.username);

  res.status(200).end();
}

export default handler;
