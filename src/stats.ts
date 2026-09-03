import { Joke } from './jokes';

export interface LeaderboardEntry {
  id: string;
  shown: number;
}

export interface StatsResponse {
  leaderboard: LeaderboardEntry[];
  sampledRate: string;
  note: string;
}

// 1-in-10 sampled writes to stay well within Cloudflare KV free tier limits
const SAMPLE_RATE = 10;

export async function recordJokeImpression(
  jokeId: string,
  env?: { WITTY_404_STATS?: KVNamespace },
  ctx?: ExecutionContext
): Promise<void> {
  if (!env?.WITTY_404_STATS) return;

  // Sample roughly 1 in 10 requests
  if (Math.random() * SAMPLE_RATE >= 1) return;

  const update = async () => {
    try {
      const key = `joke:${jokeId}`;
      const currentVal = await env.WITTY_404_STATS!.get(key);
      const count = (currentVal ? parseInt(currentVal, 10) : 0) + SAMPLE_RATE;
      await env.WITTY_404_STATS!.put(key, count.toString());
    } catch {
      // Fire-and-forget: silently swallow KV errors so main request is never blocked or failed
    }
  };

  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(update());
  } else {
    update().catch(() => {});
  }
}

export async function getLeaderboard(
  allJokes: Joke[],
  env?: { WITTY_404_STATS?: KVNamespace }
): Promise<StatsResponse> {
  const entries: LeaderboardEntry[] = [];

  if (env?.WITTY_404_STATS) {
    try {
      for (const joke of allJokes) {
        const val = await env.WITTY_404_STATS.get(`joke:${joke.id}`);
        entries.push({
          id: joke.id,
          shown: val ? parseInt(val, 10) : 0,
        });
      }
    } catch {
      // fallback to zeros if KV query fails
    }
  }

  // If no KV or all 0, provide default structure
  if (entries.length === 0) {
    for (const joke of allJokes) {
      entries.push({ id: joke.id, shown: 0 });
    }
  }

  // Sort descending by shown count
  entries.sort((a, b) => b.shown - a.shown);

  return {
    leaderboard: entries,
    sampledRate: `1/${SAMPLE_RATE} (scaled by ${SAMPLE_RATE}x)`,
    note: 'Counts are sampled and estimated to respect edge KV write limits.',
  };
}
