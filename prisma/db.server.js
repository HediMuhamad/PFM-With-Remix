import { PrismaClient } from "@prisma/client"

const dbGenerator = (function () {
  let instance = undefined

  return {
    getInstance: function () {
      if (process.env.NODE_ENV === "production") {
        instance = new PrismaClient()
        return instance
      } else {
        if (!instance) {
          instance = new PrismaClient()
          delete instance.constructor
        }
        return instance
      }
    },
  }
})()

const db = dbGenerator.getInstance()

export { db }
