import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const purchageGateway = createTRPCRouter({
  buyCourse: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
   
    });

    if(!user){
      throw new TRPCError({
        cause:user,
        code:"NOT_FOUND",
        message:"User not found"
      })
    }

  
  }),
});
