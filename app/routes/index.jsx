import { useLoaderData } from "@remix-run/react"
import { useMemo } from "react"
import styles from "~/styles/pages/overview.page.css"
import { db } from "~/utils/db.server"
import { succeedResponse } from "~/utils/http-statuses.server"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export const loader = async () => {
  const transactions = await db.transaction.findMany({
    include: {
      category: true,
    },
    take: 10,
    orderBy: {
      date: "desc",
    },
  })

  const categories = await db.category.findMany()

  const cardData =
    await db.$queryRaw`SELECT type, sum(amount) as total FROM "Transaction" INNER JOIN "Category" ON "Transaction".categoryId = "Category".id GROUP BY type`

  return succeedResponse({ transactions, categories, cardData })
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export default function Overview() {
  const { transactions, categories, cardData } = useLoaderData()
  const { income, expense } = useMemo(() => {
    return cardData[0].type === "INCOME"
      ? {
          income: cardData[0],
          expense: cardData[1],
        }
      : {
          income: cardData[1],
          expense: cardData[0],
        }
  }, [cardData])

  return (
    <div className="overview-page">
      <h1>This is Overview Page</h1>
      <p>Backend data preview will be log to the browser console.</p>
      {console.log({ transactions, categories, cardData: { income, expense } })}
    </div>
  )
}
