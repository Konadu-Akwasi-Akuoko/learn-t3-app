import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { publicProcedure, router } from "./trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
// import { db } from "@/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    console.log(user);
    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // Check if the user is in the database
    try {
      const dbUser = await db.user.findFirst({ where: { id: user.id } });
      console.log(dbUser);
      if (!dbUser) {
        try {
          await db.user.create({
            data: {
              id: user.id,
              email: user.email,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
    return { success: true };
  }),
});
