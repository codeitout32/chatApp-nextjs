import { User } from "../entity/User"

export const getFullName = (user: User) => {
    return `${user.firstName} ${user.lastName}`
  }
  