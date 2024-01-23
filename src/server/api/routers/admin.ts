import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/kv/Persistence";
import { type PoolType, ConstantKey, type ResponseTPRC } from "@/server/lib/LotteryService";
import InitPoolConfig from "@/server/lib/PoolConfig";

export const adminRouter = createTRPCRouter({
  /**
   * 初始化池
   */
  initPool: publicProcedure.mutation(async (): Promise<ResponseTPRC> => {
    try {
      await kvStore.clean("LOTTERY*");
      const initPool: Record<string, PoolType> = {};
      for (const lotteryPoolProp of Object.values(InitPoolConfig)) {
        initPool[lotteryPoolProp.prop.poolCode] = lotteryPoolProp.prop;
      }
      const r1 = await kvStore.save(ConstantKey.LOTTERY_POOLS, initPool);
      return { code: 200, message: "OK", result: r1 };
    } catch (error: unknown) {
      console.log("Admin tsx Error init", error);
      return { code: 500, message: "error" };
    }
  }),
});
