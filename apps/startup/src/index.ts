import { endGiveaway, getAllGiveaways, getAllRaffles, endRaffle } from 'database';
import { IGiveaway, ISafeGiveaway, ISafeRaffle } from 'types';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://9fcc3440f8998fce0e0bb0b0f69002db@o4505824725172224.ingest.sentry.io/4505824793329664',
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    environment: process.env.NODE_ENV
  });
}

const MAX_SETTIMEOUT_DELAY = 86400000;
const scheduledTasks = new Map<string, { timeout: NodeJS.Timeout; delay: number; endTimestamp: number }>();

type TaskType = 'giveaway' | 'raffle';
type Task = { type: TaskType; id: string; timestampEnd: number };

const safeExecute = async (task: () => Promise<void>, errorMessage: string): Promise<void> => {
  try {
    await task();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
  }
};

const processTask = async (type: TaskType, id: string): Promise<void> => {
  await safeExecute(
    () => (type === 'giveaway' ? endGiveaway(id) : endRaffle(id)),
    `[Error] Failed to process ${type} ${id}`
  );
  scheduledTasks.delete(id);
  console.log(`[Success] Processed ${type} ${id}`);
};

const scheduleTask = (callback: () => void, delay: number, id: string): void => {
  if (scheduledTasks.has(id)) {
    const { timeout } = scheduledTasks.get(id)!;
    clearTimeout(timeout);
  }

  if (delay > MAX_SETTIMEOUT_DELAY) {
    const nextDayDelay = MAX_SETTIMEOUT_DELAY - (Date.now() % MAX_SETTIMEOUT_DELAY);
    const timeoutId = setTimeout(() => scheduleTask(callback, delay - nextDayDelay, id), nextDayDelay);
    scheduledTasks.set(id, { timeout: timeoutId, delay: nextDayDelay, endTimestamp: Date.now() + nextDayDelay });
    console.log(`[Scheduled] Task ${id} split into chunks. Next chunk in ${nextDayDelay}ms`);
  } else {
    const timeoutId = setTimeout(() => {
      callback();
      scheduledTasks.delete(id);
    }, delay);
    scheduledTasks.set(id, { timeout: timeoutId, delay, endTimestamp: Date.now() + delay });
    console.log(`[Scheduled] Task ${id} set to run in ${delay}ms`);
  }
};

const scheduleTasks = (tasks: Task[]): void => {
  tasks.forEach(({ type, id, timestampEnd }) => {
    const delay = timestampEnd - Date.now();
    if (delay > 0) {
      console.log(`[Scheduling] Task ${id} (${type}) in ${delay}ms`);
      scheduleTask(() => processTask(type, id), delay, id);
    }
  });
};

const scheduleNextDayTasks = async (): Promise<void> => {
  await safeExecute(async () => {
    const [giveaways, raffles] = await Promise.all([getAllGiveaways(), getAllRaffles()]);
    const now = Date.now();
    const endOfDay = new Date().setHours(23, 59, 59, 999);
    const tomorrowStart = new Date().setHours(24, 0, 0, 0);

    const tasksToday: Task[] = [
      ...giveaways.currentGiveaways
        .filter(({ timestampEnd }) => timestampEnd <= endOfDay)
        .map(({ id, timestampEnd }) => ({ type: 'giveaway' as const, id, timestampEnd })),
      ...raffles.currentRaffles
        .filter(({ timestampEnd }) => timestampEnd <= endOfDay)
        .map(({ id, timestampEnd }) => ({ type: 'raffle' as const, id, timestampEnd })),
    ];

    const tasksTomorrow: Task[] = [
      ...giveaways.currentGiveaways
        .filter(({ timestampEnd }) => timestampEnd >= tomorrowStart)
        .map(({ id, timestampEnd }) => ({ type: 'giveaway' as const, id, timestampEnd })),
      ...raffles.currentRaffles
        .filter(({ timestampEnd }) => timestampEnd >= tomorrowStart)
        .map(({ id, timestampEnd }) => ({ type: 'raffle' as const, id, timestampEnd })),
    ];

    scheduleTasks(tasksToday);

    if (tasksTomorrow.length) {
      const earliestTaskTimeout = Math.min(...tasksTomorrow.map(({ timestampEnd }) => timestampEnd - now));
      scheduleTask(() => scheduleTasks(tasksTomorrow), earliestTaskTimeout, 'tomorrow');
      console.log(`[Scheduled] Tomorrow's tasks will be processed in ${earliestTaskTimeout}ms`);
    }

    setTimeout(scheduleNextDayTasks, tomorrowStart - now);
    console.log(`[Scheduled] Next day tasks will be checked at ${new Date(tomorrowStart).toISOString()}`);
  }, '[Error] Scheduling next day tasks');
};

