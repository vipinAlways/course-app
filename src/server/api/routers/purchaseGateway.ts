import { createTRPCRouter, protectedProcedure } from "../trpc";

const purchageGateway = createTRPCRouter({
  buyCourse: protectedProcedure.mutation(async () => {}),
});
