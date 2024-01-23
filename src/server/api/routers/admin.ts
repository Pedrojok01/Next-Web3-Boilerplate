import { nanoid } from "nanoid";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/kv/Persistence";
import {
  Difficulty,
  type LotteryPoolProps,
  Namespace,
  type ResponseTPRC,
} from "@/server/lib/LotteryService";

export const adminRouter = createTRPCRouter({
  /**
   * 初始化池
   */
  initPool: publicProcedure.mutation(async (): Promise<ResponseTPRC> => {
    try {
      const power: LotteryPoolProps = {
        name: "PowerBlast",
        poolCode: "System-PowerBlast-0001",
        difficulty: Difficulty.MATCH,
        period: "*/30 * * * *",
      };
      const buzz: LotteryPoolProps = {
        name: "Buzz",
        poolCode: nanoid(),
        difficulty: Difficulty.CLOSE,
        period: "*/5 * * * *",
      };
      const jolt: LotteryPoolProps = {
        name: "Jolt",
        poolCode: nanoid(),
        difficulty: Difficulty.CLOSE,
        period: "*/5 * * * *",
      };
      await kvStore.clean("LOTTERY*");
      const r1 = await kvStore.save(Namespace.LOTTERY_POOLS, power.poolCode, power);
      const r2 = await kvStore.save(Namespace.LOTTERY_POOLS, buzz.poolCode, buzz);
      const r3 = await kvStore.save(Namespace.LOTTERY_POOLS, jolt.poolCode, jolt);
      return { code: 200, message: "OK", result: [r1, r2, r3] };
    } catch (error: unknown) {
      console.error("Error init");
      console.log(error);
      return { code: 500, message: "error" };
    }
  }),
});
