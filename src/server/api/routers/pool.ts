import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/kv/Persistence";
import {
  type LotteryPoolProps,
  Namespace,
  type PhaseResult,
  type ResponseTPRC,
} from "@/server/lib/LotteryService";

export const poolRouter = createTRPCRouter({
  /**
   * 池子列表
   */
  poolList: publicProcedure.query(async (): Promise<ResponseTPRC> => {
    try {
      const poolMap = await kvStore.list(Namespace.LOTTERY_POOLS);
      const poolList = new Array<LotteryPoolProps>();
      for (const pool of Object.keys(poolMap)) {
        const p = { ...(poolMap[pool] as LotteryPoolProps) };
        poolList.push(p);
        const current = await kvStore.get(Namespace.LOTTERY_CURRENT_PHASE, pool);
        if (!current) {
          continue;
        }
        const processing = await kvStore.get(Namespace.LOTTERY_PROCESSING_PHASE, pool);
        const lastResult = (await kvStore.get(
          String(processing),
          Namespace.LOTTERY_PHASE_RESULT,
        )) as PhaseResult;
        p.currentPhase = String(current);
        p.lastPhase = String(processing);
        p.lastResult = lastResult;
      }
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
