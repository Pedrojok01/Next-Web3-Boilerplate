import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/kv/Persistence";
import { lottery, type ResponseTPRC } from "@/server/lib/LotteryService";

export const userRouter = createTRPCRouter({
  saveTickets: publicProcedure
    .input(
      z.object({
        address: z.string(),
        txHash: z.string(),
        poolCode: z.string(),
        txTime: z.number(),
        ticketNum: z.optional(z.number().default(1)),
        tickets: z.optional(z.array(z.string())),
        referral: z.optional(z.string()),
      }),
    )
    .mutation(async ({ input }): Promise<ResponseTPRC> => {
      try {
        const tickets: string[] = [];
        for (let i = 0; i < (input.ticketNum ?? 1); i++) {
          tickets.push(lottery.randomHex());
        }

        const r = await lottery.createTicket({
          address: input.address,
          txHash: input.txHash,
          tickets,
          txTime: input.txTime,
          poolCode: input.poolCode,
        });
        return { code: 200, message: "OK", result: r };
      } catch (error: unknown) {
        console.log(error);
        return { code: 500, message: "error" };
      }
    }),
  ticketsList: publicProcedure
    .input(
      z.object({
        address: z.string(),
        page: z.optional(z.object({ start: z.number(), size: z.number() })),
      }),
    )
    .query(async ({ input }): Promise<ResponseTPRC> => {
      try {
        const r = await kvStore.list(`LOTTERY_ADDR_${input.address}`);
        return { code: 200, message: "OK", result: r };
      } catch (error: unknown) {
        console.log(error);
        return { code: 500, message: "error" };
      }
    }),
});
