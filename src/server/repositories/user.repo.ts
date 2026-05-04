import { db } from "../db";

class User {
    async getUserById(userId: string) {
        return await db.user.findUnique({
            where: {
                id: userId,
            },
        }); 
    }
}

export const userRepo = new User()