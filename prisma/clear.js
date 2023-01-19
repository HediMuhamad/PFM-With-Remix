import { db } from "../app/utils/db.server"

export async function deleteAllCategories() {
  return await db.category.deleteMany()
}

export async function deleteAllTransactions() {
  return await db.transaction.deleteMany()
}

export default async function deleteAllData() {
  await deleteAllCategories()
  await deleteAllTransactions()
}

deleteAllData()