const scheduleLiveTask = (type: TaskType, id: string, timestampEnd: number): void => {
  const delay = timestampEnd - Date.now();
  if (delay > 0) {
    console.log(`[Live Scheduling] Task ${id} (${type}) in ${delay}ms`);
    scheduleTask(() => processTask(type, id), delay, id);
  }
};

const checkAndUpdateTask = (type: TaskType, id: string, newTimestampEnd: number): void => {
  if (scheduledTasks.has(id)) {
    const { timeout, endTimestamp } = scheduledTasks.get(id)!;
    
    if (newTimestampEnd !== endTimestamp) {
      const newDelay = newTimestampEnd - Date.now();
      console.log(`[Updating] Task ${id} with new end time: ${new Date(newTimestampEnd).toISOString()}`);
      clearTimeout(timeout);
      scheduleTask(() => processTask(type, id), newDelay, id);
    }
  } else {
    scheduleLiveTask(type, id, newTimestampEnd);
  }
};

const cleanupRemovedTasks = (currentGiveaways: ISafeGiveaway[], currentRaffles: ISafeRaffle[]): void => {
  const currentIds = new Set([
    ...currentGiveaways.map(({ id }) => id),
    ...currentRaffles.map(({ id }) => id),
  ]);

  scheduledTasks.forEach(({ timeout }, id) => {
    if (!currentIds.has(id)) {
      console.log(`[Cleanup] Removing task ${id} because it no longer exists on the server`);
      clearTimeout(timeout);
      scheduledTasks.delete(id);
    }
  });
};

const checkPastGiveawaysAndRaffles = async (): Promise<void> => {
  await safeExecute(async () => {
    const [giveaways, raffles] = await Promise.all([getAllGiveaways(), getAllRaffles()]);

    giveaways.pastGiveaways.forEach(async ({ id, winner }) => {
      if (!winner) {
        console.log(`[Past Giveaway] No winners found for giveaway ${id}. Ending it now.`);
        await endGiveaway(id);
      }
    });

    raffles.pastRaffles.forEach(async ({ id, winners }) => {
      if (!winners || winners.length === 0) {
        console.log(`[Past Raffle] No winners found for raffle ${id}. Ending it now.`);
        await endRaffle(id);
      }
    });
  }, '[Error] Checking past giveaways and raffles');
};

const scheduleNewGiveawaysAndRaffles = async (): Promise<void> => {
  await safeExecute(async () => {
    const [giveaways, raffles] = await Promise.all([getAllGiveaways(), getAllRaffles()]);
    console.log(`[Polling] Found ${giveaways.currentGiveaways.length} giveaways and ${raffles.currentRaffles.length} raffles`);

    giveaways.currentGiveaways.forEach(({ id, timestampEnd }) => checkAndUpdateTask('giveaway', id, timestampEnd));
    raffles.currentRaffles.forEach(({ id, timestampEnd }) => checkAndUpdateTask('raffle', id, timestampEnd));

    cleanupRemovedTasks(giveaways.currentGiveaways, raffles.currentRaffles);
    await checkPastGiveawaysAndRaffles();
  }, '[Error] Fetching new giveaways/raffles');
};

setInterval(scheduleNewGiveawaysAndRaffles, 60000);
scheduleNewGiveawaysAndRaffles();
scheduleNextDayTasks();