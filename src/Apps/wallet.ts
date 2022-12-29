import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import crypto from "crypto"

class Wallet {
  constructor() {}

  async auth(user: string, password: string) {
    const _password: string = await crypto
      .createHash("sha256")
      .update(password)
      .digest("hex")
    // const where: UserWhereUniqueInput = { email: user }
    const userdata = await prisma.userSchema.findMany({
      where: { email: user },
    })

    console.log(":/>", _password)
    console.log(":/", userdata)
    return true
  }
}

export default Wallet
