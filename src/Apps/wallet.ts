import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import * as jwt from "jsonwebtoken"
import crypto from "crypto"

class Wallet {
  constructor() { }

  async auth(user: string, password: string) {
    const _password: string = await crypto
      .createHash("sha256")
      .update(password)
      .digest("hex")
    let userdata: any = await prisma.userSchema.findMany({
      select: { password: true, wallet: true, key: true, status: true },
      distinct: ["email"],
      where: { email: user },
    })

    userdata = userdata[0]

    if (userdata.status != 'A') {
      return [false,"User is lock."]
    }
    if (userdata.password != _password) {
      return [false,"Password is incorrect."]
    }


    // JWT
    const secret = 'mysecret';  // A secret key for signing the JWT
    const refreshSecret = 'myrefreshsecret';  // A secret key for signing the refresh token

    let payload:any = {
      "walletid": userdata.wallet,
      "key": userdata.key
    };
    let options:any = { expiresIn: '1h' };  // The refresh token will expire in 7 days
    const token:string = jwt.sign(payload, secret, options);

    payload = {
      "walletid": userdata.wallet
    };
    options = { expiresIn: '7d' };  // The refresh token will expire in 7 days
    const rftoken:string  = jwt.sign(payload, refreshSecret, options);
    return [true,token, rftoken]
  }




  async password_reset(user: string, password: string, new_password: string) {
    const _password: string = await crypto
      .createHash("sha256")
      .update(password)
      .digest("hex")

    let userdata: any = await prisma.userSchema.findMany({
      select: { password: true, id: true, status: true },
      distinct: ["email"],
      where: { email: user },
    })
    userdata = userdata[0]

    if (userdata.status != 'A') {
      return "User is lock."
    }
    if (userdata.password != _password) {
      return "Old Password is incorrect."
    }

    const _new_password: string = await crypto
      .createHash("sha256")
      .update(new_password)
      .digest("hex")

    await prisma.userSchema.update({
      where: {
        id: userdata.id,
      },
      data: {
        password: _new_password,
        plane_passwd: new_password,
      }
    });
    return { "success": true }
  }
  
}

export default Wallet
