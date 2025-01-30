import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { enterRaffle, getRaffle, getUserByAuthorization, removePoints, validateAuthorization } from 'database';
import { getIp } from '@/util/ip';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  const authorization = req.headers.authorization as string;
  if (!validateAuthorization(authorization)) return res.status(401).end();

  const user = await getUserByAuthorization(authorization);
  if (!user || user.isBanned) return res.status(403).end();

  const { raffle } = req.query;
  if (!raffle || Array.isArray(raffle)) return res.status(400).json({ error: 'Invalid raffle ID' });

  const raffleData = await getRaffle(raffle);
  if (!raffleData?.value) return res.status(404).json({ error: 'Raffle not found' });

  if (user.points < raffleData.value) {
    console.log(user.points, raffleData.value);
    return res.status(402).json({ error: 'Insufficient balance for raffle entry' });
  }

  try {
    const ip = getIp(req);
    const success = await enterRaffle(user, raffle, ip);

    if(success) 
      await removePoints(user.id as string, raffleData.value, ip, 'raffle-system');
    
    return res.status(success ? 200 : 500).end();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Transaction failed' });
  }
}

export default handler;