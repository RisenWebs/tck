import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { createRaffle, getUserByAuthorization, uploadImage } from 'database';
import { getIp } from '@/util/ip';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb' // Adjust as needed
    }
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST', 'OPTIONS'],
    origin: '*',
    optionsSuccessStatus: 200
  });
  
  const ip = getIp(req);
  console.log('Client IP:', ip);

  const authorization = req.headers.authorization as string;
  const user = await getUserByAuthorization(authorization);
  if (!user) {
    console.log('Unauthorized request');
    return res.status(401).end();
  }

  // Permission check
  if (!user.permissions.includes('MANAGE_RAFFLES')) {
    console.log('Forbidden: user does not have MANAGE_RAFFLES permission');
    return res.status(403).end();
  }

  // Extract raffle fields (no brand in Raffle schema)
  const { name, value, maxEntries, maxWinners, timestampEnd, image } = req.body;
  console.log('Request body:', { name, value, maxEntries, maxWinners, timestampEnd });

  // If you have an uploadImage routine like for giveaways, use it:
  // const fileName = await uploadImage(Buffer.from(image, 'base64'), 'raffles');
  // if (!fileName) {
  //   console.log('Failed to upload image');
  //   return res.status(500).end();
  // }

  // For demonstration, pass empty string for image. Or pass the fileName above if you do image upload.
  await createRaffle(name, value, maxEntries, maxWinners, timestampEnd, '', user.id, ip);

  console.log('Raffle created successfully');
  return res.status(200).end();
}

export default handler;
