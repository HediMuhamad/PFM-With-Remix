import Transaction from "~/components/transaction"
import styles from "~/styles/pages/overview.css"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Overview() {
  return (
    <div className="overview-page">
      <Transaction
        category="ACCESSORIES"
        title="12 Rules for life by Jordan Peterson signed by himself..."
        date={new Date()}
        amount="45600"
        type="income"
      />
      <Transaction
        category="BOOK"
        title="12 Rules for life by Jordan Peterson signed by himself..."
        date={new Date()}
        amount="45600"
        type="income"
      />
      <Transaction
        category="SALARY"
        title="12 Rules for life by Jordan Peterson signed by himself..."
        date={new Date()}
        amount="45600"
        type="income"
      />
      <Transaction
        category="ACCESSORIES"
        title="12 Rules for life by Jordan Peterson signed by himself..."
        date={new Date()}
        amount="45600"
        type="expense"
      />
      <Transaction
        category="BOOK"
        title="12 Rules for life by Jordan Peterson signed by himself..."
        date={new Date()}
        amount="45600"
        type="expense"
      />
      <Transaction
        category="SALARY"
        title="12 Rules for life by Jordan Peterson signed by himself..."
        date={new Date()}
        amount="45600"
        type="expense"
      />
    </div>
  )
}
