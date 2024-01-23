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
        price: 0.001,
      };
      const lotto: LotteryPoolProps = {
        name: "DailyLotto",
        poolCode: "System-DailyLotto-0002",
        difficulty: Difficulty.CLOSE,
        period: "* * */1 * *",
        price: 0.001,
      };
      const bang: LotteryPoolProps = {
        name: "BigBang",
        poolCode: "System-BigBang-0003",
        difficulty: Difficulty.CLOSE,
        period: "*/5 * * * *",
        price: 0.001,
      };
      await kvStore.clean("LOTTERY*");
      const r1 = await kvStore.save(Namespace.LOTTERY_POOLS, {
        [power.poolCode]: power,
        [lotto.poolCode]: lotto,
        [bang.poolCode]: bang,
      });
      return { code: 200, message: "OK", result: r1 };
    } catch (error: unknown) {
      console.log("Admin tsx Error init", error);
      return { code: 500, message: "error" };
    }
  }),
});
