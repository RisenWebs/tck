import { ObjectId } from 'mongodb';
import RandomOrg from 'random-org';

import { Action, User, prisma } from '../client';
import { socket } from '../socket';
import { deleteImage } from './backblaze';

export async function getAllGiveaways() {
  const currentGiveaways = await prisma.giveaway.findMany({
    where: {
      timestampEnd: {
        gt: Date.now()
      }
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winner: true
    },
    orderBy: {
      timestampEnd: 'asc'
    }
  });
  const pastGiveaways = await prisma.giveaway.findMany({
    where: {
      timestampEnd: {
        lt: Date.now()
      }
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winner: true
    },
    orderBy: {
      timestampEnd: 'desc'
    }
  });

  return {
    currentGiveaways,
    pastGiveaways
  };
}

export async function updateGiveaway(
  id: string,
  name: string,
  brand: string,
  value: number,
  maxEntries: number,
  timestampEnd: number
) {
  await prisma.giveaway.update({
    where: {
      id
    },
    data: {
      name,
      brand,
      value,
      maxEntries,
      timestampEnd
    }
  });
}

export async function deleteGiveaway(id: string): Promise<boolean> {
  const giveaway = await prisma.giveaway.findUnique({
    where: {
      id
    }
  });
  if (!giveaway) {
    return false;
  }

  // Delete the image.
  const success = await deleteImage(giveaway.image, 'giveaways');
  if (!success) {
    return false;
  }

  // Send Discord notification.
  socket.emit('deleteGiveaway', giveaway);

  // Delete all entries.
  await prisma.giveawayEntry.deleteMany({
    where: {
      giveawayId: id
    }
  });

  // Delete the database entry.
  await prisma.giveaway.delete({
    where: {
      id
    }
  });

  return true;
}

export async function getGiveaway(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await prisma.giveaway.findUnique({
    where: {
      id
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winner: true
    }
  });
}

export async function endGiveaway(id: string) {
  const giveaway = await getGiveaway(id);
  if (!giveaway) {
    return;
  }

  // Didn't have enough entries. Extend by one day.
  if (giveaway.entries.length === 0 || !process.env.RANDOM_ORG_API_KEY) {
    const newTimestampEnd = giveaway.timestampEnd + 86400000;

    await prisma.giveaway.update({
      where: {
        id: giveaway.id
      },
      data: {
        timestampEnd: newTimestampEnd
      }
    });

    setTimeout(async () => {
      await endGiveaway(giveaway.id);
    }, 86400000);

    return;
  }

  const randomOrg = new RandomOrg({ apiKey: process.env.RANDOM_ORG_API_KEY });

  let winnerIndex = 0;
  if (giveaway.entries.length !== 1) {
    const response = await randomOrg.generateSignedIntegers({
      min: 0,
      max: giveaway.entries.length - 1,
      n: 1
    });
    winnerIndex = response.random.data[0];
  }
  const winner = giveaway.entries[winnerIndex].userId;

  // Update database.
  await prisma.giveaway.update({
    where: {
      id
    },
    data: {
      winnerId: winner
    }
  });
}

export async function createGiveaway(
  name: string,
  brand: string,
  value: number,
  maxEntries: number,
  timestampEnd: number,
  image: string
) {
  const giveaway = await prisma.giveaway.create({
    data: {
      name,
      brand,
      value,
      maxEntries,
      timestampCreation: Date.now(),
      timestampEnd,
      image
    }
  });

  // Send Discord notification.
  socket.emit('newGiveaway', giveaway);

  const timeout = timestampEnd - Date.now();
  setTimeout(async () => {
    await endGiveaway(giveaway.id);
  }, timeout);
}

export async function enterGiveaway(user: User, giveawayId: string, ip: string): Promise<boolean> {
  const giveaway = await getGiveaway(giveawayId);

  if (!giveaway) {
    // If the giveaway doesn't exist.
    return false;
  }

  if (giveaway.winnerId || Date.now() > giveaway.timestampEnd) {
    // If the giveaway has already ended.
    return false;
  }

  if (
    giveaway.entries
      .map((entry) => {
        return entry.userId;
      })
      .includes(user.id)
  ) {
    // The user was already entered.
    return false;
  }

  if (giveaway.entries.length >= giveaway.maxEntries) {
    // The giveaway is full.
    return false;
  }

  await prisma.giveaway.update({
    where: {
      id: giveawayId
    },
    data: {
      entries: {
        create: {
          slot: giveaway.entries.length,
          timestamp: Date.now(),
          userId: user.id
        }
      }
    }
  });

  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      },
      action: Action.GIVEAWAY_JOIN,
      ip,
      timestamp: Date.now(),
      description: `Giveaway ${giveawayId}`
    }
  });

  return true;
}
