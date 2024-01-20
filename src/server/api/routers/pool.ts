import { NextResponse } from "next/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const poolRouter = createTRPCRouter({
  hello: publicProcedure
    .query(async ({}) => {
      return { res: "Hello" };
    }),

  init: publicProcedure
    .input(z.object({ secretHash: z.string() }))
    .mutation(async ({ input }) => {
      try {
        return NextResponse.json({ input: input.secretHash }, { status: 200 });
      } catch (error: unknown) {
        console.error("Error init telegram bot");
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
      }
    }),
});
