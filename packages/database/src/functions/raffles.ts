import { ObjectId } from 'mongodb';
import RandomOrg from 'random-org';

import { Action, User, prisma } from '../client';
import { socket } from '../socket';
import { deleteImage } from './backblaze';
import { ISafeRaffle } from '../../../types/src/types/raffles';

/**
 * Get all raffles: divides them into "current" and "past" based on timestampEnd.
 */
export async function getAllRaffles(): Promise<{
  currentRaffles: ISafeRaffle[];
  pastRaffles: ISafeRaffle[];
}> {
  const now = Date.now();

  const currentRaffles = await prisma.raffle.findMany({
    where: {
      timestampEnd: {
        gt: now
      }
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winners: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      timestampEnd: 'asc'
    }
  });

  const pastRaffles = await prisma.raffle.findMany({
    where: {
      timestampEnd: {
        lt: now
      }
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winners: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      timestampEnd: 'desc'
    }
  });

  return {
    currentRaffles: currentRaffles.map((r) => ({
      ...r,
      entries: r.entries.map((entry) => ({
        id: entry.id,
        username: entry.user.username,
        slot: entry.slot
      })),
      winners: r.winners.map((w) => w.user.username)
    })),
    pastRaffles: pastRaffles.map((r) => ({
      ...r,
      entries: r.entries.map((entry) => ({
        id: entry.id,
        username: entry.user.username,
        slot: entry.slot
      })),
      winners: r.winners.map((w) => w.user.username)
    }))
  };
}

/**
 * Fetch a single raffle by its id, including its entries and winners.
 */
export async function getRaffle(id: string): Promise<ISafeRaffle | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const raffle = await prisma.raffle.findUnique({
    where: {
      id
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winners: {
        include: {
          user: true
        }
      }
    }
  });

  if (!raffle) {
    return null;
  }

  const safeRaffle: ISafeRaffle = {
    ...raffle,
    entries: raffle.entries.map((entry) => ({
      id: entry.id,
      username: entry.user.username,
      slot: entry.slot
    })),
    winners: raffle.winners.map((winner) => winner.user.username)
  };

  return safeRaffle;
}

/**
 * Create a new raffle.
 */
export async function createRaffle(
  name: string,
  value: number,
  maxEntries: number,
  maxWinners: number,
  timestampEnd: number,
  image: string,
  userId: string,
  ip: string
) {
  console.log('Creating raffle with the following details:', {
    name,
    value,
    maxEntries,
    maxWinners,
    timestampEnd,
    image,
    userId,
    ip
  });

  try {
    const raffle = await prisma.raffle.create({
      data: {
        name,
        value,
        maxEntries,
        maxWinners,
        timestampCreation: Date.now(),
        timestampEnd,
        image
      }
    });

    console.log('Raffle created successfully:', raffle);

    await prisma.userAction.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        action: Action.RAFFLE_CREATE,
        ip,
        timestamp: Date.now(),
        description: `Raffle ${raffle.id} created`
      }
    });

    socket.emit('newRaffle', raffle);
    console.log('Socket notification sent for raffle:', raffle.id);

  } catch (error) {
    console.error('Error creating raffle:', error);
  }
}

/**
 * Update an existing raffle (e.g., changing name, value, maxEntries, etc.).
 */
export async function updateRaffle(
  id: string,
  name: string,
  value: number,
  maxEntries: number,
  maxWinners: number,
  timestampEnd: number,
  userId: string,
  ip: string
): Promise<boolean> {
  const existing = await prisma.raffle.findUnique({
    where: {
      id
    }
  });
  if (!existing) {
    return false;
  }

  await prisma.raffle.update({
    where: {
      id
    },
    data: {
      name,
      value,
      maxEntries,
      maxWinners,
      timestampEnd
    }
  });

  // If no changes, return early.
  if (
    existing.name === name &&
    existing.value === value &&
    existing.maxEntries === maxEntries &&
    existing.maxWinners === maxWinners &&
    existing.timestampEnd === timestampEnd
  ) {
    return true;
  }

  // Gather updates
  const updates: string[] = [];
  if (existing.name !== name) {
    updates.push(`Name updated from ${existing.name} to ${name}.`);
  }
  if (existing.value !== value) {
    updates.push(`Value updated from ${existing.value} to ${value}.`);
  }
  if (existing.maxEntries !== maxEntries) {
    updates.push(`Max entries updated from ${existing.maxEntries} to ${maxEntries}.`);
  }
  if (existing.maxWinners !== maxWinners) {
    updates.push(`Max winners updated from ${existing.maxWinners} to ${maxWinners}.`);
  }
  if (existing.timestampEnd !== timestampEnd) {
    updates.push(`End time updated from ${existing.timestampEnd} to ${timestampEnd}.`);
  }

  // Record this update as a user action
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.RAFFLE_UPDATE, // or your custom action enum key
      ip,
      timestamp: Date.now(),
      description: `Raffle ${id} updated. ${updates.join(' ')}`
    }
  });

  return true;
}

