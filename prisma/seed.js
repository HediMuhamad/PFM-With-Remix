import categories from "../app/mocks/categories.js"
import transactions from "../app/mocks/transactions.js"
import { db } from "../app/utils/db.server.js"

async function seedCategories() {
  await Promise.all(
    categories.map((category) => {
      return db.category.create({ data: category })
    })
  )
}

async function seedTransactions() {
  await Promise.all(
    transactions.map(async (transaction) => {
      const { id } = await db.category.findFirst({
        where: { name: transaction.category },
      })
      delete transaction.category
      transaction["categoryId"] = id
      return db.transaction.create({ data: transaction })
    })
  )
}

async function seedAll() {
  await seedCategories()
  await seedTransactions()
}

seedAll()

export { seedTransactions, seedCategories, seedAll }
