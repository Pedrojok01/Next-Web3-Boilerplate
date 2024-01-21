import { NextResponse } from "next/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const lotteryRouter = createTRPCRouter({
  /**
   * 开奖
   */
  runLottery: publicProcedure
    .mutation(async () => {
      try {
        //const r = await kvStore.save("Tickets", input.txHash, { ticket: input.tickets });
        return { };
      } catch (error: unknown) {
        console.error("Error init");
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
      }
    }),
});
