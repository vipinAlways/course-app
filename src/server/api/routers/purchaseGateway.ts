import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const purchageGateway = createTRPCRouter({
  buyCourse: protectedProcedure.mutation(async ({ ctx }) => {
 
    try {
      
    } catch (error) {
      
    }
  
  }),
});
