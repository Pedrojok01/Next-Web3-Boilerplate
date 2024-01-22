import { nanoid } from "nanoid";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/Persistence";
import { Difficulty, type Lottery, type ResponseTPRC } from "@/server/lib/types";

export const poolRouter = createTRPCRouter({
  /**
   * 初始化池
   */
  initPool: publicProcedure.mutation(async (): Promise<ResponseTPRC> => {
    try {
      const power: Lottery = {
        name: "PowerBlast",
        poolHash: nanoid(),
        difficulty: Difficulty.MATCH,
        period: 100000,
      };
      const buzz: Lottery = {
        name: "Buzz",
        poolHash: nanoid(),
        difficulty: Difficulty.MATCH,
        period: 10000,
      };
      const jolt: Lottery = {
        name: "Jolt",
        poolHash: nanoid(),
        difficulty: Difficulty.MATCH,
        period: 1000,
      };
      await kvStore.clean("LotteryPools");
      const r1 = await kvStore.save("LotteryPools", power.poolHash, power);
      const r2 = await kvStore.save("LotteryPools", buzz.poolHash, buzz);
      const r3 = await kvStore.save("LotteryPools", jolt.poolHash, jolt);
      return { code: 200, message: "OK", result: [r1, r2, r3] };
    } catch (error: unknown) {
      console.error("Error init");
      console.log(error);
      return { code: 500, message: "error" };
    }
  }),

  /**
   * 池子列表
   */
  poolList: publicProcedure.query(async (): Promise<ResponseTPRC> => {
    try {
      const r = await kvStore.list("LotteryPools");
      return { code: 200, message: "OK", result: r };
    } catch (error: unknown) {
      console.log(error);
      return { code: 500, message: "error" };
    }
  }),

  /**
   * 开奖
   */
  runLottery: publicProcedure
    .input(z.object({ poolHash: z.string() }))
    .mutation(async ({ input }): Promise<ResponseTPRC> => {
      try {
        return { code: 200, message: "OK", result: input.poolHash };
      } catch (error: unknown) {
        console.error("Error init");
        console.log(error);
        return { code: 500, message: "error" };
      }
    }),
});
