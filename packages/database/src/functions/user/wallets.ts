import { validate } from 'multicoin-address-validator';

import { prisma } from '../../client';
import { getUserById } from './fetch';

export async function updateBitcoinWallet(wallet: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      bitcoin: wallet
    }
  });
  if (wallet && existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const valid = validate(wallet, 'btc');
  if (!valid) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      bitcoin: wallet
    },
    create: {
      userId,
      bitcoin: wallet
    }
  });
  return true;
}

export async function updateEthereumWallet(wallet: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      ethereum: wallet
    }
  });
  if (wallet && existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const valid = validate(wallet, 'eth');
  if (!valid) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      ethereum: wallet
    },
    create: {
      userId,
      ethereum: wallet
    }
  });
  return true;
}

export async function updateLitecoinWallet(wallet: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      litecoin: wallet
    }
  });
  if (wallet && existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const valid = validate(wallet, 'ltc');
  if (!valid) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      litecoin: wallet
    },
    create: {
      userId,
      litecoin: wallet
    }
  });
  return true;
}

export async function updateSteamTradeUrl(steamTradeUrl: string, userId: string): Promise<boolean> {
  const existing = await prisma.userWallets.findFirst({
    where: {
      steamTradeUrl
    }
  });
  if (steamTradeUrl && existing) {
    return false;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const valid = steamTradeUrl.includes('steamcommunity.com/tradeoffer/new');
  if (!valid) {
    return false;
  }

  await prisma.userWallets.upsert({
    where: {
      userId
    },
    update: {
      steamTradeUrl
    },
    create: {
      userId,
      steamTradeUrl
    }
  });
  return true;
}