/**
 * Delete an existing raffle, removing entries, winners, and the image in storage.
 */
export async function deleteRaffle(id: string, userId: string, ip: string): Promise<boolean> {
  const raffle = await prisma.raffle.findUnique({
    where: {
      id
    }
  });
  if (!raffle) {
    return false;
  }

  // Delete the image from storage (e.g., Backblaze).
  const success = await deleteImage(raffle.image, 'raffles');
  if (!success) {
    return false;
  }

  // Notify via socket.
  socket.emit('deleteRaffle', raffle);

  // Delete all entries for this raffle.
  await prisma.raffleEntry.deleteMany({
    where: {
      raffleId: id
    }
  });

  // Delete all winners for this raffle.
  await prisma.raffleWinner.deleteMany({
    where: {
      raffleId: id
    }
  });

  // Finally, delete the raffle record.
  await prisma.raffle.delete({
    where: {
      id
    }
  });

  // Log the deletion as a user action.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.RAFFLE_DELETE, // or your custom action enum key
      ip,
      timestamp: Date.now(),
      description: `Raffle ${id} deleted`
    }
  });

  return true;
}

/**
 * End a raffle: if 0 entries, extend 1 day. Otherwise, pick up to maxWinners randomly.
 */
export async function endRaffle(id: string): Promise<void> {
  const raffle = await getRaffle(id);
  if (!raffle) {
    return;
  }

  // If no entries, extend by 1 day.
  if (raffle.entries.length === 0) {
    const newTimestampEnd = raffle.timestampEnd + 86400000; // 24h in ms

    await prisma.raffle.update({
      where: {
        id: raffle.id
      },
      data: {
        timestampEnd: newTimestampEnd
      }
    });

    // Schedule again in 24h.
    setTimeout(async () => {
      await endRaffle(raffle.id);
    }, 86400000);

    return;
  }

  // Number of winners we can have
  const totalWinners = Math.min(raffle.maxWinners, raffle.entries.length);

  // If there's no random.org API key, fallback to Math.random
  let winnerIndices: number[] = [];
  if (process.env.RANDOM_ORG_API_KEY) {
    try {
      const randomOrg = new RandomOrg({ apiKey: process.env.RANDOM_ORG_API_KEY });
      // We ask for 'totalWinners' unique random numbers from 0..(entries.length - 1)
      const response = await randomOrg.generateSignedIntegers({
        min: 0,
        max: raffle.entries.length - 1,
        n: totalWinners,
        replacement: false // ensure unique
      });
      winnerIndices = response.random.data;
    } catch (error) {
      console.error('Random.org error, falling back to local random', error);
      winnerIndices = pickUniqueRandomIntegers(totalWinners, raffle.entries.length);
    }
  } else {
    winnerIndices = pickUniqueRandomIntegers(totalWinners, raffle.entries.length);
  }

  // Create the RaffleWinner rows for each chosen index
  for (const idx of winnerIndices) {
    const winnerEntry = raffle.entries[idx];
    await prisma.raffleWinner.create({
      data: {
        raffleId: raffle.id,
        userId: await getUserIdByUsername(winnerEntry.username) // see helper below
      }
    });
  }
}

/**
 * Enter a raffle, provided it hasn't ended and the user isn't already in it.
 */
export async function enterRaffle(user: User, raffleId: string, ip: string): Promise<boolean> {
  const raffle = await getRaffle(raffleId);

  if (!raffle) {
    // Raffle doesn't exist
    return false;
  }

  // Already ended or winners have been determined?
  if (Date.now() > raffle.timestampEnd || raffle.winners.length > 0) {
    return false;
  }

  // Already entered?
  if (raffle.entries.some((entry) => entry.username === user.username)) {
    return false;
  }

  // Is the raffle full?
  if (raffle.entries.length >= raffle.maxEntries) {
    return false;
  }

  // Add the user entry
  await prisma.raffle.update({
    where: {
      id: raffleId
    },
    data: {
      entries: {
        create: {
          slot: raffle.entries.length,
          timestamp: Date.now(),
          userId: user.id
        }
      }
    }
  });

  // Log the user action
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      },
      action: Action.RAFFLE_JOIN, // or your custom action enum key
      ip,
      timestamp: Date.now(),
      description: `Raffle ${raffleId} entered`
    }
  });

  return true;
}

/**
 * Helper: pick unique random integers in range [0..max-1].
 */
function pickUniqueRandomIntegers(count: number, max: number): number[] {
  const set = new Set<number>();
  while (set.size < count) {
    const randomIndex = Math.floor(Math.random() * max);
    set.add(randomIndex);
  }
  return Array.from(set);
}

/**
 * Helper: get userId by username
 * (You may instead pass userIds around, adapt as needed.)
 */
async function getUserIdByUsername(username: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });
  if (!user) {
    throw new Error(`User not found: ${username}`);
  }
  return user.id;
}
