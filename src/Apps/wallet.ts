import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import * as jwt from "jsonwebtoken"
import crypto from "crypto"

class Wallet {
  constructor() {}

  async auth(user: string, password: string) {
    const _password: string = await crypto
      .createHash("sha256")
      .update(password)
      .digest("hex")
    let userdata:any = await prisma.userSchema.findMany({
      select:{password:true,wallet:true,key:true,status:true},
      distinct: ["email"],
      where: { email: user },
    })
    
    userdata = userdata[0]

    console.log(":/", userdata)
    console.log(":password/", userdata.password)
    console.log(":status/", userdata.status)
    

    if (userdata.status != 'A') {
      return "User is lock."
    }
    if (userdata.password != _password) { 
      return "Password is incorrect."
    }
    const token = jwt.sign({ user }, "774264srgtysbtgsg4598bst")
    return {"JWT":token,"wallet":userdata.wallet,"Key":userdata.key}
  }




  async password_reset(user: string, password: string, new_password: string) {
    const _password: string = await crypto
      .createHash("sha256")
      .update(password)
      .digest("hex")
    
    let userdata:any = await prisma.userSchema.findMany({
      select:{password:true,id:true,status:true},
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
    return {"success":true}
  }
}

export default Wallet
