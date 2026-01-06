import cron from "node-cron";
import ChatMessage from "../modules/chat/message.model.js";
import redis from "../config/redis.js";

export const startPublicChatResetJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("🧹 Running daily public chat reset...");

      await ChatMessage.deleteMany({ room: "public" });

      const keys = await redis.keys("public:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      console.log("✅ Public chat reset completed");
    } catch (err) {
      console.error("❌ Public chat reset failed:", err.message);
    }
  });
};
