import { FastifyManager } from "#utils/FastifyManager";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import fastify from "fastify";

config({ path: __dirname + "/../../.env" });

export type AppInstance = typeof app;

declare global {
  // eslint-disable-next-line no-var
  var app: AppInstance;
}

const app = fastify();
app.prisma = new PrismaClient();

global.app = app;

async function bootstrap() {
  // Add listener to add routes
  app.addHook("onRoute", (routeOptions) => {
    console.log(
      `[REST] Route added: [${routeOptions.method}] ${routeOptions.url}`
    );
  });

  const manager = new FastifyManager(app);
  await manager.loadConsumers(__dirname + "/middlewares");
  await manager.loadConsumers(__dirname + "/routes");

  await app.listen({
    host: "0.0.0.0",
    port: 4000,
  });

  console.log("[REST] Server started on port 4000");
}

bootstrap();
