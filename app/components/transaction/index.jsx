import PropTypes from "prop-types"
import { useCallback, useMemo } from "react"
import {
  BillsIcon,
  ClothsIcon,
  FoodIcon,
  GiftIcon,
  SalaryIcon,
  LoanIcon,
  HealthIcon,
  TechIcon,
  SportsIcon,
  UndefinedCategoryIcon,
} from "~/shared/assets/"
import currencyFormatter from "~/utils/currency-formatter"

const getDayName = (date) => {
  switch (date.getDate()) {
    case new Date().getDate(): {
      return "today"
    }
    case new Date().getDate() - 1: {
      return "yesterday"
    }
    default: {
      return date.toLocaleDateString()
    }
  }
}

export default function Transaction({
  transactionCategory,
  transactionTitle,
  transactionDate,
  transactionAmount,
  transactionType,
}) {
  const getIcon = useMemo(() => {
    switch (transactionCategory.toUpperCase()) {
      case "SALARY":
        return SalaryIcon
      case "LOAN":
        return LoanIcon
      case "GIFT":
        return GiftIcon
      case "TECH":
        return TechIcon
      case "FOOD":
        return FoodIcon
      case "BILLS":
        return BillsIcon
      case "SPORTS":
        return SportsIcon
      case "HEALTH":
        return HealthIcon
      case "CLOTHS":
        return ClothsIcon
      default:
        return UndefinedCategoryIcon
    }
  }, [transactionCategory])

  const formatedTransactionAmount = useMemo(() => {
    return currencyFormatter(+transactionAmount, {
      useAbbreviation: true,
      symbol: "$",
    })
  }, [transactionAmount])

  const Icon = getIcon()
  const className = `transaction transaction-type-${transactionType.toLowerCase()}`

  return (
    <div className={className}>
      <div className="icon-title-container">
        <div className="icon">{Icon}</div>
        <div className="title">{transactionTitle}</div>
      </div>
      <div className="date-amount-container">
        <div className="date">{getDayName(transactionDate)}</div>
        <div className="amount">
          <span className="amount-holder">{formatedTransactionAmount}</span>
        </div>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  transactionCategory: PropTypes.string.isRequired,
  transactionTitle: PropTypes.string.isRequired,
  transactionDate: PropTypes.object.isRequired,
  transactionAmount: PropTypes.number.isRequired,
  transactionType: PropTypes.string.isRequired,
}
