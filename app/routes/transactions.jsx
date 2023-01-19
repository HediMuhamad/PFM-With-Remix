import { redirect } from "@remix-run/node"
import { Link, useLoaderData, useSearchParams } from "@remix-run/react"
import styles from "~/styles/pages/transactions.page.css"
import { db } from "~/utils/db.server.js"

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

export const loader = async ({ request }) => {
  const TRANSACTIONS_FOR_EACH_PAGE = 8

  const url = new URL(request.url)
  let page = url.searchParams.get("page")

  if (isNaN(+page) || page < 1) {
    return redirect("/transactions/?page=1")
  }

  const numberOfPages = Math.ceil(
    (await db.transaction.count()) / TRANSACTIONS_FOR_EACH_PAGE
  )

  if (page > numberOfPages) {
    return redirect(`/transactions/?page=${numberOfPages}`)
  }

  const transactions = await db.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
    skip: TRANSACTIONS_FOR_EACH_PAGE * (page - 1),
    take: TRANSACTIONS_FOR_EACH_PAGE,
  })

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return { transactions, categories, numberOfPages }
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

export default function Transaction() {
  const { transactions, categories, numberOfPages } = useLoaderData()

  const [searchParams] = useSearchParams()
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1
  const previousPage = Math.max(page - 1, 1)
  const nextPage = Math.min(page + 1, numberOfPages)

  return (
    <div className="transactions-page">
      <h1>This is Transactions History Page</h1>
      <p>Transactions loader data preview will be write down below</p>
      <p className="transactions">
        {transactions.map((item) => item.title + ", ")}
      </p>
      <Link to={`/transactions/?page=${previousPage}`}>Previous</Link>
      <Link to={`/transactions/?page=${nextPage}`}>Next</Link>
    </div>
  )
}
