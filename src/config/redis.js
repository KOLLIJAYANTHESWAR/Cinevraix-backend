import { createClient } from "redis";

const REDIS_URL =
  process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redis = createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error("❌ Redis reconnect failed");
        return new Error("Redis reconnect failed");
      }
      return Math.min(retries * 100, 3000);
    },
  },
});

export const pubClient = redis;
export const subClient = redis.duplicate();

export const connectRedis = async () => {
  try {
    redis.on("error", (err) =>
      console.error("❌ Redis error:", err.message)
    );

    if (!redis.isOpen) {
      await redis.connect();
      await subClient.connect();
      console.log("⚡ Redis connected");
    }
  } catch (err) {
    console.error("❌ Redis connection failed:", err.message);
  }
};

export default redis;
