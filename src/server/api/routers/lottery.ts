import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { lottery, type ResponseTPRC } from "@/server/lib/LotteryService";

export const lotteryRouter = createTRPCRouter({
  /**
   * 开奖
   */
  phaseLottery: publicProcedure
    .input(z.object({ poolCode: z.string(), lotteryResult: z.optional(z.string()) }))
    .mutation(async ({ input }): Promise<ResponseTPRC> => {
      try {
        const phase = await lottery.phaseLottery(
          input.poolCode,
          input.lotteryResult ?? lottery.randomHex(),
        );
        return { code: 200, message: "ok", result: phase };
      } catch (error: unknown) {
        console.error("Error init");
        console.log(error);
        return { code: 500, message: "error" };
      }
    }),
});
