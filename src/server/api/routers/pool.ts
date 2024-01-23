import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/kv/Persistence";
import {
  ConstantKey,
  lottery,
  type PoolType,
  type ResponseTPRC,
} from "@/server/lib/LotteryService";

export const poolRouter = createTRPCRouter({
  /**
   * 池子列表
   */
  poolList: publicProcedure.query(async (): Promise<ResponseTPRC> => {
    try {
      const poolMap = await kvStore.list(ConstantKey.LOTTERY_POOLS);
      const poolList = new Array<PoolType>();
      for (const pool of Object.keys(poolMap)) {
        const p = { ...(poolMap[pool] as PoolType) };
        poolList.push(p);
      }
      return { code: 200, message: "OK", result: poolList };
    } catch (error: unknown) {
      console.log(error);
      return { code: 500, message: "error" };
    }
  }) /**
   * 池子带状态列表
   */,
  poolStateList: publicProcedure.query(async (): Promise<ResponseTPRC> => {
    try {
      const poolList = await lottery.poolState();
      return { code: 200, message: "OK", result: poolList };
    } catch (error: unknown) {
      console.log(error);
      return { code: 500, message: "error" };
    }
  }),
  /**
   * 开奖
   */
  runLottery: publicProcedure
    .input(z.object({ poolCode: z.string() }))
    .mutation(async ({ input }): Promise<ResponseTPRC> => {
      try {
        return { code: 200, message: "OK", result: input.poolCode };
      } catch (error: unknown) {
        console.log(error);
        return { code: 500, message: "error" };
      }
    }),
});
