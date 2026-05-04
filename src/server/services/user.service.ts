import { userRepo } from "../repositories/user.repo"

class User {

    async getUserById(userId: string) {
        return userRepo.getUserById(userId)
    }
}

export const userService = new User()