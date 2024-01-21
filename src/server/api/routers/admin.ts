import { NextResponse } from "next/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/Persistence";

export const adminRouter = createTRPCRouter({
  /**
   * 池子列表
   */
  poolList: publicProcedure
    .input(z.object({ txHash: z.string() }))
    .query(async ({ input }) => {
      const result = await kvStore.get("Tickets", input.txHash);
      return { res: result };
    }),
  /**
   * 开奖
   */
  runLottery: publicProcedure
    .input(z.object({ txHash: z.string(), tickets: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      try {
        const r = await kvStore.save("Tickets", input.txHash, { ticket: input.tickets });
        return { r: r };
      } catch (error: unknown) {
        console.error("Error init");
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
      }
    }),
  /**
   * 初始化池
   */
  initPool: publicProcedure
    .input(z.object({ txHash: z.string(), tickets: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      try {
        const r = await kvStore.save("Tickets", input.txHash, { ticket: input.tickets });
        return { r: r };
      } catch (error: unknown) {
        console.error("Error init");
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
      }
    }),
});
