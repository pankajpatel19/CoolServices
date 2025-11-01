import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_URL,
    port: 16813,
  },
});

client.on("error", (err) => console.error("❌ Redis Client Error:", err));

async function connectRedis() {
  try {
    await client.connect();
    console.log("✅ Connected to Redis Cloud!");

    await client.set("foo", "bar");
    const result = await client.get("foo");
  } catch (error) {
    console.error("❌ Redis Connection Failed:", error);
  }
}

connectRedis();

export default client;
