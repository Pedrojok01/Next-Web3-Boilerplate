import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kvStore } from "@/server/lib/Persistence";
import type { ResponseTPRC } from "@/server/lib/types";

export const userRouter = createTRPCRouter({
  saveTickets: publicProcedure
    .input(
      z.object({
        address: z.string(),
        txHash: z.string(),
        poolHash: z.string(),
        txTime: z.number(),
      }),
    )
    .mutation(async ({ input }): Promise<ResponseTPRC> => {
      try {
        const tickets = [
          Number(Math.floor(Math.random() * 10000000) + 1).toString(16),
          Number(Math.floor(Math.random() * 10000000) + 1).toString(16),
        ];
        const r = await kvStore.save(input.address, input.txHash, {
          data: tickets,
          txTime: input.txTime,
          poolHash: input.poolHash,
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
        const r = await kvStore.list(input.address);
        return { code: 200, message: "OK", result: r };
      } catch (error: unknown) {
        console.log(error);
        return { code: 500, message: "error" };
      }
    }),
  txList: publicProcedure
    .input(
      z.object({
        address: z.string(),
        page: z.object({ start: z.number(), size: z.number() }).nullable(),
      }),
    )
    .query(async ({ input }): Promise<ResponseTPRC> => {
      try {
        const r = await kvStore.listKeys(input.address);
        return { code: 200, message: "OK", result: r };
      } catch (error: unknown) {
        console.log(error);
        return { code: 500, message: "error" };
      }
    }),
});
