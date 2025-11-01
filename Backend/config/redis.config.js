import { createClient } from "redis";

const redisCLient = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisCLient.on("connect", () => console.log("redis  connected"));
redisCLient.on("error", (error) => console.error("error : ", error));

await redisCLient.connect();

export default redisCLient;
